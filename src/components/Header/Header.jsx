import React, { useRef } from "react";
import { Container } from "reactstrap";
import { Link, NavLink } from "react-router-dom";
import "../../styles/header.css";
import { useTranslation } from "../../i18n/LanguageContext";

const navLinks = [
  { path: "/home", key: "nav.home" },
  { path: "/cars", key: "nav.cars" },
  { path: "/prices", key: "nav.prices" },
  { path: "/about", key: "nav.about" },
  // { path: "/about-me", display: "Dasturchi haqida" },
  { path: "/contact", key: "nav.contact" },
];

const Header = () => {
  const menuRef = useRef(null);
  const { t, language, setLanguage } = useTranslation();
  const toggleMenu = () => menuRef.current?.classList.toggle("menu__active");

  return (
    <header className="header header--new">
      <Container>
        <div className="header__inner">
          <Link to="/home" className="header__logo">
            <i className="ri-car-line"></i>
            <span>{t("header.logo")}</span>
          </Link>

          <nav className="header__nav" ref={menuRef}>
            <button
              type="button"
              className="header__close"
              onClick={toggleMenu}
              aria-label={t("header.closeMenu")}
            >
              <i className="ri-close-line"></i>
            </button>
            <div className="header__menu">
              {navLinks.map((item) => (
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    isActive
                      ? "header__link header__link--active"
                      : "header__link"
                  }
                  key={item.path}
                  onClick={toggleMenu}
                >
                  {t(item.key)}
                </NavLink>
              ))}
            </div>
          </nav>

          <div className="header__right">
            <div className="header__langs">
              <select
                className="header__lang-select"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                aria-label={t("header.language")}
              >
                <option value="uz">🇺🇿 UZ</option>
                <option value="en">🇬🇧 EN</option>
                <option value="ru">🇷🇺 RU</option>
              </select>
            </div>
            <a href="tel:+998776344747" className="header__phone">
              <i className="ri-phone-line"></i>+998 77 634 47 47
            </a>
            <Link to="/contact" className="header__cta">
              {t("header.apply")}
            </Link>
          </div>

          <button
            type="button"
            className="header__toggle"
            onClick={toggleMenu}
            aria-label="Menu"
          >
            <i className="ri-menu-line"></i>
          </button>
        </div>
      </Container>
    </header>
  );
};

export default Header;
