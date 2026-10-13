import React from "react";
import Select, { components } from "react-select";

const DropdownIndicator = (props) => (
  <components.DropdownIndicator {...props}>
    <i className="ri-arrow-down-s-line" aria-hidden />
  </components.DropdownIndicator>
);

const IndicatorSeparator = () => null;

const baseStyles = {
  control: (provided, state) => ({
    ...provided,
    minHeight: 44,
    borderRadius: 12,
    borderColor: state.isFocused ? "rgba(229, 160, 13, 0.55)" : "rgba(18, 24, 38, 0.08)",
    backgroundColor: state.isFocused ? "#fff" : "#f4f6f9",
    boxShadow: state.isFocused ? "0 0 0 3px rgba(229, 160, 13, 0.15)" : "none",
    cursor: "pointer",
    transition: "border-color 0.2s ease, box-shadow 0.2s ease, background 0.2s ease",
    "&:hover": {
      borderColor: state.isFocused ? "rgba(229, 160, 13, 0.55)" : "rgba(18, 24, 38, 0.16)",
    },
  }),
  valueContainer: (provided) => ({
    ...provided,
    padding: "2px 12px",
  }),
  singleValue: (provided) => ({
    ...provided,
    color: "var(--color-text, #334155)",
    fontSize: "0.95rem",
    fontWeight: 500,
  }),
  placeholder: (provided) => ({
    ...provided,
    color: "var(--color-text-muted, #64748b)",
    fontSize: "0.95rem",
  }),
  input: (provided) => ({
    ...provided,
    color: "var(--color-text, #334155)",
    margin: 0,
  }),
  indicatorsContainer: (provided) => ({
    ...provided,
    paddingRight: 6,
  }),
  dropdownIndicator: (provided) => ({
    ...provided,
    color: "var(--color-text-muted, #64748b)",
    padding: 6,
    "&:hover": { color: "var(--color-primary, #e5a00d)" },
  }),
  menu: (provided) => ({
    ...provided,
    borderRadius: 12,
    overflow: "hidden",
    boxShadow: "0 12px 32px rgba(18, 24, 38, 0.14)",
    border: "1px solid rgba(18, 24, 38, 0.06)",
    zIndex: 40,
  }),
  menuPortal: (provided) => ({
    ...provided,
    zIndex: 5000,
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected
      ? "var(--color-primary, #e5a00d)"
      : state.isFocused
        ? "rgba(229, 160, 13, 0.12)"
        : "#fff",
    color: state.isSelected ? "#fff" : "var(--color-text, #334155)",
    cursor: "pointer",
    fontSize: "0.95rem",
    fontWeight: state.isSelected ? 700 : 500,
    ":active": {
      backgroundColor: state.isSelected
        ? "var(--color-primary, #e5a00d)"
        : "rgba(229, 160, 13, 0.2)",
    },
  }),
};

/**
 * Custom select built on react-select.
 * Accepts either { value, label } options or plain string options.
 */
const CustomSelect = ({
  options = [],
  value,
  onChange,
  placeholder,
  isSearchable = false,
  isClearable = false,
  name,
  id,
  className = "",
  classNamePrefix = "custom-select",
  ariaLabel,
  menuPortalTarget = typeof document !== "undefined" ? document.body : null,
  styles: stylesOverride,
  variant = "default",
}) => {
  const normalized = options.map((opt) =>
    typeof opt === "string" || typeof opt === "number"
      ? { value: opt, label: String(opt) }
      : opt
  );

  const selected =
    value == null || value === ""
      ? null
      : normalized.find((o) => o.value === value) || { value, label: String(value) };

  const variantStyles =
    variant === "compact"
      ? {
          control: (provided, state) => ({
            ...baseStyles.control(provided, state),
            minHeight: 36,
            borderRadius: 9999,
            backgroundColor: "transparent",
            borderColor: "transparent",
            boxShadow: "none",
            "&:hover": { borderColor: "transparent" },
          }),
          valueContainer: (provided) => ({
            ...provided,
            padding: "0 4px 0 8px",
          }),
          singleValue: (provided) => ({
            ...provided,
            fontSize: "0.85rem",
            fontWeight: 700,
            color: "var(--color-text, #334155)",
          }),
        }
      : {};

  const mergedStyles = {
    ...baseStyles,
    ...variantStyles,
    ...(stylesOverride || {}),
  };

  return (
    <Select
      inputId={id}
      name={name}
      className={`custom-select-root ${className}`.trim()}
      classNamePrefix={classNamePrefix}
      options={normalized}
      value={selected}
      onChange={(opt) => onChange?.(opt ? opt.value : "")}
      placeholder={placeholder}
      isSearchable={isSearchable}
      isClearable={isClearable}
      styles={mergedStyles}
      components={{ DropdownIndicator, IndicatorSeparator }}
      menuPortalTarget={menuPortalTarget}
      menuPosition="fixed"
      aria-label={ariaLabel}
    />
  );
};

export default CustomSelect;
