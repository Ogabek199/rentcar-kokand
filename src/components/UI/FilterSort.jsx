import React, { useMemo, useState } from "react";
import "../../styles/filter-sort.css";
import { useTranslation } from "../../i18n/LanguageContext";
import CustomSelect from "./CustomSelect";

const FilterSort = ({ onFilterChange, onSortChange, searchComponent }) => {
  const { t } = useTranslation();
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    transmission: "all",
  });
  const [sortBy, setSortBy] = useState("default");

  const sortOptions = useMemo(
    () => [
      { value: "default", label: t("filter.default") },
      { value: "name-asc", label: t("filter.nameAsc") },
      { value: "name-desc", label: t("filter.nameDesc") },
    ],
    [t]
  );

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleSortChange = (value) => {
    setSortBy(value);
    onSortChange(value);
  };

  const handleReset = () => {
    const resetFilters = {
      transmission: "all",
    };
    setFilters(resetFilters);
    setSortBy("default");
    onFilterChange(resetFilters);
    onSortChange("default");
  };

  return (
    <div className="filter-sort">
      <div className="filter-sort__header">
        <button
          className="filter-sort__toggle"
          onClick={() => setShowFilters(!showFilters)}
        >
          <i className="ri-filter-line"></i>
          {t("filter.filters")}
          {showFilters ? (
            <i className="ri-arrow-up-s-line"></i>
          ) : (
            <i className="ri-arrow-down-s-line"></i>
          )}
        </button>

        {searchComponent && (
          <div className="filter-sort__search">
            {searchComponent}
          </div>
        )}

        <div className="filter-sort__sort">
          <label htmlFor="sort-select">
            <i className="ri-sort-desc"></i>
            {t("filter.sort")}
          </label>
          <CustomSelect
            id="sort-select"
            options={sortOptions}
            value={sortBy}
            onChange={handleSortChange}
            ariaLabel={t("filter.sort")}
            className="filter-sort__custom-select"
          />
        </div>
      </div>

      {showFilters && (
        <div className="filter-sort__panel">
          <div className="filter-sort__group">
            <label className="filter-sort__label">{t("filter.transmission")}</label>
            <div className="filter-sort__options">
              <button
                className={`filter-sort__option ${
                  filters.transmission === "all" ? "active" : ""
                }`}
                onClick={() => handleFilterChange("transmission", "all")}
              >
                {t("filter.all")}
              </button>
              <button
                className={`filter-sort__option ${
                  filters.transmission === "Automatic" ? "active" : ""
                }`}
                onClick={() => handleFilterChange("transmission", "Automatic")}
              >
                {t("filter.automatic")}
              </button>
              <button
                className={`filter-sort__option ${
                  filters.transmission === "Manual" ? "active" : ""
                }`}
                onClick={() => handleFilterChange("transmission", "Manual")}
              >
                {t("filter.manual")}
              </button>
            </div>
          </div>

          <button className="filter-sort__reset" onClick={handleReset}>
            <i className="ri-refresh-line"></i>
            {t("filter.clear")}
          </button>
        </div>
      )}
    </div>
  );
};

export default FilterSort;
