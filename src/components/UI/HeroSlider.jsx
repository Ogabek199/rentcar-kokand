import React, { useState, useEffect, useRef, useCallback } from "react";
import { Container } from "reactstrap";
import { Link } from "react-router-dom";
import "../../styles/hero-slider.css";
import { useTranslation } from "../../i18n/LanguageContext";

const bannerSlides = [
  {
    poster: `/banner-video/${encodeURIComponent("2026-05-20 15.43.33.jpg")}`,
    video: `/banner-video/${encodeURIComponent("2026-05-20 15.51.15.mp4")}`,
  },
  {
    poster: `/banner-video/${encodeURIComponent("2026-05-20 15.44.29.jpg")}`,
    video: `/banner-video/${encodeURIComponent("2026-05-20 15.52.13.mp4")}`,
  },
];

const canPlayHeroVideo = () => {
  if (typeof window === "undefined") return false;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
  if (window.matchMedia("(max-width: 768px)").matches) return false;

  const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
  if (connection?.saveData) return false;
  if (["slow-2g", "2g", "3g"].includes(connection?.effectiveType)) return false;

  return true;
};

const HeroSlider = () => {
  const { t } = useTranslation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [allowVideo, setAllowVideo] = useState(false);
  const [videoReady, setVideoReady] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    let cancelled = false;
    let idleId;
    let timeoutId;

    const enableVideo = () => {
      if (!cancelled && canPlayHeroVideo()) setAllowVideo(true);
    };

    if ("requestIdleCallback" in window) {
      idleId = window.requestIdleCallback(enableVideo, { timeout: 1800 });
    } else {
      timeoutId = window.setTimeout(enableVideo, 600);
    }

    return () => {
      cancelled = true;
      if (idleId && "cancelIdleCallback" in window) {
        window.cancelIdleCallback(idleId);
      }
      if (timeoutId) window.clearTimeout(timeoutId);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % bannerSlides.length);
      setVideoReady(false);
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  const handleCanPlay = useCallback(() => {
    setVideoReady(true);
    const video = videoRef.current;
    if (video) {
      video.play().catch(() => {
        setAllowVideo(false);
      });
    }
  }, []);

  const activeSlide = bannerSlides[currentIndex];

  return (
    <section className="hero hero--new">
      <div className="hero__bg">
        {bannerSlides.map((slide, index) => (
          <img
            key={`poster-${index}`}
            src={slide.poster}
            alt=""
            className={`hero__bg-item hero__bg-poster ${index === currentIndex ? "active" : ""}`}
            loading={index === 0 ? "eager" : "lazy"}
            decoding="async"
            fetchPriority={index === 0 ? "high" : "low"}
          />
        ))}

        {allowVideo ? (
          <video
            key={activeSlide.video}
            ref={videoRef}
            className={`hero__bg-item hero__bg-video ${videoReady ? "active" : ""}`}
            src={activeSlide.video}
            poster={activeSlide.poster}
            muted
            loop
            playsInline
            preload="metadata"
            onCanPlay={handleCanPlay}
            onError={() => setAllowVideo(false)}
          />
        ) : null}

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
              <i className="ri-phone-fill"></i>
              {t("hero.call")}
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default HeroSlider;
