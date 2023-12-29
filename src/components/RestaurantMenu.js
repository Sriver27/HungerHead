import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Shimmer from "./Shimmer";
import { IMG_CDN_URL } from "../config";

const RestaurantMenu = () => {
  // const [restaurant, setRestaurant] = useState(null);
  const [restaurantDetails, setRestaurantDetails] = useState({
    items: [],
    details: {},
  });
  const { id } = useParams();

  useEffect(() => {
    const getRestaurantInfo = async () => {
      try {
        const response = await fetch(
          `https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=22.7230606&lng=88.34845659999999&restaurantId=${id}`
        );
        const json = await response.json();

        // setRestaurant(json.data);
        const resData = getRestaurantDetails(json.data);
        setRestaurantDetails(resData);
        console.log("Essential res data ->", resData);
      } catch (error) {
        console.error("Error fetching restaurant info:", error);
      }
    };

    getRestaurantInfo();
  }, [id]);

  const getRestaurantDetails = (restaurantData) => {
    if (!restaurantData) return { items: [], details: {} };

    const itemData = restaurantData?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards[2]?.card?.card
      .itemCards?.map((item) => {
        const itemInfo = item.card?.info;
        return {
          id: itemInfo?.id ?? "",
          name: itemInfo?.name ?? "",
          price: (itemInfo?.price ?? 0) / 100,
        };
      }) || [];

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
          <img src={restaurantDetails.details.image} alt={restaurantDetails.details.name} />
        </>
      )}
      {restaurantDetails.items.length === 0 && <p>Loading restaurant details...</p>}
    </div>
  );
};

export default RestaurantMenu;
