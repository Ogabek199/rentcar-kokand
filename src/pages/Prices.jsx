import React, { useEffect } from "react";
import { Container, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";
import carData from "../assets/data/carData";
import "../styles/prices.css";
import { slugify } from "../utils/slugify";
import { useTranslation } from "../i18n/LanguageContext";

const TELEGRAM_URL = "https://t.me/RendcarQoqon";

const Prices = () => {
  const { t } = useTranslation();
  useEffect(() => {
    const section = document.querySelector(".prices-page");
    if (section) section.querySelectorAll(".animate-on-scroll").forEach((el) => el.classList.add("animated"));
  }, []);

  return (
    <Helmet
      title={t("pricesPage.title")}
      description="Qo‘qonda avtomobil ijara narxlari — joriy tariflar Telegram @RendcarQoqon kanalida. Ziyo Rent Car: Malibu, Gentra, Equinox va boshqalar."
      keywords="avtomobil ijara narxlari Qo‘qon, rent car narxlar, mashina ijarasi narxi, Telegram RendcarQoqon"
      canonicalPath="/prices"
    >
      <CommonSection title={t("pricesPage.title")} />
      <section className="prices-page animate-page-enter">
        <Container>
          <div className="prices-promo animate-on-scroll animate-fade-in-down">
            <div className="prices-promo__icon">
              <i className="ri-telegram-fill"></i>
            </div>
            <h2 className="prices-promo__title">{t("pricesPage.promoTitle")}</h2>
            <p className="prices-promo__desc">{t("pricesPage.promoDesc")}</p>
            <a
              href={TELEGRAM_URL}
              target="_blank"
              rel="noreferrer"
              className="prices-promo__btn"
            >
              <i className="ri-telegram-fill"></i>
              {t("pricesPage.openTelegram")}
            </a>
          </div>

          <div className="section-head section-head--center mb-5 animate-on-scroll animate-fade-in-down">
            <h2 className="section-head__title">{t("pricesPage.heading")}</h2>
            <p className="section-head__sub">{t("pricesPage.subheading")}</p>
            <span className="section-head__line" />
          </div>
          <Row className="animate-on-scroll animate-stagger">
            {carData.map((item) => {
              const carSlug = item.slug || slugify(item.carName);
              const telegramHref = `${TELEGRAM_URL}?text=${encodeURIComponent(
                t("booking.telegramMessage").replace("{{car}}", item.carName)
              )}`;
              return (
                <Col key={item.id} lg="4" md="6" className="mb-4">
                <div className="price-card">
                  <Link to={`/cars/${carSlug}`} className="price-card__img-wrap">
                    <img src={item.imgUrl} alt={item.carName} className="price-card__img" loading="lazy" />
                  </Link>
                  <a
                    href={telegramHref}
                    target="_blank"
                    rel="noreferrer"
                    className="price-card__badge price-card__badge--telegram"
                  >
                    <i className="ri-telegram-fill"></i>
                    <span>{t("common.askPrice")}</span>
                  </a>
                  <div className="price-card__body">
                    <h3 className="price-card__title">{item.carName}</h3>
                    <p className="price-card__meta">{item.automatic} • {item.model}</p>
                    <a
                      href={telegramHref}
                      target="_blank"
                      rel="noreferrer"
                      className="price-card__link"
                    >
                      {t("common.askPriceCta")} <i className="ri-arrow-right-line"></i>
                    </a>
                  </div>
                </div>
                </Col>
              );
            })}
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Prices;
