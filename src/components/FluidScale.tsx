const stops = [
  { color: "#e5566f", name: "قرمز یا صورتی روشن", desc: "روغن سالم است؛ سرویس را طبق برنامه انجام دهید." },
  { color: "#b33a48", name: "قرمز تیره", desc: "شروع فرسودگی؛ برای تعویض برنامه‌ریزی کنید." },
  { color: "#7d3a2e", name: "قهوه‌ای", desc: "روغن فرسوده است و باید عوض شود." },
  { color: "#25191a", name: "تیره یا سیاه، با بوی سوختگی", desc: "گرمای زیاد دیده؛ پیش از تعویض، گیربکس را بررسی کنید." },
];

/** رنگ روغن گیربکس به‌عنوان اولین سرنخ تشخیص؛ خط رنگی زیربنای هویت بصری سایت است */
export function FluidScale() {
  return (
    <section className="section section--alt" aria-labelledby="fluid-title">
      <div className="wrap">
        <div className="section__head">
          <h2 id="fluid-title" className="section__title">
            رنگ روغن گیربکس چه می‌گوید؟
          </h2>
          <p className="section__sub">
            اولین نشانه‌ی وضعیت گیربکس رنگ روغن آن است. اگر خودروی شما سطح‌سنج روغن ندارد، بررسی را به تعمیرگاه بسپارید.
          </p>
        </div>
        <div className="fluid">
          <div
            className="fluid__bar"
            role="img"
            aria-label="طیف رنگ روغن گیربکس از قرمز روشن (سالم) تا سیاه (سوخته)"
          />
          <ul className="fluid__stops">
            {stops.map((s) => (
              <li className="fluid__stop" key={s.name} style={{ "--c": s.color } as React.CSSProperties}>
                <span className="fluid__name">{s.name}</span>
                <span className="fluid__desc">{s.desc}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
