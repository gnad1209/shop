import React from "react";

const Input = ({
  label = "",
  name = "",
  type = "text",
  className = "",
  InputclassName = "",
  isRequired = false,
  placeHolder = "",
  value = "",
  handleKeyPress = () => {},
  onChange = () => {},
}) => {
  return (
    <div className={`w-1/2 ${className}`}>
      <label for={name} className="block text-sm font-medium text-gray-800 ">
        {" "}
        {label}{" "}
      </label>
      <input
        className={` bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${InputclassName}`}
        type={type}
        id={name}
        placeholder={placeHolder}
        required={isRequired}
        value={value}
        onChange={onChange}
        onKeyPress={handleKeyPress}
      />
    </div>
  );
};

export default Input;
