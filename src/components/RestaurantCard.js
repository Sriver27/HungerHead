import { IMG_CDN_URL } from "../config";

const RestaurantCard = ({
  name,
  cuisines,
  avgRating,
  cloudinaryImageId,
  locality,
  areaName,
}) => {
  let ratingType;
  if (avgRating >= 4.0) {
    ratingType = "green";
  } else if (avgRating < 4.0 && avgRating > 3.0) {
    ratingType = "yellow";
  } else {
    ratingType = "red";
  }
  return (
    <div className="restaurant-card">
      <div className="img_box">
      <img
        className="restaurant-image"
        src={IMG_CDN_URL + cloudinaryImageId}
        alt="restaurant"
      />
      {avgRating && <p className={"ratings " + ratingType}>{avgRating} ⭐</p>}
      </div>
      
      <div className="restaurant-details">
        <h3 className="res-name">{name}</h3>
        <h4 className="restaurant-location">
          {locality?.trim() == areaName?.trim()? locality + ", " + areaName: locality}
        </h4>
        <h4 className="restaurant-cuisine">{cuisines?.join(", ")}</h4>
      </div>
    </div>
  );
};

export default RestaurantCard;
