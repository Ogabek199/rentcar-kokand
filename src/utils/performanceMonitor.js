/**
 * Performance & Page Load Monitor
 * Sahifa yuklanish vaqti va performance xatolarini monitor qilish
 */

import { logError } from "./errorLogger";

/**
 * Page performance metrics ni gather qilish
 */
export const trackPagePerformance = () => {
  if (!window.performance || !window.performance.timing) {
    return;
  }

  window.addEventListener("load", () => {
    setTimeout(() => {
      const perfData = window.performance.timing;
      const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
      const dnsTime = perfData.domainLookupEnd - perfData.domainLookupStart;
      const tcpTime = perfData.connectEnd - perfData.connectStart;
      const ttfb = perfData.responseStart - perfData.navigationStart;
      const renderTime = perfData.domComplete - perfData.domLoading;

      const metrics = {
        totalPageLoadTime: pageLoadTime,
        dnsTime,
        tcpTime,
        timeToFirstByte: ttfb,
        renderTime,
      };

      // Agar yuklaniş vaqti juda ko'p bo'lsa (5 soniyadan ortiq)
      if (pageLoadTime > 5000) {
        logError({
          errorType: "Slow Page Load",
          message: `Page loaded slowly: ${pageLoadTime.toFixed(0)}ms`,
          page: window.location.pathname,
          additionalInfo: {
            metrics,
            url: window.location.href,
          },
        });
      }

      // Performance xulosa
      console.log("📊 Page Performance:", {
        "Total Load Time": `${pageLoadTime.toFixed(0)}ms`,
        "DNS Lookup": `${dnsTime.toFixed(0)}ms`,
        "TCP Connection": `${tcpTime.toFixed(0)}ms`,
        "Time to First Byte": `${ttfb.toFixed(0)}ms`,
        "DOM Render": `${renderTime.toFixed(0)}ms`,
      });
    }, 0);
  });
};

/**
 * Resource load errors ni kuzatish
 */
export const trackResourceErrors = () => {
  window.addEventListener("error", (e) => {
    if (e.target !== window) {
      const target = e.target;
      
      if (target.src || target.href) {
        logError({
          errorType: "Resource Load Error",
          message: `Failed to load ${target.tagName}: ${target.src || target.href}`,
          page: window.location.pathname,
          additionalInfo: {
            resourceType: target.tagName,
            resourceUrl: target.src || target.href,
            errorMessage: e.message,
          },
        });
      }
    }
  }, true);
};

/**
 * Memory warning (agar mavjud bo'lsa)
 */
export const trackMemoryUsage = () => {
  if (performance.memory) {
    setInterval(() => {
      const memInfo = performance.memory;
      const usagePercent = (memInfo.usedJSHeapSize / memInfo.jsHeapSizeLimit) * 100;

      // Agar memory 90% dan ortiq ishlatilyotgan bo'lsa
      if (usagePercent > 90) {
        logError({
          errorType: "High Memory Usage",
          message: `Memory usage is ${usagePercent.toFixed(2)}%`,
          page: window.location.pathname,
          additionalInfo: {
            usedMemory: `${(memInfo.usedJSHeapSize / 1048576).toFixed(2)} MB`,
            totalMemory: `${(memInfo.jsHeapSizeLimit / 1048576).toFixed(2)} MB`,
            usagePercent: usagePercent.toFixed(2),
          },
        });
      }
    }, 30000); // Har 30 sekundda
  }
};

/**
 * Long task detection
 */
export const trackLongTasks = () => {
  if ("PerformanceObserver" in window) {
    try {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.duration > 50) { // 50ms dan ortiq
            logError({
              errorType: "Long Running Task",
              message: `Long task detected: ${entry.duration.toFixed(0)}ms`,
              page: window.location.pathname,
              additionalInfo: {
                taskDuration: entry.duration.toFixed(0),
                taskName: entry.name,
              },
            });
          }
        }
      });

      observer.observe({ entryTypes: ["longtask"] });
    } catch (err) {
      console.warn("Long task observer error:", err);
    }
  }
};

/**
 * Setup barcha performance monitoring
 */
export const setupPerformanceMonitoring = () => {
  try {
    trackPagePerformance();
    trackResourceErrors();
    trackMemoryUsage();
    trackLongTasks();
  } catch (err) {
    console.error("Performance monitoring setup error:", err);
  }
};

export default setupPerformanceMonitoring;
