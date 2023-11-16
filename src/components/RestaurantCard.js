import { IMG_CDN_URL } from "../config";

// Restaurant card component: Image, name, cuisine
const RestaurantCard = ({ name, cuisines, avgRating, cloudinaryImageId }) => {
  return (
    <div className="restaurant-card">
      <img
        className="restaurant-image"
        src={IMG_CDN_URL + cloudinaryImageId}
        alt="restaurant"
      />
      <div className="restaurant-details">
        <h3>{name}</h3>
        <h4 className="restaurant-rating">{avgRating}⭐</h4>
        <h5 className="restaurant-cuisine">{cuisines?.join(", ")}</h5>
      </div>
    </div>
  );
};

export default RestaurantCard;
