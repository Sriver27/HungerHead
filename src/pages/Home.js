import RestaurantCard from "../components/RestaurantCard";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import useConnectivityStatus from "../custom-hooks/useConnectivityStatus";
import SearchContainer from "../components/SearchContainer";
import CategoryMenu from "./Category/CategoryMenu";
import { debounce } from "lodash";
import Utility from "./Placeholders/Utility";
import {ShimmerCards} from "../components/ShimmerHome";
import useRestaurantList from "../custom-hooks/useRestaurantList";



const Body = () => {

  const { allRestaurants, filteredRestaurants, errorMessage, categoryMenu, searchData } = useRestaurantList();

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    /* cleanup */
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  /* handling div using scroll position */
  const handleScroll = debounce(() => {
    const scrollThreshold = 420;
    const scrollPosition = window.scrollY;

    const bodyHeaderContainer = document.querySelector(
      ".body-header-container"
    );
    const searchContainer = document.querySelector(".search-container");
    const stickyClass = "sticky";

    if (scrollPosition > scrollThreshold) {
      bodyHeaderContainer.classList.add(stickyClass);
      searchContainer.classList.add("sticky-top");
    } else {
      bodyHeaderContainer.classList.remove(stickyClass);
      searchContainer.classList.remove("sticky-top");
    }
  }, 20);

  const isOnline = useConnectivityStatus();

  if (!isOnline) {
    return (
      <>
        <Utility imgSrc={require('../../assets/images/mars.png')} altText={"No connection found"} />
      </>
    );
  }

  if (!allRestaurants) return null;

  return (
    <>
      {categoryMenu && <CategoryMenu categoryMenu={categoryMenu} />}
      <div className="body-header-container">
        <h1>Top Restaurants near you</h1>
        <div className="search-container">
          <SearchContainer
            searchData={searchData}
            allRestaurants={allRestaurants}
          />
        </div>
      </div>
      {errorMessage && <Utility imgSrc={require('../../assets/images/error.jpg')} altText={errorMessage} />}

      {filteredRestaurants?.length === 0 || filteredRestaurants === undefined    ? (
        <ShimmerCards/>
      ) : (
        <div className="restaurant-list">
          {filteredRestaurants?.map((restaurant) => {
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
