import { Container, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import "../../styles/footer.css";
import { useTranslation } from "../../i18n/LanguageContext";

const Footer = () => {
  const { t } = useTranslation();
  const year = new Date().getFullYear();
  const quickLinks = [
    { path: "/cars", display: t("footer.fleet") },
    { path: "/prices", display: t("nav.prices") },
    { path: "/blogs", display: t("footer.blogs") },
    { path: "/about", display: t("nav.about") },
    { path: "/privacy-policy", display: t("footer.privacy") },
    { path: "/contact", display: t("nav.contact") },
  ];

  return (
    <footer className="footer footer--new">
      <Container>
        <Row className="footer__row">
          <Col lg="3" md="6" sm="12" className="mb-4 mb-lg-0">
            <div className="footer__brand">
              <Link to="/home" className="footer__logo">
                <i className="ri-car-line"></i>
                <span>Ziyo Rent Car</span>
              </Link>
              <p className="footer__desc">
                {t("footer.description")}
              </p>
              <div className="footer__social">
                <a href="https://t.me/RendcarQoqon" target="_blank" rel="noreferrer" aria-label="Telegram">
                  <i className="ri-telegram-line"></i>
                </a>
                {/* 
                <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram">
                  <i className="ri-instagram-line"></i>
                </a>
                <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook">
                  <i className="ri-facebook-circle-line"></i>
                </a> 
                */}
              </div>
            </div>
          </Col>

          <Col lg="2" md="6" sm="6">
            <h5 className="footer__title">{t("footer.quickLinks")}</h5>
            <ul className="footer__links">
              {quickLinks.map((item) => (
                <li key={item.path}>
                  <Link to={item.path}>{item.display}</Link>
                </li>
              ))}
            </ul>
          </Col>

          <Col lg="3" md="6" sm="6">
            <h5 className="footer__title">{t("footer.contact")}</h5>
            <ul className="footer__contact">
              <li>
                <i className="ri-map-pin-line"></i>
                <span>{t("footer.address")}</span>
              </li>
              <li>
                <i className="ri-phone-line"></i>
                <a href="tel:+998776344747">+998 77 634 47 47</a>
              </li>
            </ul>
          </Col>

          <Col lg="4" md="6" sm="12">
            <h5 className="footer__title">{t("footer.ourAddress")}</h5>
            <div className="footer__map-placeholder">
              <span>{t("footer.showMap")}</span>
              <div className="footer__map-frame">
                <iframe
                  title="Kokand location map on Yandex"
                  src="https://yandex.uz/map-widget/v1/?ll=70.9428%2C40.5286&z=12"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
              <a
                href="https://yandex.uz/maps/?ll=70.9428%2C40.5286&z=12"
                target="_blank"
                rel="noreferrer"
                className="footer__map-link"
              >
                {t("footer.openGoogleMap")}
              </a>
            </div>
          </Col>
        </Row>

        <div className="footer__bottom">
          <p>
            © {year} Ziyo Rent Car. {t("footer.rights")}
          </p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
