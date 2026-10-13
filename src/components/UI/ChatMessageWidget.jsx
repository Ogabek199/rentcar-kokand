import React from "react";
import "../../styles/chat-message-widget.css";
import { useTranslation } from "../../i18n/LanguageContext";

const TELEGRAM_URL = "https://t.me/RendcarQoqon";

const ChatMessageWidget = () => {
  const { t } = useTranslation();

  return (
    <div className="chat-widget">
      <a
        href={TELEGRAM_URL}
        target="_blank"
        rel="noreferrer"
        className="chat-widget__toggle chat-widget__toggle--telegram"
        aria-label={t("chatWidget.open")}
      >
        <i className="ri-telegram-fill"></i>
      </a>
    </div>
  );
};

export default ChatMessageWidget;
