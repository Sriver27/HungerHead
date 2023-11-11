import React from "react";
import ReactDOM from "react-dom/client";
import restaurantList from "./restaurant_data.js";

{
  /* 
        Header
          - Logo
          - Nav items
          - Cart
        
        Body
          - Search bar
          - Restaurant list
              - Restaurant card
                  - Restaurant image
                  - Restaurant name
                  - Restaurant rating
                  - Restaurant cuisine
                  
        
        Footer
          - Links
          - Copyright
      */
}

const Title = () => {
  return (
    <a href="/">
      <img
        className="logo"
        src={require("./assets/images/logo.png")}
        alt="logo"
      />
    </a>
  );
};

const HeaderComponent = () => {
  return (
    <div className="header">
      <Title />
      <div className="nav-items">
        <ul>
          <li>Home</li>
          <li>About</li>
          <li>Contact</li>
          <li>Cart</li>
        </ul>
      </div>
    </div>
  );
};

const RestaurantCard = ({ name, cuisines, avgRating, cloudinaryImageId }) => {
  // const { name, cuisines, avgRating, cloudinaryImageId } = restaurant.data;
  return (
    <div className="restaurant-card">
      <img
        className="restaurant-image"
        src={
          "https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_508,h_320,c_fill/" +
          cloudinaryImageId
        }
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

const Body = () => {
  return (
    <div className="body">
      {restaurantList.map((restaurant) => {
        return <RestaurantCard {...restaurant.data} key={restaurant.data.id} />;
      })}
    </div>
  );
};

const AppLayout = () => {
  return (
    <div className="app-layout">
      <HeaderComponent />
      <Body />
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<AppLayout />);
