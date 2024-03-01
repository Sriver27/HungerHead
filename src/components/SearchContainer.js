import React, {useState} from 'react'

const SearchContainer = ({searchData, allRestaurants}) => {

  const [searchText, setSearchText] = useState("");
  return (
    <>
    <input
          type="text"
          className="search-input"
          placeholder="Search a restaurant you want..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        ></input>
        <button
          className="search-btn"
          onClick={()=>
            searchData(searchText, allRestaurants)}
        >
          Search
        </button>
        </>
  )
}

export default SearchContainer
