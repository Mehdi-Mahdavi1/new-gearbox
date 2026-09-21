import Link from "next/link";
import { serviceImages } from "@/content/media";
import { Art, serviceArtName } from "./Art";
import { ArrowIcon } from "./Icons";

export function ServiceCard({ slug, title, text }: { slug: string; title: string; text: string }) {
  const img = serviceImages[slug];
  return (
    <Link href={`/services/${slug}/`} className="svc">
      <div className="svc__art">
        {img ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img className="svc__img" src={img} alt="" loading="lazy" decoding="async" />
        ) : (
          <Art name={serviceArtName(slug)} />
        )}
      </div>
      <div className="svc__body">
        <h3 className="svc__title">{title}</h3>
        <p className="svc__text">{text}</p>
      </div>
      <span className="svc__go">
        <ArrowIcon />
      </span>
    </Link>
  );
}
