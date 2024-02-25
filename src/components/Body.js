import RestaurantCard from "./RestaurantCard";
import { useEffect, useState } from "react";
import Shimmer from "./Shimmer";
import { swiggy_api_URL } from "../config";
import { Link } from "react-router-dom";
import useConnectivityStatus from "./useConnectivityStatus";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../redux/slices/apiSlice/apiActions";

function filterData(searchText, restaurants) {
  const resFilterData = restaurants.filter((restaurant) =>
    restaurant?.info?.name.toLowerCase().includes(searchText.toLowerCase())
  );
  return resFilterData;
}

const getUserLocation = () => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        resolve({ lat: latitude, lng: longitude });
      },
      (error) => {
        reject(error);
      }
    );
  });
};

const Body = () => {
  const [searchText, setSearchText] = useState("");
  // const [userLocation, setUserLocation] = useState({ lat: "", lng: "" });
  const [allRestaurants, setAllRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useDispatch();
  const restaurantsList = useSelector((state) => state.data.fetchRestaurants);
  const { userLocation, loading, error } = useSelector(
    (state) => state.location
  );
  console.log("->", userLocation);

  useEffect(() => {
    getRestaurants();
    const fetchUserLocation = async () => {
      try {
        const location = await getUserLocation();
        // setUserLocation(location);
      } catch (error) {
        console.error("Error getting user location:", error);
      }
    };

    fetchUserLocation();
  }, []);

  useEffect(() => {
    const dynamicRestaurantListUrl =
      swiggy_api_URL + "lat=" + userLocation?.lat + "&lng=" + userLocation?.lng;
    console.log(dynamicRestaurantListUrl);
    dispatch(fetchData("fetchRestaurants", dynamicRestaurantListUrl));
  }, [dispatch]);

  async function getRestaurants() {
    try {
      const response = await fetch(swiggy_api_URL);
      const json = await response.json();

      async function checkJsonData(jsonData) {
        for (let i = 0; i < jsonData?.data?.cards.length; i++) {
          let checkData =
            json?.data?.cards[i]?.card?.card?.gridElements?.infoWithStyle
              ?.restaurants;

          console.log(checkData);

          if (checkData !== undefined) {
            return checkData;
          }
        }
      }

      const resData = await checkJsonData(json);

      setAllRestaurants(resData);
      setFilteredRestaurants(resData);
    } catch (error) {
      console.log(error);
    }
  }

  const searchData = (searchText, restaurants) => {
    if (searchText !== "") {
      const filteredData = filterData(searchText, restaurants);
      setFilteredRestaurants(filteredData);
      setErrorMessage("");
      if (filteredData?.length === 0) {
        setErrorMessage("No matches restaurant found");
      }
    } else {
      setErrorMessage("");
      setFilteredRestaurants(restaurants);
    }
  };

  const isOnline = useConnectivityStatus();

  if (!isOnline) {
    return (
      <>
        <h1>Sorry, you are offline</h1>
        <p>Connect to the internet to avail the services</p>
      </>
    );
  }

  if (!allRestaurants) return null;

  return (
    <>
      {console.log("Redux thunk fetched list -> ", restaurantsList?.data)}
      <div className="search-container">
        <input
          type="text"
          className="search-input"
          placeholder="Search a restaurant you want..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        ></input>
        <button
          className="search-btn"
          onClick={() => {
            searchData(searchText, allRestaurants);
          }}
        >
          Search
        </button>
      </div>
      {errorMessage && <div className="error-container">{errorMessage}</div>}

      {allRestaurants?.length === 0 ? (
        <div className="shimmer-list">
          {Array(14)
            .fill()
            .map((_, index) => (
              <Shimmer key={index} />
            ))}
        </div>
      ) : (
        <div className="restaurant-list">
          {filteredRestaurants.map((restaurant) => {
            return (
              <Link
                to={`/restaurant/${restaurant?.info?.id}`}
                key={restaurant?.info?.id}
              >
                <RestaurantCard {...restaurant?.info} />
              </Link>
            );
          })}
        </div>
      )}
    </>
  );
};

export default Body;
