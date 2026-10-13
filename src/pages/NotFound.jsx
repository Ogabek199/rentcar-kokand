import React from "react";
import { Container } from "reactstrap";
import { Link } from "react-router-dom";
import Helmet from "../components/Helmet/Helmet";
import { useTranslation } from "../i18n/LanguageContext";

const NotFound = () => {
  const { t } = useTranslation();
  return (
    <Helmet title="404" description={t("carListing.notFound")} noindex canonicalPath="/404">
      <section style={{ padding: "80px 0" }} className="animate-page-enter">
        <Container className="text-center">
          <h1 style={{ fontSize: "2rem", fontWeight: 800, marginBottom: 12 }}>{t("carListing.notFound")}</h1>
          <p style={{ color: "var(--color-text-muted)", marginBottom: 24 }}>
            {t("carListing.notFoundText")}
          </p>
          <Link to="/" className="btn-outline">
            {t("nav.home")}
          </Link>
        </Container>
      </section>
    </Helmet>
  );
};

export default NotFound;
