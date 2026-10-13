import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import "../../styles/bottom-navbar.css";
import { useTranslation } from "../../i18n/LanguageContext";

const BottomNavbar = () => {
  const location = useLocation();
  const { t } = useTranslation();

  const navItems = [
    { path: "/", icon: "ri-home-line", activeIcon: "ri-home-fill", key: "bottomNav.home" },
    { path: "/cars", icon: "ri-car-line", activeIcon: "ri-car-fill", key: "bottomNav.cars" },
    { path: "/prices", icon: "ri-price-tag-3-line", activeIcon: "ri-price-tag-3-fill", key: "bottomNav.prices" },
    { path: "/about", icon: "ri-information-line", activeIcon: "ri-information-fill", key: "bottomNav.about" },
    { path: "/contact", icon: "ri-phone-line", activeIcon: "ri-phone-fill", key: "bottomNav.contact" },
  ];

  const isActive = (path) => {
    if (path === "/") return location.pathname === "/" || location.pathname === "/home";
    return location.pathname === path || location.pathname.startsWith(path + "/");
  };

  return (
    <nav className="bottom-navbar">
      <div className="bottom-navbar__container">
        {navItems.map((item) => {
          const active = isActive(item.path);
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={`bottom-navbar__item ${active ? "active" : ""}`}
            >
              <div className="bottom-navbar__icon-wrapper">
                <i className={active ? item.activeIcon : item.icon}></i>
              </div>
              <span className="bottom-navbar__label">{t(item.key)}</span>
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNavbar;
