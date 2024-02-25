import React from "react";
import { useParams } from "react-router-dom";
import Shimmer from "./Shimmer";
import useRestaurant from "./useRestaurant";

const RestaurantMenu = () => {
  const { id } = useParams();

  const restaurantDetails = useRestaurant(id);

  return !restaurantDetails ? (
    <div className="shimmer-list">
      {Array(14)
        .fill()
        .map((_, index) => (
          <Shimmer key={index} />
        ))}
    </div>
  ) : (
    <div>
      <h1>Restaurant Menu : {id}</h1>
      {restaurantDetails.details && (
        <>
          <h2>{restaurantDetails.details.name}</h2>
          <img
            src={restaurantDetails.details.image}
            alt={restaurantDetails.details.name}
          />
          {restaurantDetails.items.map((item) => {
            return (
              <div key={item.id}>
                <h4>
                  {item.name} : {item.price}
                </h4>
              </div>
            );
          })}
        </>
      )}
      {restaurantDetails.items.length === 0 && (
        <p>Loading restaurant details...</p>
      )}
    </div>
  );
};

export default RestaurantMenu;
