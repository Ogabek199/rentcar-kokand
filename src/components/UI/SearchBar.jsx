import React, { useState } from "react";
import "../../styles/search-bar.css";
import { useTranslation } from "../../i18n/LanguageContext";

const SearchBar = ({ onSearch, placeholder }) => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  const handleClear = () => {
    setSearchTerm("");
    onSearch("");
  };

  return (
    <div className="search-bar">
      <div className="search-bar__wrapper">
        <i className="ri-search-line search-bar__icon"></i>
        <input
          type="text"
          className="search-bar__input"
          placeholder={placeholder || t("filter.searchPlaceholder")}
          value={searchTerm}
          onChange={handleChange}
        />
        {searchTerm && (
          <button
            type="button"
            className="search-bar__clear"
            onClick={handleClear}
            aria-label={t("filter.clear")}
          >
            <i className="ri-close-line"></i>
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
