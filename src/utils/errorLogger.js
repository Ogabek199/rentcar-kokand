/**
 * Error Logger - Telegramga xatolar yuborish tizimi
 * Har qanday muammo bo'lsa avtomatik Telegramga bildirishnoma yuboriladi
 */

import React from "react";

const TELEGRAM_TOKEN = "8070117237:AAHVkDVQLv1Zg8M_57mwk7sXwQlIDpQIk7I";
const TELEGRAM_ERROR_CHAT_ID = "-1002689421547"; // Error bildirishnomalar uchun chat ID
const TELEGRAM_API_URL = `https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`;

// Environment check
const isDevelopment = process.env.NODE_ENV === "development";
const isProduction = process.env.NODE_ENV === "production";

/**
 * Xabar text o'zini shakllantirish
 */
const formatErrorMessage = (errorData) => {
  const {
    errorType = "Unknown Error",
    message = "",
    stack = "",
    page = "Unknown",
    // timestamp = new Date().toISOString(),
    userAgent = navigator.userAgent || "Unknown",
    url = window.location.href || "Unknown",
    additionalInfo = {},
  } = errorData;

  const timeZoneDate = new Intl.DateTimeFormat("uz-UZ", {
    timeZone: "Asia/Tashkent",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).format(new Date());

  let formattedMessage = `🚨 MUAMMO BILDIRISHNOMASI\n`;
  formattedMessage += `━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
  formattedMessage += `⏰ Vaqt: ${timeZoneDate}\n`;
  formattedMessage += `📱 Sahifa: ${page}\n`;
  formattedMessage += `❌ Xato turi: ${errorType}\n`;
  formattedMessage += `💬 Xabar: ${message}\n`;

  if (stack && stack.trim()) {
    // Stack trace ni kesib chiqish (juda uzun bo'lmasligi uchun)
    const stackLines = stack.split("\n").slice(0, 5).join("\n");
    formattedMessage += `📋 Stack:\n${stackLines}\n`;
  }

  formattedMessage += `🌐 URL: ${url}\n`;
  formattedMessage += `📊 User Agent: ${userAgent.substring(0, 60)}...\n`;

  // Qo'shimcha ma'lumot bo'lsa
  if (Object.keys(additionalInfo).length > 0) {
    formattedMessage += `\n📌 Qo'shimcha ma'lumot:\n`;
    Object.entries(additionalInfo).forEach(([key, value]) => {
      formattedMessage += `• ${key}: ${JSON.stringify(value)}\n`;
    });
  }

  formattedMessage += `━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
  formattedMessage += `Environment: ${isDevelopment ? "DEVELOPMENT" : "PRODUCTION"}\n`;

  return formattedMessage;
};

/**
 * Telegramga xato yuborish
 */
const sendToTelegram = async (formattedMessage) => {
  try {
    const response = await fetch(TELEGRAM_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: TELEGRAM_ERROR_CHAT_ID,
        text: formattedMessage,
        parse_mode: "HTML",
      }),
    });

    if (!response.ok) {
      console.error("Telegramga yuborishda xatolik:", response.statusText);
    }
  } catch (err) {
    console.error("Telegram serveriga ulanishda xatolik:", err);
  }
};

/**
 * Asosiy error logger funksiyasi
 * @param {Object} errorData - Xato haqidagi ma'lumot
 */
export const logError = async (errorData) => {
  try {
    const formattedMessage = formatErrorMessage(errorData);

    // Console ga ham chiqar
    console.error("📌 ERROR LOG:", formattedMessage);

    // Telegramga yuborish (production va development da)
    if (isProduction || isDevelopment) {
      await sendToTelegram(formattedMessage);
    }

    // Local storage ga ham saqlash (agar keraksachi)
    try {
      const logs = JSON.parse(localStorage.getItem("errorLogs") || "[]");
      logs.push({
        timestamp: new Date().toISOString(),
        ...errorData,
      });
      // Faqat so'nggi 50 ta xatoni saqlash
      localStorage.setItem("errorLogs", JSON.stringify(logs.slice(-50)));
    } catch (storageErr) {
      console.warn("Local storage ga yozishda muammo:", storageErr);
    }
  } catch (err) {
    console.error("Error logger da xatolik:", err);
  }
};

/**
 * Global error handler - window.onerror
 */
export const setupGlobalErrorHandler = () => {
  window.onerror = (msg, url, lineNo, colNo, error) => {
    logError({
      errorType: "Uncaught Error",
      message: msg,
      stack: error?.stack || "",
      page: window.location.pathname,
      url: window.location.href,
      additionalInfo: {
        lineNumber: lineNo,
        columnNumber: colNo,
      },
    });
    return false;
  };

  // Unhandled Promise Rejection
  window.onunhandledrejection = (event) => {
    logError({
      errorType: "Unhandled Promise Rejection",
      message: event.reason?.message || "Unknown Promise Rejection",
      stack: event.reason?.stack || "",
      page: window.location.pathname,
      url: window.location.href,
    });
  };
};

/**
 * Fetch API xatolarini tortish uchun helper
 * @param {Function} fetchFunction - Fetch call
 * @param {string} functionName - Funksiya nomi
 */
export const wrapFetch = async (fetchFunction, functionName = "API Call") => {
  try {
    return await fetchFunction();
  } catch (error) {
    logError({
      errorType: "Fetch Error",
      message: error.message,
      stack: error.stack,
      page: window.location.pathname,
      additionalInfo: {
        functionName,
        errorDetails: error.toString(),
      },
    });
    throw error;
  }
};

function isChunkRelatedError(error) {
  if (!error) return false;
  if (error.name === "ChunkLoadError") return true;
  const msg = String(error.message || error);
  return (
    /loading (css )?chunk [\d]+ failed/i.test(msg) ||
    /failed to fetch dynamically imported module/i.test(msg) ||
    /importing a module script failed/i.test(msg) ||
    /error loading (css )?chunk/i.test(msg)
  );
}

/**
 * React Component xatolarini tortish
 */
export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    logError({
      errorType: "React Component Error",
      message: error.message,
      stack: error.stack,
      page: window.location.pathname,
      additionalInfo: {
        componentStack: errorInfo.componentStack,
      },
    });
  }

  render() {
    if (this.state.hasError) {
      const chunkError = isChunkRelatedError(this.state.error);
      return (
        <div
          style={{
            padding: "24px",
            textAlign: "center",
            backgroundColor: "#f8d7da",
            borderRadius: "8px",
            margin: "20px",
            maxWidth: "420px",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          <h2 style={{ fontSize: "1.25rem", marginBottom: "12px" }}>
            ❌ Muammo yuz berdi!
          </h2>
          <p style={{ marginBottom: "16px", color: "#333", lineHeight: 1.5 }}>
            {chunkError
              ? "Sayt yangilangan bo‘lishi mumkin. Sahifani yangilab, qayta urinib ko‘ring."
              : "Sahifa yuklanishda xatolik yuz berdi. Sahifani yangilang yoki keyinroq qayta urinib ko‘ring."}
          </p>
          <button
            type="button"
            onClick={() => window.location.reload()}
            style={{
              padding: "10px 20px",
              fontSize: "1rem",
              cursor: "pointer",
              backgroundColor: "#0d6efd",
              color: "#fff",
              border: "none",
              borderRadius: "6px",
            }}
          >
            Sahifani yangilash
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default logError;
