import React, { useRef } from "react";
import { Container } from "reactstrap";
import { Link, NavLink } from "react-router-dom";
import "../../styles/header.css";
import { useTranslation } from "../../i18n/LanguageContext";
import CustomSelect from "../UI/CustomSelect";

const navLinks = [
  { path: "/", key: "nav.home" },
  { path: "/cars", key: "nav.cars" },
  { path: "/prices", key: "nav.prices" },
  { path: "/about", key: "nav.about" },
  // { path: "/about-me", display: "Dasturchi haqida" },
  { path: "/contact", key: "nav.contact" },
];

const LANG_OPTIONS = [
  { value: "uz", label: "🇺🇿 UZ" },
  { value: "en", label: "🇬🇧 EN" },
  { value: "ru", label: "🇷🇺 RU" },
];

const Header = () => {
  const menuRef = useRef(null);
  const { t, language, setLanguage } = useTranslation();
  const toggleMenu = () => menuRef.current?.classList.toggle("menu__active");

  return (
    <header className="header header--new">
      <Container>
        <div className="header__inner">
          <Link to="/" className="header__logo">
            <img
              src="/logo.jpg"
              alt={t("header.logo")}
              className="header__logo-img"
              width="44"
              height="44"
            />
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
                  end={item.path === "/"}
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
              <CustomSelect
                className="custom-select-root--header"
                variant="compact"
                options={LANG_OPTIONS}
                value={language}
                onChange={setLanguage}
                ariaLabel={t("header.language")}
              />
            </div>
            <a href="tel:+998776344747" className="header__phone">
              <i className="ri-phone-line"></i>+998776344747
            </a>
            <a
              href="https://t.me/RendcarQoqon"
              target="_blank"
              rel="noreferrer"
              className="header__cta"
            >
              <i className="ri-telegram-fill"></i>
              {t("header.apply")}
            </a>
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
