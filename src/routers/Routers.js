import React, { Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import lazyWithRetry from "../utils/lazyWithRetry";
import Home from "../pages/Home";

// Boshqa sahifalar faqat kerak bo'lganda yuklanadi
const About = lazyWithRetry(() => import("../pages/About"));
const CarListing = lazyWithRetry(() => import("../pages/CarListing"));
const CarDetails = lazyWithRetry(() => import("../pages/CarDetails"));
const Blog = lazyWithRetry(() => import("../pages/Blog"));
const BlogDetails = lazyWithRetry(() => import("../pages/BlogDetails"));
const NotFound = lazyWithRetry(() => import("../pages/NotFound"));
const Contact = lazyWithRetry(() => import("../pages/Contact"));
const Prices = lazyWithRetry(() => import("../pages/Prices"));
const PrivacyPolicy = lazyWithRetry(() => import("../pages/PrivacyPolicy"));
const AboutMe = lazyWithRetry(() => import("../pages/AboutMe"));

const PageLoader = () => (
  <div className="page-loader" role="status" aria-live="polite">
    <div className="page-loader__spinner" />
    <span className="page-loader__text">Yuklanmoqda...</span>
  </div>
);

const Routers = () => {
  const isMobile = typeof window !== "undefined" && window.innerWidth <= 768;

  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Navigate to="/" replace />} />
        <Route path="/about" element={<About />} />
        <Route path="/cars" element={<CarListing />} />
        <Route path="/cars/:slug" element={<CarDetails />} />
        <Route path="/prices" element={<Prices />} />
        <Route path="/blogs" element={<Blog />} />
        <Route path="/blogs/:slug" element={<BlogDetails />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/PrivacyPolicy" element={<PrivacyPolicy />} />
        <Route path="/about-me" element={isMobile ? <Navigate to="/" replace /> : <AboutMe />} />
        <Route path="/404" element={<NotFound />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>
    </Suspense>
  );
};

export default Routers;
