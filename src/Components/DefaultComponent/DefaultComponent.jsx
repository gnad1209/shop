import React from "react";
import HeaderComponent from "../HeaderComponent/HeaderComponent";

const DefaultComponent = ({ children }) => {
  return (
    <div>
      <HeaderComponent />
      <div style={{ marginTop: `59px` }}>{children}</div>
    </div>
  );
};

export default DefaultComponent;
