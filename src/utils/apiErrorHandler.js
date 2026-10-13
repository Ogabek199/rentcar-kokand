/**
 * API Error Handler - API calls uchun xatolarni monitoring qilish
 * Har qanday API xatosi avtomatik Telegramga yuboriladi
 */

import { logError } from "./errorLogger";

/**
 * Safe fetch wrapper - API calls uchun
 * Xatolikni avtomatik Telegramga yuboradi
 * @param {string} url - API URL
 * @param {object} options - Fetch options
 * @param {string} functionName - Funksiya nomi (optional)
 * @returns {Promise}
 */
export const safeApiFetch = async (url, options = {}, functionName = "API Call") => {
  const startTime = performance.now();
  
  try {
    const response = await fetch(url, {
      timeout: 10000, // 10 soniyalik timeout
      ...options,
    });

    if (!response.ok) {
      const errorText = await response.text().catch(() => "No response text");
      const error = new Error(`API Error: ${response.status} ${response.statusText}`);
      error.status = response.status;
      error.responseText = errorText;
      throw error;
    }

    const data = await response.json();
    
    // Performance monitoring
    const duration = performance.now() - startTime;
    if (duration > 5000) {
      console.warn(`⚠️ Slow API call detected: ${functionName} took ${duration.toFixed(2)}ms`);
    }

    return data;
  } catch (error) {
    const duration = performance.now() - startTime;
    
    // Error logga yuborish
    logError({
      errorType: "API Request Error",
      message: error.message,
      stack: error.stack,
      page: window.location.pathname,
      additionalInfo: {
        apiFunction: functionName,
        url,
        duration: `${duration.toFixed(2)}ms`,
        status: error.status || "Network Error",
        method: options.method || "GET",
      },
    });

    throw error;
  }
};

/**
 * Retry logic bilan safe fetch
 * @param {string} url - API URL
 * @param {object} options - Fetch options
 * @param {string} functionName - Funksiya nomi
 * @param {number} retries - Qaytadan urinishlar soni (default: 3)
 * @returns {Promise}
 */
export const safeApiFetchWithRetry = async (
  url,
  options = {},
  functionName = "API Call",
  retries = 3
) => {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      return await safeApiFetch(url, options, functionName);
    } catch (error) {
      if (attempt === retries) {
        // Oxirgi urinish bo'lsa, error yuborish
        logError({
          errorType: "API Request Failed After Retries",
          message: `${functionName} failed after ${retries} retries: ${error.message}`,
          stack: error.stack,
          page: window.location.pathname,
          additionalInfo: {
            apiFunction: functionName,
            url,
            attemptsCount: retries,
            lastError: error.message,
          },
        });
        throw error;
      }

      // Keyingi urinishdan oldin kutish
      const delayMs = Math.min(1000 * Math.pow(2, attempt - 1), 5000);
      await new Promise((resolve) => setTimeout(resolve, delayMs));
    }
  }
};

/**
 * Network status monitoring
 */
export const setupNetworkMonitoring = () => {
  // Online bo'lish
  window.addEventListener("online", () => {
    console.log("✅ Internet connection restored");
    logError({
      errorType: "Network Status",
      message: "Internet connection restored",
      page: window.location.pathname,
    });
  });

  // Offline bo'lish
  window.addEventListener("offline", () => {
    console.error("❌ Internet connection lost");
    logError({
      errorType: "Network Error - Offline",
      message: "User went offline",
      page: window.location.pathname,
    });
  });
};

export default safeApiFetch;
