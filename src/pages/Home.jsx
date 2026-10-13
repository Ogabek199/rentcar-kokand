import React, { Suspense, lazy } from "react";
import { Container, Row } from "reactstrap";
import { Link } from "react-router-dom";
import Helmet from "../components/Helmet/Helmet";
import HeroSlider from "../components/UI/HeroSlider";
import AboutSection from "../components/UI/AboutSection";
import carData from "../assets/data/carData";
import CarItem from "../components/UI/CarItem";
import { useTranslation } from "../i18n/LanguageContext";

const Testimonial = lazy(() => import("../components/UI/Testimonial"));

const Home = () => {
  const { t } = useTranslation();
  return (
    <Helmet
      title="Qo‘qonda avtomobil ijarasi"
      description="Ziyo Rent Car — Qo‘qonda premium avtomobil ijarasi. Malibu, Gentra, Equinox, Tahoe va Captiva. Telegram @RendcarQoqon orqali tez bron qiling. Tel: +998776344747"
      keywords="avtomobil ijarasi Qo‘qon, rent car Kokand, Ziyo Rent Car, mashina ijarasi, Telegram @RendcarQoqon"
      canonicalPath="/"
    >
      <section className="p-0 hero__slider-section hero__slider-section--new">
        <HeroSlider />
      </section>

      <AboutSection />

      <section className="section--cars animate-on-scroll animate-fade-in-up">
        <Container>
          <div className="section-head section-head--center animate-on-scroll animate-fade-in-down">
            <h2 className="section-head__title">{t("home.popularOffers")}</h2>
            <p className="section-head__sub">{t("home.bestChoice")}</p>
            <span className="section-head__line" />
          </div>
          <Row>
            {carData.slice(0, 6).map((item) => (
              <CarItem item={item} key={item.id} />
            ))}
          </Row>
          <div className="text-center mt-5 animate-on-scroll animate-fade-in">
            <Link to="/cars" className="btn-outline">
              {t("common.allCars")} ({carData.length}+)
            </Link>
          </div>
        </Container>
      </section>

      <section className="animate-on-scroll animate-fade-in-up">
        <Container>
          <div className="section-head animate-on-scroll animate-fade-in-down">
            <h2 className="section-head__title">{t("home.testimonials")}</h2>
            <p className="section-head__sub">{t("home.stories")}</p>
            <span className="section-head__line" />
          </div>
          <div className="animate-on-scroll animate-scale-in">
            <Suspense fallback={null}>
              <Testimonial />
            </Suspense>
          </div>
        </Container>
      </section>

      <section className="section--cta animate-on-scroll animate-fade-in-up">
        <Container>
          <div className="cta-box animate-on-scroll animate-scale-in">
            <h2 className="cta-box__title">{t("home.ctaTitle")}</h2>
            <p className="cta-box__text">{t("home.ctaText")}</p>
            <div className="cta-box__buttons">
              <a
                href="https://t.me/RendcarQoqon"
                target="_blank"
                rel="noreferrer"
                className="cta-box__btn cta-box__btn--primary"
              >
                <i className="ri-telegram-fill"></i>
                {t("home.bookNow")}
              </a>
              <a href="tel:+998776344747" className="cta-box__btn cta-box__btn--outline">
                <i className="ri-phone-line"></i>
                +998776344747
              </a>
            </div>
          </div>
        </Container>
      </section>
    </Helmet>
  );
};

export default Home;
