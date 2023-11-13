import { IMG_CDN_URL, restaurantList } from "../config.js";

const Body = () => {
  return (
    <div className="body">
      {restaurantList.map((restaurant) => {
        return <RestaurantCard {...restaurant.data} key={restaurant.data.id} />;
      })}
    </div>
  );
};

const RestaurantCard = ({ name, cuisines, avgRating, cloudinaryImageId }) => {
  // const { name, cuisines, avgRating, cloudinaryImageId } = restaurant.data;
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

export default Body;
