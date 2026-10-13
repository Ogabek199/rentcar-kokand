import React, { useMemo } from "react";
import { Container, Row, Col } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import "../styles/contact.css";
import { useTranslation } from "../i18n/LanguageContext";

const TELEGRAM_URL = "https://t.me/RendcarQoqon";

const Contact = () => {
  const { t } = useTranslation();

  const contactInfo = useMemo(
    () => ({
      address: t("contactPage.address"),
      phone: "+998776344747",
      phoneLink: "tel:+998776344747",
    }),
    [t]
  );

  return (
    <Helmet
      title={t("contactPage.title")}
      description="Ziyo Rent Car bilan bog‘laning: Telegram @RendcarQoqon, telefon +998776344747. Manzil: Turkiston ko‘chasi 12, Qo‘qon."
      keywords="Ziyo Rent Car kontakt, Telegram RendcarQoqon, telefon +998776344747, Qo‘qon rent car"
      canonicalPath="/contact"
    >
      <section className="contact-page animate-page-enter">
        <div className="contact-page__header animate-on-scroll animate-fade-in-down">
          <Container>
            <h1 className="contact-page__title">{t("contactPage.title")}</h1>
            <p className="contact-page__sub">{t("contactPage.subtitle")}</p>
          </Container>
        </div>
        <Container className="contact-page__content">
          <Row>
            <Col lg="7" md="7">
              <div className="contact-card animate-on-scroll animate-fade-in-left">
                <h2 className="contact-card__title">{t("contactPage.sendMessage")}</h2>
                <p className="contact-card__hint">{t("contactPage.telegramHint")}</p>
                <a
                  href={TELEGRAM_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="contact-form__btn contact-form__btn--telegram"
                >
                  <i className="ri-telegram-fill"></i>
                  {t("contactPage.telegramCta")}
                </a>
                <p className="contact-card__channel">@RendcarQoqon</p>
              </div>
            </Col>
            <Col lg="5" md="5">
              <div className="contact-info-card animate-on-scroll animate-fade-in-right">
                <h2 className="contact-info-card__title">{t("contactPage.infoTitle")}</h2>
                <ul className="contact-info-card__list">
                  <li>
                    <i className="ri-map-pin-line"></i>
                    <span>{contactInfo.address}</span>
                  </li>
                  <li>
                    <i className="ri-phone-line"></i>
                    <a href={contactInfo.phoneLink}>{contactInfo.phone}</a>
                  </li>
                  <li>
                    <i className="ri-telegram-fill"></i>
                    <a href={TELEGRAM_URL} target="_blank" rel="noreferrer">
                      @RendcarQoqon
                    </a>
                  </li>
                </ul>
                <div className="contact-info-card__map">
                  <span>{t("contactPage.mapView")}</span>
                  <div className="contact-info-card__map-frame">
                    <iframe
                      title="Kokand map on Yandex"
                      src="https://yandex.uz/map-widget/v1/?ll=70.9428%2C40.5286&z=12"
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    />
                  </div>
                  <a href="https://yandex.uz/maps/?ll=70.9428%2C40.5286&z=12" target="_blank" rel="noreferrer">
                    {t("contactPage.openGoogleMap")}
                  </a>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Contact;
