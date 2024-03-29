import React from "react";
import { useParams } from "react-router-dom";
import {ShimmerCards} from "../components/ShimmerHome";
import useRestaurant from "../custom-hooks/useRestaurant";

const RestaurantMenu = () => {
  const { id } = useParams();

  const restaurantDetails = useRestaurant(id);

  return !restaurantDetails ? (
    <ShimmerCards/>
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
