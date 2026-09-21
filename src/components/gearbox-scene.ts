import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";

/**
 * مجموعه‌ی سیاره‌ای (planetary gearset)، قلب هر گیربکس اتوماتیک:
 * چرخ خورشیدی وسط، سه چرخ سیاره‌ای، رینگ‌گیر بیرونی با دندانه‌ی داخلی و یک پک کلاچ نارنجی پشت آن.
 * مدل کاملاً پروسیجرال است (بدون فایل مدل). تعداد دندانه‌ها طوری انتخاب شده که
 * Ns + 2·Np = Nr و (Ns + Nr) بر ۳ بخش‌پذیر باشد؛ پس دندانه‌ها واقعاً درگیر می‌شوند.
 */

type Options = { reducedMotion: boolean };

const M = 0.13; // اندازه‌ی دندانه
const NS = 18; // خورشیدی
const NP = 15; // سیاره‌ای
const NR = 48; // رینگ
const T = 0.5; // ضخامت چرخ‌ها

const pitch = (n: number) => (M * n) / 2;
const RS = pitch(NS);
const RP = pitch(NP);
const RR = pitch(NR);
const ORBIT = RS + RP;

const ACCENT = 0xf5891f;

type Pt = [number, number];
const polar = (a: number, r: number): Pt => [Math.cos(a) * r, Math.sin(a) * r];

/** نقاط یک پروفیل دندانه‌دار؛ tip/root شعاع سر و ریشه‌ی دندانه‌اند */
function toothPoints(teeth: number, tip: number, root: number): Pt[] {
  const p = (Math.PI * 2) / teeth;
  const out: Pt[] = [];
  for (let i = 0; i < teeth; i++) {
    const c = i * p;
    out.push(
      polar(c - 0.3 * p, root),
      polar(c - 0.155 * p, tip),
      polar(c + 0.155 * p, tip),
      polar(c + 0.3 * p, root),
      polar(c + 0.5 * p, root),
    );
  }
  return out;
}

function extrude(shape: THREE.Shape, depth: number, bevel = 0.02) {
  const g = new THREE.ExtrudeGeometry(shape, {
    depth,
    bevelEnabled: true,
    bevelThickness: bevel,
    bevelSize: bevel * 0.9,
    bevelSegments: 2,
    curveSegments: 20,
  });
  g.translate(0, 0, -depth / 2);
  return g;
}

function circlePath(r: number, x = 0, y = 0) {
  const path = new THREE.Path();
  path.absarc(x, y, r, 0, Math.PI * 2, true);
  return path;
}

/** چرخ‌دنده‌ی بیرون‌دنده (خورشیدی/سیاره‌ای) */
function externalGear(teeth: number, bore: number, depth = T) {
  const pr = pitch(teeth);
  const pts = toothPoints(teeth, pr + M * 0.95, pr - M * 1.2);
  const shape = new THREE.Shape();
  pts.forEach(([x, y], i) => (i === 0 ? shape.moveTo(x, y) : shape.lineTo(x, y)));
  shape.closePath();
  shape.holes.push(circlePath(bore));
  return extrude(shape, depth);
}

/** رینگ‌گیر: بیرون گرد، درون دندانه‌دار */
function ringGear(teeth: number, outer: number, depth: number) {
  const pr = pitch(teeth);
  // برای دنده‌ی داخلی سر دندانه به مرکز نزدیک‌تر است و ریشه دورتر
  const pts = toothPoints(teeth, pr - M * 0.95, pr + M * 1.2);
  const shape = new THREE.Shape();
  shape.absarc(0, 0, outer, 0, Math.PI * 2, false);
  const hole = new THREE.Path();
  pts.forEach(([x, y], i) => (i === 0 ? hole.moveTo(x, y) : hole.lineTo(x, y)));
  hole.closePath();
  shape.holes.push(hole);

  // سوراخ‌های سبک‌سازی روی بدنه‌ی رینگ
  const at = outer - 0.32;
  for (let k = 0; k < 24; k++) {
    const a = (k / 24) * Math.PI * 2;
    shape.holes.push(circlePath(0.11, Math.cos(a) * at, Math.sin(a) * at));
  }
  return extrude(shape, depth, 0.03);
}

function annulus(outer: number, inner: number, depth: number) {
  const shape = new THREE.Shape();
  shape.absarc(0, 0, outer, 0, Math.PI * 2, false);
  shape.holes.push(circlePath(inner));
  return extrude(shape, depth, 0.012);
}

/** فاز اولیه‌ی چرخ رانده‌شده‌ی بیرون‌درگیر تا دندانه در شیار بنشیند */
function externalPhase(driverTeeth: number, drivenTeeth: number, dir: number) {
  return dir + Math.PI - (Math.PI - dir * driverTeeth) / drivenTeeth;
}

/** فاز اولیه‌ی رینگ برای درگیری داخلی با سیاره‌ای در جهت dir با فاز planetPhase */
function internalPhase(dir: number, planetPhase: number) {
  return dir - ((dir - planetPhase) * NP + Math.PI) / NR;
}

export function mountGearbox(host: HTMLElement, { reducedMotion }: Options): () => void {
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
  const small = Math.min(window.innerWidth, window.innerHeight) < 700;
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, small ? 1.6 : 2));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.15;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFShadowMap;
  renderer.domElement.style.cssText = "display:block;width:100%;height:100%";
  host.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const pmrem = new THREE.PMREMGenerator(renderer);
  const room = new RoomEnvironment();
  const envTexture = pmrem.fromScene(room, 0.04).texture;
  scene.environment = envTexture;
  scene.environmentIntensity = 0.55;

  // نور اصلی سرد از بالا-چپ، لبه‌نور نارنجی از پشت-راست
  const key = new THREE.DirectionalLight(0xf0f4fb, 2.4);
  key.position.set(-6, 7, 9);
  key.castShadow = true;
  key.shadow.mapSize.set(small ? 1024 : 2048, small ? 1024 : 2048);
  key.shadow.radius = 4;
  key.shadow.bias = -0.0006;
  key.shadow.normalBias = 0.02;
  const sc = key.shadow.camera;
  sc.left = -6;
  sc.right = 6;
  sc.top = 6;
  sc.bottom = -6;
  sc.near = 1;
  sc.far = 30;
  sc.updateProjectionMatrix();
  scene.add(key);

  const rim = new THREE.DirectionalLight(ACCENT, 3.4);
  rim.position.set(7, -2, -6);
  scene.add(rim);
  const rim2 = new THREE.DirectionalLight(ACCENT, 1.6);
  rim2.position.set(6, 5, 3);
  scene.add(rim2);
  const fill = new THREE.DirectionalLight(0x6b86a8, 0.45);
  fill.position.set(-8, -4, 5);
  scene.add(fill);

  const camera = new THREE.PerspectiveCamera(24, 1, 0.1, 100);

  // مواد
  const steel = new THREE.MeshStandardMaterial({ color: 0xc7d0da, metalness: 1, roughness: 0.32 });
  const darkSteel = new THREE.MeshStandardMaterial({ color: 0x7b8794, metalness: 1, roughness: 0.4 });
  const graphite = new THREE.MeshStandardMaterial({ color: 0x3d4650, metalness: 0.9, roughness: 0.45 });
  const friction = new THREE.MeshStandardMaterial({ color: ACCENT, metalness: 0.25, roughness: 0.55 });
  const chrome = new THREE.MeshStandardMaterial({ color: 0xeef2f6, metalness: 1, roughness: 0.18 });

  const disposables: { dispose: () => void }[] = [steel, darkSteel, graphite, friction, chrome, envTexture, pmrem];
  const mesh = (g: THREE.BufferGeometry, m: THREE.Material, shadow = true) => {
    disposables.push(g);
    const o = new THREE.Mesh(g, m);
    o.castShadow = shadow;
    o.receiveShadow = true;
    return o;
  };
  const cyl = (r: number, len: number, seg = 40) => {
    const g = new THREE.CylinderGeometry(r, r, len, seg);
    g.rotateX(Math.PI / 2);
    return g;
  };

  const rig = new THREE.Group();
  const root = new THREE.Group();
  root.add(rig);
  scene.add(root);

  // رینگ‌گیر
  const ringDepth = 0.62;
  const ringOuter = RR + M * 1.2 + 0.5;
  const ringGroup = new THREE.Group();
  ringGroup.add(mesh(ringGear(NR, ringOuter, ringDepth), darkSteel));
  const lip = mesh(annulus(ringOuter + 0.02, ringOuter - 0.1, 0.06), chrome, false);
  lip.position.z = ringDepth / 2 + 0.01;
  ringGroup.add(lip);
  rig.add(ringGroup);

  // خورشیدی + شفت
  const sun = new THREE.Group();
  sun.add(mesh(externalGear(NS, 0.34), steel));
  const shaft = mesh(cyl(0.34, 3.6), chrome);
  shaft.position.z = -0.4;
  sun.add(shaft);
  const cap = mesh(cyl(0.5, 0.18, 32), graphite);
  cap.position.z = T / 2 + 0.16;
  sun.add(cap);
  rig.add(sun);

  // سیاره‌ای‌ها
  const dirs = [0, 1, 2].map((k) => Math.PI / 2 + (k * 2 * Math.PI) / 3);
  const planetBase = dirs.map((d) => externalPhase(NS, NP, d));
  const planets = dirs.map((d) => {
    const g = new THREE.Group();
    g.add(mesh(externalGear(NP, 0.2), steel));
    const pin = mesh(cyl(0.2, 1.1, 24), chrome);
    pin.position.z = -0.25;
    g.add(pin);
    const pinCap = mesh(cyl(0.27, 0.12, 24), friction);
    pinCap.position.z = T / 2 + 0.1;
    g.add(pinCap);
    g.position.set(Math.cos(d) * ORBIT, Math.sin(d) * ORBIT, 0);
    rig.add(g);
    return g;
  });
  const ringBase = internalPhase(dirs[0], planetBase[0]);

  // بازوی نگهدارنده (carrier)
  const carrierShape = new THREE.Shape();
  carrierShape.absarc(0, 0, RR - 0.28, 0, Math.PI * 2, false);
  carrierShape.holes.push(circlePath(0.34));
  for (let k = 0; k < 9; k++) {
    const a = (k / 9) * Math.PI * 2 + Math.PI / 9;
    carrierShape.holes.push(circlePath(0.16, Math.cos(a) * 2.05, Math.sin(a) * 2.05));
  }
  const carrier = mesh(extrude(carrierShape, 0.12, 0.015), graphite);
  carrier.position.z = -T / 2 - 0.2;
  rig.add(carrier);

  // پک کلاچ: صفحه‌های اصطکاکی نارنجی و فولادی به‌صورت یک‌درمیان
  const pack = new THREE.Group();
  for (let i = 0; i < 6; i++) {
    const plate = mesh(annulus(ringOuter - 0.08, RR - 0.7, 0.07), i % 2 === 0 ? friction : steel, false);
    plate.position.z = -T / 2 - 0.5 - i * 0.1;
    pack.add(plate);
  }
  rig.add(pack);

  // مرکزسازی
  const box = new THREE.Box3().setFromObject(rig);
  const center = box.getCenter(new THREE.Vector3());
  rig.position.set(-center.x, -center.y, -center.z);

  const baseY = -0.55;
  const baseX = 0.38;
  const speed = 0.32;
  let px = 0;
  let py = 0;
  let sx = 0;
  let sy = 0;
  let t = 0;
  let raf = 0;
  let running = false;
  let inView = true;

  function draw(dt: number) {
    t += dt;
    const intro = reducedMotion ? 1 : Math.min(t / 1.8, 1);
    const ease = 1 - Math.pow(1 - intro, 3);

    const a = reducedMotion ? 0.35 : t * speed;
    sun.rotation.z = a;
    planets.forEach((g, i) => (g.rotation.z = (-a * NS) / NP + planetBase[i]));
    ringGroup.rotation.z = (-a * NS) / NR + ringBase;
    pack.rotation.z = ringGroup.rotation.z;

    sx += (px - sx) * Math.min(dt * 3, 1);
    sy += (py - sy) * Math.min(dt * 3, 1);
    const sway = reducedMotion ? 0 : Math.sin(t * 0.4) * 0.04;
    root.rotation.y = baseY + (1 - ease) * 0.9 + sx * 0.22 + sway;
    root.rotation.x = baseX - sy * 0.14 + (1 - ease) * 0.2;
    root.scale.setScalar(0.92 + 0.08 * ease);

    renderer.render(scene, camera);
  }

  function resize() {
    const w = Math.max(host.clientWidth, 1);
    const h = Math.max(host.clientHeight, 1);
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    const tn = Math.tan(THREE.MathUtils.degToRad(camera.fov) / 2);
    const r = ringOuter * 1.08;
    const distance = Math.max(r / tn, r / (tn * camera.aspect)) + 2.2;
    camera.position.set(0, 0, distance);
    camera.updateProjectionMatrix();
    if (reducedMotion) draw(0);
  }

  let last = 0;
  function frame(now: number) {
    raf = requestAnimationFrame(frame);
    const dt = Math.min((now - last) / 1000, 0.05);
    last = now;
    draw(dt);
  }
  function play() {
    if (running || reducedMotion || !inView || document.hidden) return;
    running = true;
    last = performance.now();
    raf = requestAnimationFrame(frame);
  }
  function pause() {
    running = false;
    cancelAnimationFrame(raf);
  }

  const onPointer = (e: PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    px = (e.clientX / window.innerWidth) * 2 - 1;
    py = (e.clientY / window.innerHeight) * 2 - 1;
  };
  const onVisibility = () => (document.hidden ? pause() : play());

  const io = new IntersectionObserver(([entry]) => {
    inView = entry.isIntersecting;
    if (inView) play();
    else pause();
  });
  const ro = new ResizeObserver(resize);

  io.observe(host);
  ro.observe(host);
  window.addEventListener("pointermove", onPointer, { passive: true });
  document.addEventListener("visibilitychange", onVisibility);

  resize();
  draw(0);
  play();

  return () => {
    pause();
    io.disconnect();
    ro.disconnect();
    window.removeEventListener("pointermove", onPointer);
    document.removeEventListener("visibilitychange", onVisibility);
    room.dispose?.();
    disposables.forEach((d) => d.dispose());
    renderer.dispose();
    renderer.domElement.remove();
  };
}
