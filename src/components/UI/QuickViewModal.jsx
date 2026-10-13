import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "../../styles/quick-view-modal.css";
import { slugify } from "../../utils/slugify";
import { useTranslation } from "../../i18n/LanguageContext";

const TELEGRAM_URL = "https://t.me/RendcarQoqon";

const QuickViewModal = ({ car, isOpen, onClose }) => {
  const { t } = useTranslation();
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener("keydown", handleEscape);
    }
    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !car) return null;

  const carSlug = car.slug || slugify(car.carName);
  const telegramHref = `${TELEGRAM_URL}?text=${encodeURIComponent(
    t("booking.telegramMessage").replace("{{car}}", car.carName)
  )}`;

  return (
    <div className="quick-view-modal" onClick={onClose}>
      <div className="quick-view-modal__content" onClick={(e) => e.stopPropagation()}>
        <button className="quick-view-modal__close" onClick={onClose} aria-label={t("header.closeMenu")}>
          <i className="ri-close-line"></i>
        </button>

        <div className="quick-view-modal__body">
          <div className="quick-view-modal__image">
            <img src={car.imgUrl} alt={car.carName} />
          </div>

          <div className="quick-view-modal__info">
            <h2 className="quick-view-modal__title">{car.carName}</h2>
            <p className="quick-view-modal__model">{car.model}</p>

            <div className="quick-view-modal__features">
              <div className="quick-view-modal__feature">
                <i className="ri-speed-line"></i>
                <span>{car.speed}</span>
              </div>
              <div className="quick-view-modal__feature">
                <i className="ri-settings-3-line"></i>
                <span>{car.automatic}</span>
              </div>
              <div className="quick-view-modal__feature">
                <i className="ri-user-line"></i>
                <span>{car.seatType}</span>
              </div>
              <div className="quick-view-modal__feature">
                <i className="ri-map-pin-line"></i>
                <span>{car.gps}</span>
              </div>
            </div>

            <div className="quick-view-modal__price quick-view-modal__price--telegram">
              <p className="quick-view-modal__price-hint">{t("common.askPriceHint")}</p>
              <a
                href={telegramHref}
                target="_blank"
                rel="noreferrer"
                className="quick-view-modal__telegram-link"
                onClick={onClose}
              >
                <i className="ri-telegram-fill"></i>
                {t("common.askPriceCta")}
              </a>
            </div>

            {car.description && (
              <p className="quick-view-modal__description">{car.description}</p>
            )}

            <div className="quick-view-modal__actions">
              <Link
                to={`/cars/${carSlug}`}
                className="btn btn-primary quick-view-modal__btn"
                onClick={onClose}
              >
                {t("common.details")}
              </Link>
              <a
                href={telegramHref}
                target="_blank"
                rel="noreferrer"
                className="btn btn-outline quick-view-modal__btn"
                onClick={onClose}
              >
                {t("home.bookNow")}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickViewModal;
