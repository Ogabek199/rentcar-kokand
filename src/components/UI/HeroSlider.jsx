import React, { useState, useEffect } from "react";
import { Container } from "reactstrap";
import { Link } from "react-router-dom";
import FindCarForm from "./FindCarForm";
import "../../styles/hero-slider.css";
import { useTranslation } from "../../i18n/LanguageContext";

const bannerAssets = [
  { type: "video", src: "/banner-video/2026-05-20 15.51.15.mp4" },
  { type: "video", src: "/banner-video/2026-05-20 15.52.13.mp4" },
];

const HeroSlider = () => {
  const { t } = useTranslation();
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % bannerAssets.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="hero hero--new">
      <div className="hero__bg">
        {bannerAssets.map((asset, index) => (
          asset.type === "video" ? (
            <video
              key={index}
              src={asset.src}
              className={`hero__bg-item ${index === currentIndex ? "active" : ""}`}
              autoPlay
              muted
              loop
              playsInline
            />
          ) : (
            <img
              key={index}
              src={asset.src}
              alt="Banner"
              className={`hero__bg-item ${index === currentIndex ? "active" : ""}`}
            />
          )
        ))}
        <div className="hero__bg-overlay" />
      </div>
      <Container className="hero__container">
        <div className="hero__content">
          <span className="hero__badge">{t("hero.since")}</span>
          <h1 className="hero__title">
            {t("hero.title1")}
            <span className="hero__title-accent"> {t("hero.title2")}</span>
          </h1>
          <p className="hero__tagline">{t("hero.tagline")}</p>
          <div className="hero__buttons">
            <Link to="/cars" className="hero__btn hero__btn--primary">
              {t("hero.viewFleet")}
            </Link>
            <a href="tel:+998776344747" className="hero__btn hero__btn--secondary">
              <i className="ri-play-circle-line"></i>
              {t("hero.call")}
            </a>
          </div>
        </div>
      </Container>
      <div className="hero__form-wrap">
        <Container>
          <FindCarForm />
        </Container>
      </div>
    </section>
  );
};

export default HeroSlider;
