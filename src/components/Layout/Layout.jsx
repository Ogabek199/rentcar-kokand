import React, { Fragment, useEffect, useRef, useState, Suspense, lazy } from "react";
import { useLocation } from "react-router-dom";

import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Routers from "../../routers/Routers";
import { initScrollAnimations } from "../../utils/scrollAnimations";
import { logError } from "../../utils/errorLogger";

// Og'ir bo'lgan yoki darhol kerak bo'lmagan widgetlarni lazy load qilish
const ScrollToTop = lazy(() => import("../UI/ScrollToTop"));
const ScrollProgress = lazy(() => import("../UI/ScrollProgress"));
const BottomNavbar = lazy(() => import("../UI/BottomNavbar"));
const FloatingOrbits = lazy(() => import("../UI/FloatingOrbits"));
const ChatMessageWidget = lazy(() => import("../UI/ChatMessageWidget"));

const shouldShowOrbits = () => {
  if (typeof window === "undefined") return false;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
  if (window.matchMedia("(max-width: 768px)").matches) return false;
  const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
  if (connection?.saveData) return false;
  if (["slow-2g", "2g"].includes(connection?.effectiveType)) return false;
  return true;
};

const Layout = () => {
  const location = useLocation();
  const timeoutRef = useRef(null);
  const [showOrbits, setShowOrbits] = useState(false);

  useEffect(() => {
    let idleId;
    let timeoutId;
    const enable = () => setShowOrbits(shouldShowOrbits());
    if ("requestIdleCallback" in window) {
      idleId = window.requestIdleCallback(enable, { timeout: 2500 });
    } else {
      timeoutId = window.setTimeout(enable, 1200);
    }
    return () => {
      if (idleId && "cancelIdleCallback" in window) window.cancelIdleCallback(idleId);
      if (timeoutId) window.clearTimeout(timeoutId);
    };
  }, []);

  useEffect(() => {
    // Birinchi marta yuklanganda animatsiyalarni ishga tushirish
    try {
      initScrollAnimations();
    } catch (err) {
      logError({
        errorType: "Animation Initialization Error",
        message: err.message,
        stack: err.stack,
        page: "Layout Component",
        additionalInfo: { component: "initScrollAnimations" },
      });
    }
  }, []);

  // Route o'zgarganda faqat yangi elementlarni kuzatish
  useEffect(() => {
    // Oldingi timeout'ni tozalash
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Kichik kechikish bilan yangi elementlarni kuzatish (DOM yangilanishi uchun)
    timeoutRef.current = setTimeout(() => {
      try {
        // Faqat yangi elementlarni topish va animatsiya qo'shish
        const newElements = document.querySelectorAll(".animate-on-scroll:not(.animated)");
        if (newElements.length > 0) {
          initScrollAnimations();
        }
      } catch (err) {
        logError({
          errorType: "Route Change Animation Error",
          message: err.message,
          stack: err.stack,
          page: location.pathname,
          additionalInfo: { route: location.pathname },
        });
      }
    }, 100);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [location.pathname]);

  return (
    <Fragment>
      {showOrbits ? (
        <Suspense fallback={null}>
          <FloatingOrbits />
        </Suspense>
      ) : null}
      <div className="layout__wrap">
        <Suspense fallback={null}>
          <ScrollProgress />
        </Suspense>
        <Header />
        <div className="layout__content">
          <Routers />
        </div>
        <Footer />
        <Suspense fallback={null}>
          <ScrollToTop />
          <ChatMessageWidget />
          <BottomNavbar />
        </Suspense>
      </div>
    </Fragment>
  );
};

export default Layout;
