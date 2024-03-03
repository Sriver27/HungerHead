import React, { useState, useEffect } from "react";
import { swiggy_api_URL } from "../config";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../redux/slices/apiSlice/apiActions";

const useRestaurantList = () => {
  const [allRestaurants, setAllRestaurants] = useState([]);
  const [categoryMenu, setCategoryMenu] = useState([]);

  /* redux */
  const dispatch = useDispatch();
  const restaurantsList = useSelector((state) => state.data.fetchRestaurants);
  const { userLocation } = useSelector((state) => state.location);

  useEffect(() => {
    const dynamicRestaurantListUrl =
      swiggy_api_URL + "lat=" + userLocation?.lat + "&lng=" + userLocation?.lng;

    dispatch(fetchData("fetchRestaurants", dynamicRestaurantListUrl));
  }, [dispatch, userLocation?.lat, userLocation?.lng]);

  useEffect(() => {
    getRestaurants();
  }, [getRestaurants]);

  async function getRestaurants() {
    try {
      async function checkJsonData(jsonData) {
        for (let i = 0; i < jsonData?.data?.data?.cards?.length; i++) {
          let checkData =
            jsonData?.data?.data?.cards[i]?.card?.card?.gridElements
              ?.infoWithStyle?.restaurants;
          if (checkData !== undefined) {
            return checkData;
          }
        }
      }

      const resData = await checkJsonData(restaurantsList);
      setCategoryMenu(
        restaurantsList?.data?.data?.cards[0]?.card?.card?.gridElements
          ?.infoWithStyle?.info
      );

      setAllRestaurants(resData);
    } catch (error) {
      console.error("Error while processing restaurant list data:", error);
    }
  }

  return {
    allRestaurants,
    categoryMenu,
  };
};

export default useRestaurantList;
