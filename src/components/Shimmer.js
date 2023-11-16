import React from "react";

const ShimmerCard = () => {
  return (
    <div className="restaurant-card shimmer">
      <div className="shimmer-placeholder restaurant-image"></div>
      <div className="restaurant-details">
        <h3 className="shimmer-placeholder"></h3>
        <h4 className="restaurant-rating shimmer-placeholder"></h4>
        <h5 className="restaurant-cuisine shimmer-placeholder"></h5>
      </div>
    </div>
  );
};

export default ShimmerCard;
