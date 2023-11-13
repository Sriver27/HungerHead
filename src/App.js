import React from "react";
import ReactDOM from "react-dom/client";
import Header from "./components/Header";
import Body from "./components/Body";

{
  /* 
        Header
          - Logo
          - Nav items
          - Cart
        
        Body
          - Search bar
          - Restaurant list
              - Restaurant card
                  - Restaurant image
                  - Restaurant name
                  - Restaurant rating
                  - Restaurant cuisine
                  
        
        Footer
          - Links
          - Copyright
      */
}

const AppLayout = () => {
  return (
    <div className="app-layout">
      <Header />
      <Body />
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<AppLayout />);
