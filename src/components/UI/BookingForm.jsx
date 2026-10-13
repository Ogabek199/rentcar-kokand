import React from "react";
import "../../styles/booking-form.css";
import { useTranslation } from "../../i18n/LanguageContext";

const TELEGRAM_URL = "https://t.me/RendcarQoqon";

const BookingForm = ({ carName }) => {
  const { t } = useTranslation();

  const telegramHref = carName
    ? `${TELEGRAM_URL}?text=${encodeURIComponent(
        t("booking.telegramMessage").replace("{{car}}", carName)
      )}`
    : TELEGRAM_URL;

  return (
    <div className="booking-form booking-form--card booking-form--telegram">
      <p className="booking-form__telegram-text">{t("booking.telegramHint")}</p>
      <a
        href={telegramHref}
        target="_blank"
        rel="noreferrer"
        className="booking-form__btn booking-form__btn--telegram"
      >
        <i className="ri-telegram-fill"></i>
        {t("booking.telegramCta")}
      </a>
    </div>
  );
};

export default BookingForm;
