import React, { useState, useEffect, useCallback } from "react";
import ImageMagnifier from "./ImageMagnifier";
import "../../styles/image-lightbox.css";

const ImageLightbox = ({ images, currentIndex = 0, onClose }) => {
  const [activeIndex, setActiveIndex] = useState(currentIndex);

  useEffect(() => {
    setActiveIndex(currentIndex);
  }, [currentIndex]);

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowLeft") {
        handlePrev();
      } else if (e.key === "ArrowRight") {
        handleNext();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [activeIndex, onClose, handleNext, handlePrev]);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!images || images.length === 0) return null;

  return (
    <div className="lightbox" onClick={handleBackdropClick}>
      <button className="lightbox__close" onClick={onClose} aria-label="Yopish">
        <i className="ri-close-line"></i>
      </button>

      {images.length > 1 && (
        <>
          <button
            className="lightbox__nav lightbox__nav--prev"
            onClick={handlePrev}
            aria-label="Oldingi rasm"
          >
            <i className="ri-arrow-left-line"></i>
          </button>
          <button
            className="lightbox__nav lightbox__nav--next"
            onClick={handleNext}
            aria-label="Keyingi rasm"
          >
            <i className="ri-arrow-right-line"></i>
          </button>
        </>
      )}

      <div className="lightbox__content">
        <ImageMagnifier
          src={images[activeIndex]}
          alt={`Rasm ${activeIndex + 1}`}
          className="lightbox__magnifier"
          zoomLevel={2.2}
          lensSize={180}
        />
        {images.length > 1 && (
          <div className="lightbox__counter">
            {activeIndex + 1} / {images.length}
          </div>
        )}
      </div>

      {images.length > 1 && (
        <div className="lightbox__thumbnails">
          {images.map((img, index) => (
            <button
              key={index}
              className={`lightbox__thumbnail ${
                index === activeIndex ? "active" : ""
              }`}
              onClick={() => setActiveIndex(index)}
            >
              <img 
                src={img} 
                alt={`Thumbnail ${index + 1}`} 
                loading="lazy"
                decoding="async"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export const ImageGallery = ({ images, className = "" }) => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openLightbox = (index) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
  };

  if (!images || images.length === 0) return null;

  if (images.length === 1 && className.includes("single-image")) {
    return (
      <>
        <div className={`image-gallery ${className}`}>
          <div
            className="image-gallery__item image-gallery__item--magnifier"
            onClick={() => openLightbox(0)}
          >
            <ImageMagnifier
              src={images[0]}
              alt="Gallery"
              zoomLevel={2}
              lensSize={140}
              className="image-gallery__magnifier"
            />
            <div className="image-gallery__overlay">
              <i className="ri-zoom-in-line"></i>
            </div>
          </div>
        </div>

        {lightboxOpen && (
          <ImageLightbox
            images={images}
            currentIndex={currentIndex}
            onClose={() => setLightboxOpen(false)}
          />
        )}
      </>
    );
  }

  return (
    <>
      <div className={`image-gallery ${className}`}>
        {images.map((img, index) => (
          <div
            key={index}
            className="image-gallery__item"
            onClick={() => openLightbox(index)}
          >
            <img src={img} alt={`Gallery ${index + 1}`} loading="lazy" />
            <div className="image-gallery__overlay">
              <i className="ri-zoom-in-line"></i>
            </div>
          </div>
        ))}
      </div>

      {lightboxOpen && (
        <ImageLightbox
          images={images}
          currentIndex={currentIndex}
          onClose={() => setLightboxOpen(false)}
        />
      )}
    </>
  );
};

export default ImageLightbox;
