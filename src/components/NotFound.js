import React from "react";
import "../../index.css";

const NotFoundPage = () => {
  return (
    <div className="container">
      <img
        src={require("../../assets/images/error.jpg")}
        alt="Not Found"
        className="image"
      />
      {/* <p style={styles.subtext}>
        <span style={styles.text}>No Restaurants Found</span>{" "}
        <a href="/">Continue Browsing</a>
      </p> */}
      {/* make just Continue Browsing as blue color text and text in same line as subtext and onClick add a link to home page */}

      <p className="subtext">
        <a href="/">{"< Continue Browsing />"}</a>
      </p>
    </div>
  );
};

const styles = {};

export default NotFoundPage;
