import React from "react";
import { Container, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";
import "../styles/about-me.css";

const AboutMe = () => {
  const skills = [
    { icon: "ri-reactjs-line", name: "React.js", color: "#61DAFB", level: "Expert" },
    { icon: "ri-stack-line", name: "Next.js", color: "#000000", level: "Advanced" },
    { icon: "ri-html5-line", name: "HTML5", color: "#E34F26", level: "Expert" },
    { icon: "ri-css3-line", name: "CSS3", color: "#1572B6", level: "Expert" },
    { icon: "ri-file-code-line", name: "JavaScript", color: "#F7DF1E", level: "Expert" },
    { icon: "ri-paint-brush-line", name: "Tailwind CSS", color: "#06B6D4", level: "Advanced" },
    { icon: "ri-git-branch-line", name: "Git", color: "#F05032", level: "Advanced" },
  ];

  const services = [
    {
      icon: "ri-code-s-slash-line",
      title: "Veb-sayt yaratish",
      description: "Zamonaviy, responsive va SEO optimallashtirilgan veb-saytlar yarataman",
    },
    {
      icon: "ri-smartphone-line",
      title: "Mobile-first dizayn",
      description: "Barcha qurilmalarda mukammal ishlaydigan dizaynlar",
    },
    {
      icon: "ri-speed-line",
      title: "Performance optimizatsiya",
      description: "Tez yuklanadigan va samarali veb-saytlar",
    },
    {
      icon: "ri-palette-line",
      title: "UI/UX dizayn",
      description: "Chiroyli va foydalanuvchi uchun qulay interfeyslar",
    },
  ];

  return (
    <Helmet
      title="Dasturchi haqida - Frontend Developer"
      description="Frontend developer Og'abek Otaxonov. React.js, Next.js, HTML, CSS, JavaScript, Tailwind.css, Git. Vebsayt qilish kerak bo'lsa murojaat qiling."
      canonicalPath="/about-me"
    >
      <CommonSection title="Dasturchi haqida" />
      
      <section className="about-me-section animate-page-enter">
        <Container>
          <Row className="about-me__intro-row">
            <Col lg="4" md="5" className="mb-4">
              <div className="about-me__card about-me__profile-card animate-on-scroll animate-fade-in-right">
                <div className="about-me__avatar">
                  <i className="ri-user-line"></i>
                </div>
                <h2 className="about-me__name">Og'abek Otaxonov</h2>
                <p className="about-me__title">Frontend Developer</p>
                <div className="about-me__divider"></div>
                <div className="about-me__contact">
                  <a 
                    href="mailto:otaxonovogabek633@gmail.com" 
                    className="about-me__contact-item"
                  >
                    <i className="ri-mail-line"></i>
                    <span>otaxonovogabek633@gmail.com</span>
                  </a>
                  <a 
                    href="tel:+998776344747" 
                    className="about-me__contact-item"
                  >
                    <i className="ri-phone-line"></i>
                    <span>+998 77 634 47 47</span>
                  </a>
                </div>
              </div>
            </Col>
            
            <Col lg="8" md="7">
              <div className="about-me__card about-me__bio-card animate-on-scroll animate-fade-in-left">
                <h3 className="about-me__greeting">Salom! 👋</h3>
                <p className="about-me__text">
                  Men <strong>Og'abek Otaxonov</strong> - professional frontend developer. Men zamonaviy web texnologiyalar 
                  yordamida chiroyli, funksional va tez ishlaydigan veb-saytlar yarataman.
                </p>
                <p className="about-me__text">
                  <strong>Vebsayt qilish kerak bo'lsa</strong>, men bilan bog'laning! Men sizga yordam berishga tayyorman. 
                  Bizning jamoa bilan birgalikda sizning biznesingiz uchun eng yaxshi veb-saytni yaratamiz.
                </p>

                <div className="about-me__skills-section">
                  <h4 className="about-me__skills-title">Mening ko'nikmalarim</h4>
                  <Row>
                    {skills.map((skill, index) => (
                      <Col key={index} sm="6" md="4" className="mb-3">
                        <div className="about-me__skill-item">
                          <i className={`${skill.icon} about-me__skill-icon`} style={{ color: skill.color }}></i>
                          <div className="about-me__skill-info">
                            <span className="about-me__skill-name">{skill.name}</span>
                            <span className="about-me__skill-level">{skill.level}</span>
                          </div>
                        </div>
                      </Col>
                    ))}
                  </Row>
                </div>
              </div>
            </Col>
          </Row>

          <Row className="about-me__services-row animate-on-scroll animate-fade-in-up">
            <Col>
              <h3 className="about-me__section-title">Men qanday yordam bera olaman?</h3>
              <Row className="animate-on-scroll animate-stagger">
                {services.map((service, index) => (
                  <Col key={index} lg="3" md="6" className="mb-4">
                    <div className="about-me__service-card">
                      <div className="about-me__service-icon">
                        <i className={service.icon}></i>
                      </div>
                      <h4 className="about-me__service-title">{service.title}</h4>
                      <p className="about-me__service-description">{service.description}</p>
                    </div>
                  </Col>
                ))}
              </Row>
            </Col>
          </Row>

          <Row className="about-me__cta-row animate-on-scroll animate-scale-in">
            <Col>
              <div className="about-me__cta-box">
                <h3 className="about-me__cta-title">Vebsayt qilish kerak bo'lsa?</h3>
                <p className="about-me__cta-text">
                  Men bilan bog'laning va bizning jamoa sizga yordam beradi. 
                  Bepul konsultatsiya va narxlar bo'yicha maslahat.
                </p>
                <div className="about-me__cta-buttons">
                  <Link 
                    to="/contact"
                    className="btn btn-primary about-me__cta-btn"
                  >
                    <i className="ri-message-3-line"></i>
                    Kontakt forma
                  </Link>
                  <a 
                    href="tel:+998776344747"
                    className="btn btn-outline about-me__cta-btn"
                  >
                    <i className="ri-phone-line"></i>
                    Telefon qilish
                  </a>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default AboutMe;
