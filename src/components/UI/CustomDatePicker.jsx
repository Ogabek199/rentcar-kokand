import React from "react";
import DatePicker from "react-datepicker";
import { uz, enUS, ru } from "date-fns/locale";
import { useTranslation } from "../../i18n/LanguageContext";
import "react-datepicker/dist/react-datepicker.css";
import "../../styles/custom-controls.css";

const LOCALES = { uz, en: enUS, ru };

const parseDate = (value) => {
  if (!value) return null;
  if (value instanceof Date) return Number.isNaN(value.getTime()) ? null : value;
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
};

const formatToIso = (date) => {
  if (!date) return "";
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
};

/**
 * Custom date picker built on react-datepicker.
 * value / onChange can use ISO strings ("YYYY-MM-DD") or Date objects.
 */
const CustomDatePicker = ({
  value,
  onChange,
  minDate,
  maxDate,
  placeholder,
  name,
  id,
  className = "",
  showIcon = true,
  asIsoString = true,
  selectsStart,
  selectsEnd,
  startDate,
  endDate,
  disabled = false,
}) => {
  const { language, t } = useTranslation();
  const selected = parseDate(value);
  const min = parseDate(minDate) || undefined;
  const max = parseDate(maxDate) || undefined;

  const handleChange = (date) => {
    if (!onChange) return;
    onChange(asIsoString ? formatToIso(date) : date);
  };

  return (
    <div className={`custom-datepicker ${className}`.trim()}>
      {showIcon && <i className="ri-calendar-line custom-datepicker__icon" aria-hidden />}
      <DatePicker
        id={id}
        name={name}
        selected={selected}
        onChange={handleChange}
        minDate={min}
        maxDate={max}
        locale={LOCALES[language] || uz}
        dateFormat="dd.MM.yyyy"
        placeholderText={placeholder || t("common.selectDate")}
        selectsStart={selectsStart}
        selectsEnd={selectsEnd}
        startDate={parseDate(startDate) || undefined}
        endDate={parseDate(endDate) || undefined}
        disabled={disabled}
        calendarClassName="custom-datepicker__calendar"
        popperClassName="custom-datepicker__popper"
        popperPlacement="bottom-start"
        popperProps={{ strategy: "fixed" }}
        portalId="datepicker-portal"
        showPopperArrow={false}
        autoComplete="off"
      />
    </div>
  );
};

export default CustomDatePicker;
export { formatToIso, parseDate };
