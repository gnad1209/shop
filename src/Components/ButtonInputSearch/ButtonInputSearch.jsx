import React from "react";
import InputComponent from "../InputComponent/InputComponent";
// import ButtonComponent from "../ButtonComponent/ButtonComponent";

const ButtonInputSearch = (props) => {
  const { size, placeholder, bordered, backgroundColorInput = `#fff` } = props;

  return (
    <div style={{ display: `flex` }}>
      <InputComponent
        size={size}
        placeholder={placeholder}
        variant={bordered}
        style={{ backgroundColor: backgroundColorInput }}
        {...props}
      />
    </div>
  );
};

export default ButtonInputSearch;
