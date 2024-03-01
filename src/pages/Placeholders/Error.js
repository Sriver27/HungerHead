import React from "react";
import { useRouteError } from "react-router-dom";

const Error = () => {
  const err = useRouteError();

  return (
    <div className="container">
      <img
        src={require("../../../assets/images/error.jpg")}
        alt="Error"
        className="image"
      />

      <p className="subtext">
        {err?.data ?? "Sorry, something went wrong. Please try again later"}
      </p>
    </div>
  );
};

export default Error;
