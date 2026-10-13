import React from "react";
import CommonSection from "../components/UI/CommonSection";
import Helmet from "../components/Helmet/Helmet";
import AboutSection from "../components/UI/AboutSection";
import "../styles/about.css";
import { useTranslation } from "../i18n/LanguageContext";

const About = () => {
  const { t } = useTranslation();
  return (
    <Helmet
      title={t("nav.about")}
      description="Ziyo Rent Car haqida: Qo‘qonda premium avtomobil ijarasi, 24/7 qo‘llab-quvvatlash, toza mashinalar. Bron — Telegram @RendcarQoqon yoki +998776344747."
      keywords="Ziyo Rent Car haqida, rent car Qo‘qon, avtomobil ijarasi kompaniyasi"
      canonicalPath="/about"
    >
      <CommonSection title={t("nav.about")} />
      <div className="animate-on-scroll animate-fade-in-up">
        <AboutSection aboutClass="aboutPage" />
      </div>
    </Helmet>
  );
};

export default About;
