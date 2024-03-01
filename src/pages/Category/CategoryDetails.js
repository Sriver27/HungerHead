import { useState } from "react";
import { useParams } from "react-router-dom";
import useCategory from "../../custom-hooks/useCategory";
import RestaurantCard from "../../components/RestaurantCard";
import  {ShimmerCards}  from "../../components/ShimmerHome";
import { Link } from "react-router-dom";

const CategoryDetails = () => {
  const { categoryId } = useParams();
  const restaurants = useCategory(categoryId);
  return restaurants?.length === 0 ? (
    <ShimmerCards/>
  ) : (
    <>
      <p className="breadcrumbs">
        <Link to={"/"} key="home" className="category_navigation">
          Home /
        </Link>{" "}
        {restaurants.title}
      </p>
      <div className="category_description">
      <h1 className="main-content-text">{restaurants.title}</h1>
      <p className="main-content-subtext">{restaurants.description}</p>
      </div>
      
      <div className="restaurant-list">
        {restaurants.filteredRestaurants.map((restaurant) => (
          <Link to={"/restaurant/" + restaurant.id} key={restaurant.id}>
            <RestaurantCard {...restaurant} />
          </Link>
        ))}
      </div>
    </>
  );
};

export default CategoryDetails;