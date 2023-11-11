import React from "react";
import ReactDOM from "react-dom/client";

const Title = () => {
  return (
    <div>
      <h1>HungerHead</h1>
    </div>
  );
};

const HeaderComponent = () => {
  return (
    <div>
      <Title />
      <h2>React functional component</h2>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<HeaderComponent />);
