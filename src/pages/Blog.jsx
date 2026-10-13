import React from "react";
import { Container, Row } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";
import BlogList from "../components/UI/BlogList";
import { useTranslation } from "../i18n/LanguageContext";

const Blog = () => {
  const { t } = useTranslation();
  return (
    <Helmet
      title={t("footer.blogs")}
      description="Ziyo Rent Car blogi: avtomobil haydash, sayohat va texnik maslahatlar. Qo‘qonda mashina ijarasi bo‘yicha foydali maqolalar."
      keywords="avtomobil blog, haydash maslahatlari, sayohat maslahatlari, rent car blog"
      canonicalPath="/blogs"
    >
      <CommonSection title={t("footer.blogs")} />
      <section className="animate-on-scroll animate-fade-in-up">
        <Container>
          <Row className="animate-on-scroll animate-stagger">
            <BlogList />
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Blog;
