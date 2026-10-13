import React, { useState } from "react";
import { Form, FormGroup } from "reactstrap";
import { useNavigate } from "react-router-dom";
import "../../styles/find-car-form.css";
import { useTranslation } from "../../i18n/LanguageContext";
import CustomDatePicker from "./CustomDatePicker";
import CustomSelect from "./CustomSelect";

const CAR_TYPE_OPTIONS = [
  { value: "Malibu", label: "Malibu" },
  { value: "Jentra", label: "Jentra" },
  { value: "Equinox", label: "Equinox" },
  { value: "Tahoe", label: "Tahoe" },
  { value: "Onix", label: "Onix" },
  { value: "Captiva", label: "Captiva" },
];

const FindCarForm = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    pickupDate: "",
    returnDate: "",
    carType: "Malibu",
  });

  const setField = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const query = new URLSearchParams(
      Object.entries(formData).filter(([, v]) => v !== "")
    ).toString();
    navigate(`/cars${query ? `?${query}` : ""}`);
  };

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return (
    <Form className="find-car-form find-car-form--new" onSubmit={handleSubmit}>
      <div className="find-car-form__grid">
        <FormGroup className="find-car-form__group">
          <label className="find-car-form__label">{t("findCar.pickup")}</label>
          <CustomDatePicker
            name="pickupDate"
            value={formData.pickupDate}
            minDate={today}
            selectsStart
            startDate={formData.pickupDate}
            endDate={formData.returnDate}
            onChange={(value) => {
              setField("pickupDate", value);
              if (value && formData.returnDate && value > formData.returnDate) {
                setField("returnDate", "");
              }
            }}
          />
        </FormGroup>
        <FormGroup className="find-car-form__group">
          <label className="find-car-form__label">{t("findCar.return")}</label>
          <CustomDatePicker
            name="returnDate"
            value={formData.returnDate}
            minDate={formData.pickupDate || today}
            selectsEnd
            startDate={formData.pickupDate}
            endDate={formData.returnDate}
            onChange={(value) => setField("returnDate", value)}
          />
        </FormGroup>
        <FormGroup className="find-car-form__group">
          <label className="find-car-form__label">{t("findCar.type")}</label>
          <CustomSelect
            name="carType"
            options={CAR_TYPE_OPTIONS}
            value={formData.carType}
            onChange={(value) => setField("carType", value)}
            ariaLabel={t("findCar.type")}
          />
        </FormGroup>
        <FormGroup className="find-car-form__group find-car-form__group--btn">
          <button type="submit" className="find-car-form__submit">
            <i className="ri-search-line"></i>
            {t("findCar.search")}
          </button>
        </FormGroup>
      </div>
    </Form>
  );
};

export default FindCarForm;
