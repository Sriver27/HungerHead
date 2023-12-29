import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Shimmer from "./Shimmer";
import { IMG_CDN_URL } from "../config";

const RestaurantMenu = () => {
  const [restaurant, setRestaurant] = useState(null);
  const [restaurantDetails, setRestaurantDetails] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    getRestaurantInfo(id);
  }, []);

  async function getRestaurantInfo(currentId) {
    try {
      const response = await fetch(
        `https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=22.7230606&lng=88.34845659999999&restaurantId=${currentId}`
      );
      console.log(
        `https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=22.7230606&lng=88.34845659999999&restaurantId=${currentId}`
      );
      const json = await response.json();

      setRestaurant(json.data);
      console.log("Complete Restaurant Data ->", restaurant);
      const resData = getRestaurantDetails();
      setRestaurantDetails(resData);
      console.log("Essential res data ->", resData);
    } catch (error) {
      console.error("Error fetching restaurant info:", error);
    }
  }

  function getRestaurantDetails() {
    if (!restaurant) return [];
    const data = [];
    const itemData = [];
    let itemsCount =
      restaurant.cards[2].groupedCard.cardGroupMap.REGULAR.cards[2].card.card
        .itemCards.length;
    console.log("Items Count ->", itemsCount);

    const itemsInfo =
      restaurant.cards[2].groupedCard.cardGroupMap.REGULAR.cards[2].card.card
        .itemCards;
    itemsInfo.forEach((item) => {
      const itemInfo = item.card?.info;
      if (itemInfo) {
        itemData.push({
          item: {
            id: itemInfo.id ?? "",
            name: itemInfo.name ?? "",
            price: itemInfo.price ?? "",
          },
        });
      }
    });
    data.push(itemData);
    restaurant.cards.forEach((card, index) => {
      const cardInfo = card.card?.card?.info;

      if (cardInfo) {
        data.push({
          name: cardInfo.name ?? "",
          image: IMG_CDN_URL + (cardInfo.cloudinaryImageId ?? ""),
          city: cardInfo.city ?? "",
          locality: cardInfo.locality ?? "",
          costForTwo: cardInfo.costForTwoMessage ?? "",
          avgRating: cardInfo.avgRating ?? "",
          cuisines: cardInfo.cuisines ?? "",
        });
      }
    });

    return data;
  }

  return !restaurant ? (
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
      {restaurantDetails.length > 0 && (
        <>
          <h2>{restaurantDetails[1].name}</h2>
          <img
            src={restaurantDetails[1].image}
            alt={restaurantDetails[1].name}
          />
        </>
      )}
      {restaurantDetails.length === 0 && <p>Loading restaurant details...</p>}
    </div>
  );
};

export default RestaurantMenu;
