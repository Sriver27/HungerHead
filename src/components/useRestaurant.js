import React, { useState, useEffect } from "react";
import { swiggy_menu_api_URL } from "../config";
import { IMG_CDN_URL } from "../config";

const useRestaurant = (id) => {
  const [restaurantDetails, setRestaurantDetails] = useState({
    items: [],
    details: {},
  });

  useEffect(() => {
    getRestaurantInfo();
  }, []);

  const getRestaurantInfo = async () => {
    try {
      const response = await fetch(swiggy_menu_api_URL + id);

      const json = await response.json();

      const resData = getRestaurantDetails(json.data);
      setRestaurantDetails(resData);
    } catch (error) {
      console.error("Error fetching restaurant info:", error);
    }
  };

  const getRestaurantDetails = (restaurantData) => {
    if (!restaurantData) return { items: [], details: {} };

    const itemData =
      restaurantData?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards[2]?.card?.card.itemCards?.map(
        (item) => {
          const itemInfo = item.card?.info;
          return {
            id: itemInfo?.id ?? "",
            name: itemInfo?.name ?? "",
            price: (itemInfo?.price ?? 0) / 100,
          };
        }
      ) || [];

    const cardInfo = restaurantData?.cards[0]?.card?.card?.info;

    const restaurantDetailsData = {
      name: cardInfo?.name ?? "",
      image: IMG_CDN_URL + (cardInfo?.cloudinaryImageId ?? ""),
      city: cardInfo?.city ?? "",
      locality: cardInfo?.locality ?? "",
      costForTwo: cardInfo?.costForTwoMessage ?? "",
      avgRating: cardInfo?.avgRating ?? "",
      cuisines: cardInfo?.cuisines ?? "",
    };

    return { items: itemData, details: restaurantDetailsData };
  };

  return restaurantDetails;
};

export default useRestaurant;
