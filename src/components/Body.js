import { useState } from "react";
import { IMG_CDN_URL, restaurantList } from "../config.js";

const filterData = (restaurants, searchText) => {
  return restaurants.filter((restaurant) =>
    restaurant?.data?.name.toLowerCase().includes(searchText.toLowerCase())
  );
};

const Body = () => {
  const [searchText, setSearchText] = useState("");
  const [originalRestaurants, setOriginalRestaurants] =
    useState(restaurantList);
  const [restaurants, setRestaurants] = useState(originalRestaurants);

  const handleSearch = () => {
    const data = filterData(originalRestaurants, searchText);
    setRestaurants(data);
  };

  const handleSearchTextChange = (e) => {
    setSearchText(e.target.value);
    if (e.target.value === "") {
      // If the search text is empty, restore the original data
      setRestaurants(originalRestaurants);
    }
  };

  return (
    <>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search"
          value={searchText}
          onChange={handleSearchTextChange}
        />
        <button className="search-btn" onClick={handleSearch}>
          Search
        </button>
      </div>
      <div className="body">
        {restaurants.map((restaurant) => (
          <RestaurantCard {...restaurant.data} key={restaurant.data.id} />
        ))}
      </div>
    </>
  );
};

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

export default Body;
