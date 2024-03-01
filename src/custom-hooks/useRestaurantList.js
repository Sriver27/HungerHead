import React, {useState, useEffect} from 'react'
import { swiggy_api_URL } from "../config";
import { useDispatch, useSelector } from 'react-redux';
import { fetchData } from "../redux/slices/apiSlice/apiActions";

const useRestaurantList = () => {
    const [allRestaurants, setAllRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [categoryMenu, setCategoryMenu] = useState([]);

  function filterData(searchText, restaurants) {
    const resFilterData = restaurants.filter((restaurant) =>
      restaurant?.info?.name.toLowerCase().includes(searchText.toLowerCase())
    );
    return resFilterData;
  }

  /* redux */
  const dispatch = useDispatch();
  const restaurantsList = useSelector((state) => state.data.fetchRestaurants);
  const { userLocation } = useSelector((state) => state.location);

  useEffect(() => {
    const dynamicRestaurantListUrl = swiggy_api_URL + "lat=" + userLocation?.lat + "&lng=" + userLocation?.lng;

    dispatch(fetchData("fetchRestaurants", dynamicRestaurantListUrl));
    
  }, [dispatch, userLocation?.lat, userLocation?.lng]);

  getRestaurants();

  async function getRestaurants() {
    try {
      async function checkJsonData(jsonData) {
        for (let i = 0; i < jsonData?.data?.data?.cards?.length; i++) {
          let checkData =jsonData?.data?.data?.cards[i]?.card?.card?.gridElements?.infoWithStyle?.restaurants;
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
      setFilteredRestaurants(resData);
      setErrorMessage("");
    } catch (error) {
      console.error("Error while processing restaurant list data:", error);
    }
  }

  const searchData = (searchText, restaurants) => {
    if (searchText !== "") {
      const filteredData = filterData(searchText, restaurants);
      setFilteredRestaurants(filteredData);
      setErrorMessage("");
      if (filteredData?.length === 0) {
        setErrorMessage("No matches restaurant found");
        setFilteredRestaurants([]);
      }
    } else {
      setErrorMessage("");
      setFilteredRestaurants(restaurants);
    }
  };
  return { allRestaurants, filteredRestaurants, errorMessage, categoryMenu, searchData }
}

export default useRestaurantList
