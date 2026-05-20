import React, { useState, useRef, useCallback, useEffect } from "react";
import "../../styles/image-magnifier.css";
import fallbackImg from "../../assets/all-images/cars-img/bmw-offer.png";

/**
 * Rasmdagidek doira (linza) ichida zoom – kursorni harakatlantirganda
 * doira ichida kattalashtirilgan qism ko'rinadi.
 */
const ImageMagnifier = ({
  src,
  alt = "",
  zoomLevel = 2.2,
  lensSize = 160,
  className = "",
}) => {
  const [imgSrc, setImgSrc] = useState(src);
  const [lensStyle, setLensStyle] = useState(null);
  const [showLens, setShowLens] = useState(false);
  const containerRef = useRef(null);
  const imgRef = useRef(null);

  useEffect(() => {
    setImgSrc(src);
  }, [src]);

  const handleImgError = useCallback(() => {
    setImgSrc(fallbackImg);
  }, []);

  const handleMouseEnter = useCallback(() => setShowLens(true), []);
  const handleMouseLeave = useCallback(() => {
    setShowLens(false);
    setLensStyle(null);
  }, []);

  const handleMouseMove = useCallback(
    (e) => {
      const container = containerRef.current;
      const img = imgRef.current;
      if (!container || !img || !img.complete) return;

      const imgRect = img.getBoundingClientRect();
      const x = e.clientX - imgRect.left;
      const y = e.clientY - imgRect.top;

      if (x < 0 || y < 0 || x > imgRect.width || y > imgRect.height) {
        setShowLens(false);
        return;
      }

      const half = lensSize / 2;
      const rx = (x / imgRect.width) * img.naturalWidth;
      const ry = (y / imgRect.height) * img.naturalHeight;
      const bgSizeW = img.naturalWidth * zoomLevel;
      const bgSizeH = img.naturalHeight * zoomLevel;
      const posX = -rx * zoomLevel + half;
      const posY = -ry * zoomLevel + half;

      const containerRect = container.getBoundingClientRect();
      const lensLeft = e.clientX - containerRect.left;
      const lensTop = e.clientY - containerRect.top;

      setLensStyle({
        left: `${lensLeft}px`,
        top: `${lensTop}px`,
        width: lensSize,
        height: lensSize,
        marginLeft: -half,
        marginTop: -half,
        backgroundImage: `url(${imgSrc})`,
        backgroundSize: `${bgSizeW}px ${bgSizeH}px`,
        backgroundPosition: `${posX}px ${posY}px`,
      });
    },
    [imgSrc, zoomLevel, lensSize]
  );

  return (
    <div
      ref={containerRef}
      className={`image-magnifier ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
    >
      <img 
        ref={imgRef} 
        src={imgSrc} 
        alt={alt} 
        className="image-magnifier__img" 
        draggable={false}
        loading="lazy"
        decoding="async"
        onError={handleImgError}
      />
      {showLens && lensStyle && (
        <div
          className="image-magnifier__lens"
          style={{
            left: lensStyle.left,
            top: lensStyle.top,
            width: lensStyle.width,
            height: lensStyle.height,
            marginLeft: lensStyle.marginLeft,
            marginTop: lensStyle.marginTop,
            backgroundImage: lensStyle.backgroundImage,
            backgroundSize: lensStyle.backgroundSize,
            backgroundPosition: lensStyle.backgroundPosition,
          }}
          aria-hidden="true"
        />
      )}
    </div>
  );
};

export default ImageMagnifier;
