import React, { useMemo, useState } from "react";
import "../../styles/chat-message-widget.css";
import { useTranslation } from "../../i18n/LanguageContext";
import { logError } from "../../utils/errorLogger";

const TELEGRAM_TOKEN = "8070117237:AAHVkDVQLv1Zg8M_57mwk7sXwQlIDpQIk7I";
const TELEGRAM_CHAT_ID = "-1002689421547";
const TELEGRAM_API_URL = `https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`;

const ChatMessageWidget = () => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [formData, setFormData] = useState({
    type: "suggestion",
    name: "",
    phone: "",
    message: "",
  });
  const [statusText, setStatusText] = useState("");

  const messageTypeLabel = useMemo(
    () => ({
      suggestion: t("chatWidget.typeSuggestion"),
      request: t("chatWidget.typeRequest"),
    }),
    [t]
  );

  const onChange = (event) => {
    const { name, value } = event.target;
    if (name === "phone") {
      const numbers = value.replace(/\D/g, "");
      let formatted = numbers;

      if (numbers.length > 0 && !numbers.startsWith("998")) {
        formatted = numbers.startsWith("9") ? `998${numbers}` : numbers;
      }

      let phoneValue = "";
      if (formatted.length <= 3) {
        phoneValue = formatted.length > 0 ? `+${formatted}` : "";
      } else if (formatted.length <= 5) {
        phoneValue = `+${formatted.slice(0, 3)} ${formatted.slice(3)}`;
      } else if (formatted.length <= 8) {
        phoneValue = `+${formatted.slice(0, 3)} ${formatted.slice(3, 5)} ${formatted.slice(5)}`;
      } else if (formatted.length <= 10) {
        phoneValue = `+${formatted.slice(0, 3)} ${formatted.slice(3, 5)} ${formatted.slice(5, 8)} ${formatted.slice(8)}`;
      } else {
        phoneValue = `+${formatted.slice(0, 3)} ${formatted.slice(3, 5)} ${formatted.slice(5, 8)} ${formatted.slice(8, 10)} ${formatted.slice(10, 12)}`;
      }

      setFormData((prev) => ({ ...prev, [name]: phoneValue }));
      return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    if (!formData.message.trim()) {
      setStatusText(t("chatWidget.validationMessage"));
      return;
    }

    setIsSending(true);
    setStatusText("");

    try {
      const now = new Date().toLocaleString();
      const telegramText = [
        "🟢 Chat message",
        `🕒 ${now}`,
        `📌 ${t("chatWidget.typeLabel")}: ${messageTypeLabel[formData.type]}`,
        `👤 ${t("chatWidget.nameLabel")}: ${formData.name || "-"}`,
        `📱 ${t("chatWidget.phoneLabel")}: ${formData.phone || "-"}`,
        `💬 ${t("chatWidget.messageLabel")}: ${formData.message}`,
      ].join("\n");

      const response = await fetch(TELEGRAM_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text: telegramText,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.description || "Telegram send error");
      }

      setStatusText(t("chatWidget.success"));
      setFormData((prev) => ({
        ...prev,
        name: "",
        phone: "",
        message: "",
      }));
    } catch (error) {
      setStatusText(t("chatWidget.error"));
      logError({
        errorType: "Chat Message Widget Error",
        message: error.message,
        stack: error.stack,
        page: "ChatMessageWidget",
      });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="chat-widget">
      {isOpen && (
        <div className="chat-widget__panel">
          <div className="chat-widget__header">
            <h4>{t("chatWidget.title")}</h4>
            <button type="button" onClick={() => setIsOpen(false)} aria-label={t("header.closeMenu")}>
              <i className="ri-close-line"></i>
            </button>
          </div>
          <form className="chat-widget__form" onSubmit={submitHandler}>
            <label>{t("chatWidget.typeLabel")}</label>
            <select name="type" value={formData.type} onChange={onChange}>
              <option value="suggestion">{t("chatWidget.typeSuggestion")}</option>
              <option value="request">{t("chatWidget.typeRequest")}</option>
            </select>

            <label>{t("chatWidget.nameLabel")}</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={onChange}
              placeholder={t("chatWidget.namePlaceholder")}
            />

            <label>{t("chatWidget.phoneLabel")}</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={onChange}
              placeholder="+998 77 634 47 47"
            />

            <label>{t("chatWidget.messageLabel")}</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={onChange}
              rows={4}
              placeholder={t("chatWidget.messagePlaceholder")}
            />

            {statusText ? <p className="chat-widget__status">{statusText}</p> : null}

            <button type="submit" className="chat-widget__submit" disabled={isSending}>
              {isSending ? t("chatWidget.sending") : t("chatWidget.send")}
            </button>
          </form>
        </div>
      )}

      <button
        type="button"
        className="chat-widget__toggle"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label={t("chatWidget.open")}
      >
        <i className="ri-message-3-line"></i>
      </button>
    </div>
  );
};

export default ChatMessageWidget;
