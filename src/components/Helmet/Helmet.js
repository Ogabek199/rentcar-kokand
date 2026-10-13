import React from "react";
import { Helmet as ReactHelmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";

const SITE_NAME = "Ziyo Rent Car";
const SITE_URL = "https://rentcar-kokand.uz";
const DEFAULT_TITLE = "Qo‘qonda avtomobil ijarasi";
const DEFAULT_DESCRIPTION =
  "Ziyo Rent Car — Qo‘qon va Farg‘ona vodiysida premium avtomobil ijarasi. Malibu, Gentra, Equinox, Tahoe va boshqalar. Telegram @RendcarQoqon orqali tez bron qiling. Tel: +998776344747";
const DEFAULT_KEYWORDS =
  "avtomobil ijarasi Qo‘qon, rent car Kokand, mashina ijarasi Farg‘ona, Ziyo Rent Car, Malibu ijarasi, Gentra ijarasi, arzon mashina ijarasi, Telegram rent car";
const DEFAULT_IMAGE = "/og-image.jpg";
const TELEGRAM_URL = "https://t.me/RendcarQoqon";

const normalizeUrl = (origin, path) => {
  if (!path) return origin;
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  if (!path.startsWith("/")) return `${origin}/${path}`;
  return `${origin}${path}`;
};

const Helmet = ({
  title,
  description,
  keywords,
  canonicalPath,
  image,
  type = "website",
  noindex = false,
  structuredData,
  children,
}) => {
  const location = useLocation();
  const origin =
    typeof window !== "undefined" && window.location?.origin
      ? window.location.origin
      : SITE_URL;

  const pageTitle = title
    ? `${title} | ${SITE_NAME}`
    : `${DEFAULT_TITLE} | ${SITE_NAME}`;
  const pageDescription = description || DEFAULT_DESCRIPTION;
  const pageKeywords = keywords || DEFAULT_KEYWORDS;

  // /home va / bir xil sahifa — canonical doimo /
  let pathForCanonical = canonicalPath || location.pathname;
  if (pathForCanonical === "/home") pathForCanonical = "/";

  const canonicalUrl = normalizeUrl(origin, pathForCanonical);
  const imageUrl = normalizeUrl(origin, image || DEFAULT_IMAGE);
  const structuredDataList = structuredData
    ? Array.isArray(structuredData)
      ? structuredData
      : [structuredData]
    : [];

  return (
    <div className="w-100">
      <ReactHelmet>
        <html lang="uz" />
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta name="keywords" content={pageKeywords} />
        <meta name="author" content="Ziyo Rent Car" />
        <link rel="canonical" href={canonicalUrl} />

        <meta property="og:site_name" content={SITE_NAME} />
        <meta property="og:locale" content="uz_UZ" />
        <meta property="og:type" content={type} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content={imageUrl} />
        <meta property="og:image:alt" content={pageTitle} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="twitter:image" content={imageUrl} />

        <meta name="theme-color" content="#121826" />
        <link rel="me" href={TELEGRAM_URL} />

        {noindex ? (
          <meta name="robots" content="noindex, nofollow" />
        ) : (
          <meta name="robots" content="index, follow, max-image-preview:large" />
        )}

        {structuredDataList.map((data, idx) => (
          <script key={idx} type="application/ld+json">
            {JSON.stringify(data)}
          </script>
        ))}
      </ReactHelmet>
      {children}
    </div>
  );
};

export default Helmet;
