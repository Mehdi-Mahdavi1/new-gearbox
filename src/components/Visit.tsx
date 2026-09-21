import { fullAddress, site } from "@/lib/site";
import { ArrowIcon, ClockIcon, MapPinIcon, PhoneIcon } from "./Icons";

/** آدرس، ساعت کاری و مسیریابی؛ برای کاربر محلی و سئوی محلی (NAP یکسان با اسکیما) */
export function Visit() {
  return (
    <section className="section section--alt" aria-labelledby="visit-title">
      <div className="wrap visit">
        <div>
          <h2 id="visit-title" className="section__title">
            آدرس و ساعت کاری
          </h2>
          <p className="section__sub" style={{ marginTop: "0.6rem" }}>
            پیش از آمدن تماس بگیرید تا زمان بررسی خودرو را هماهنگ کنیم.
          </p>
          <div className="visit__actions">
            <a href={site.mapsUrl} className="btn btn--primary" target="_blank" rel="noopener">
              مسیریابی تا تعمیرگاه
              <ArrowIcon size={18} />
            </a>
            <a href={`tel:${site.phoneTel}`} className="btn btn--ghost">
              <PhoneIcon size={18} />
              تماس
            </a>
          </div>
        </div>
        <address className="visit__card">
          <div className="visit__row">
            <span className="visit__icon">
              <MapPinIcon />
            </span>
            <span className="visit__k">آدرس</span>
            <span className="visit__v">{fullAddress}</span>
          </div>
          <div className="visit__row">
            <span className="visit__icon">
              <ClockIcon size={28} />
            </span>
            <span className="visit__k">ساعت کاری</span>
            <span className="visit__v">{site.hoursText}</span>
          </div>
          <div className="visit__row">
            <span className="visit__icon">
              <PhoneIcon size={26} />
            </span>
            <span className="visit__k">تلفن</span>
            <a className="visit__v ltr" href={`tel:${site.phoneTel}`}>
              {site.phoneDisplay}
            </a>
          </div>
        </address>
      </div>
    </section>
  );
}
