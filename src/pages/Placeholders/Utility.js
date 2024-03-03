import React from "react";

const Utility = ({ imgSrc, altText }) => {
  return (
    <div className="utility-container">
      <img src={imgSrc} alt={altText} className="image" />

      <div className="subtext">
        {altText === "No connection found" ? (
          <>
            <h1>No network connection found</h1>
            <p>Please connect to a network to avail the services</p>
          </>
        ) : (
          <a href="/">{"< Continue Browsing />"}</a>
        )}
      </div>
    </div>
  );
};

export default Utility;
