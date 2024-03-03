import React, { useState, useCallback } from "react";

const SearchContainer = ({ searchData, allRestaurants }) => {
  const [searchText, setSearchText] = useState("");

  const handleSearch = useCallback(() => {
    console.log(searchText);
    searchData(searchText, allRestaurants);
  }, [searchText, allRestaurants, searchData]);
  return (
    <>
      <input
        type="text"
        className="search-input"
        placeholder="Search a restaurant you want..."
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      ></input>
      <button className="search-btn" onClick={handleSearch}>
        Search
      </button>
    </>
  );
};

export default SearchContainer;
