import React, { useState, useMemo, useCallback } from "react";
import { Col } from "reactstrap";
import { Link } from "react-router-dom";
import "../../styles/car-item.css";
import { applyCarDiscount } from "../../utils/carPromo";
import FavoriteButton from "./FavoriteButton";
import QuickViewModal from "./QuickViewModal";
import { slugify } from "../../utils/slugify";
import { useTranslation } from "../../i18n/LanguageContext";

import malibu from "../../assets/all-images/cars-img/bmw-offer.png";

const formatCurrency = (value) =>
  new Intl.NumberFormat("uz-UZ", {
    style: "decimal",
    maximumFractionDigits: 0,
  }).format(value);

const CarItem = React.memo((props) => {
  const { t } = useTranslation();
  const { imgUrl, carName, automatic, price, rating = 4.8, slug } = props.item;
  
  const [imgSrc, setImgSrc] = useState(imgUrl);
  
  const handleImgError = useCallback(() => {
    setImgSrc(malibu);
  }, []);

  React.useEffect(() => {
    setImgSrc(imgUrl);
  }, [imgUrl]);

  // Narxlarni memoize qilish - faqat price o'zgarganda qayta hisoblash
  const { discounted, original } = useMemo(
    () => applyCarDiscount(price),
    [price]
  );

  const [showQuickView, setShowQuickView] = useState(false);
  
  // Use custom col props if provided, otherwise use default
  const colProps = props.colProps || { lg: "4", md: "6", sm: "6" };

  // Formatlangan narxlarni memoize qilish
  const formattedDiscounted = useMemo(() => formatCurrency(discounted), [discounted]);
  const formattedOriginal = useMemo(() => formatCurrency(original), [original]);

  // Handler'larni memoize qilish
  const handleQuickViewOpen = useCallback(() => {
    setShowQuickView(true);
  }, []);

  const handleQuickViewClose = useCallback(() => {
    setShowQuickView(false);
  }, []);

  return (
    <>
      <Col {...colProps} className="mb-4 animate-on-scroll animate-fade-in-up">
        <div className="car__item car__item--new">
          <div className="car__item-img-wrap">
            <img 
              src={imgSrc} 
              alt={carName} 
              className="car__item-img" 
              loading="lazy"
              decoding="async"
              width="400"
              height="300"
              onError={handleImgError}
            />
            <div className="car__item-price-tag">
              <div className="car__item-price-row">
                <span className="car__item-price-new">
                  {formattedDiscounted} {t("common.som")}
                </span>
                <span className="car__item-price-per">{t("common.perDay")}</span>
              </div>
              <span className="car__item-price-old">{formattedOriginal} {t("common.som")}</span>
            </div>
            <div className="car__item-actions">
              <FavoriteButton carId={props.item.id} size="medium" />
              <button
                className="car__item-quick-view"
                onClick={handleQuickViewOpen}
                aria-label={t("common.details")}
                title={t("common.details")}
              >
                <i className="ri-eye-line"></i>
              </button>
            </div>
          </div>
          <div className="car__item-content">
            <h4 className="car__item-title">{carName}</h4>
            <div className="car__item-features">
              <span><i className="ri-settings-3-line"></i> {automatic}</span>
              <span><i className="ri-user-line"></i> 4</span>
              <span><i className="ri-star-fill"></i> {rating}</span>
            </div>
            <Link to={`/cars/${slug || slugify(carName)}`} className="car__item-btn">
              {t("common.details")}
            </Link>
          </div>
        </div>
      </Col>
      <QuickViewModal
        car={props.item}
        isOpen={showQuickView}
        onClose={handleQuickViewClose}
      />
    </>
  );
});

CarItem.displayName = "CarItem";

export default CarItem;
