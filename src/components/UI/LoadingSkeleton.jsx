import React from "react";
import "../../styles/loading-skeleton.css";

export const CarCardSkeleton = () => {
  return (
    <div className="skeleton-card">
      <div className="skeleton-image"></div>
      <div className="skeleton-content">
        <div className="skeleton-title"></div>
        <div className="skeleton-text"></div>
        <div className="skeleton-text short"></div>
        <div className="skeleton-button"></div>
      </div>
    </div>
  );
};

export const TestimonialSkeleton = () => {
  return (
    <div className="skeleton-card">
      <div className="skeleton-stars"></div>
      <div className="skeleton-text"></div>
      <div className="skeleton-text"></div>
      <div className="skeleton-author">
        <div className="skeleton-avatar"></div>
        <div className="skeleton-info">
          <div className="skeleton-text short"></div>
          <div className="skeleton-text short"></div>
        </div>
      </div>
    </div>
  );
};

export const BlogCardSkeleton = () => {
  return (
    <div className="skeleton-card">
      <div className="skeleton-image"></div>
      <div className="skeleton-content">
        <div className="skeleton-title"></div>
        <div className="skeleton-text"></div>
        <div className="skeleton-text"></div>
        <div className="skeleton-text short"></div>
        <div className="skeleton-meta">
          <div className="skeleton-text short"></div>
          <div className="skeleton-text short"></div>
        </div>
      </div>
    </div>
  );
};

export const PageSkeleton = () => {
  return (
    <div className="skeleton-page">
      <div className="skeleton-header"></div>
      <div className="skeleton-content">
        <div className="skeleton-title large"></div>
        <div className="skeleton-text"></div>
        <div className="skeleton-text"></div>
        <div className="skeleton-grid">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <CarCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CarCardSkeleton;
