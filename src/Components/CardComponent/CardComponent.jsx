import React from "react";
import {
  StyleNameProducts,
  WrapperCardStyle,
  WrapperDiscountText,
  WrapperPriceText,
  WrapperReportText,
  WrapperStyleTextSell,
} from "./style";
import { StarFilled } from "@ant-design/icons";
import logo from "../../assests/images/logo.png";
import { useNavigate } from "react-router-dom";
import { convertPrice } from "../../utils";

const CardComponent = (props) => {
  const { image, name, price, rating, discount, selled, id } = props;
  const navigate = useNavigate();
  const handleDetailsProduct = (id) => {
    navigate(`/product-details/${id}`);
  };
  return (
    <WrapperCardStyle
      hoverable
      styles={{
        header: { width: "200px", height: "200px" },
        body: { padding: "10px" },
      }}
      style={{ width: 200 }}
      cover={<img alt="example" src={image} />}
      onClick={() => handleDetailsProduct(id)}
    >
      <img
        src={logo}
        alt="logo"
        style={{
          width: `68px`,
          height: `14px`,
          position: `absolute`,
          top: -1,
          left: -1,
          borderTopLeftRadius: `3px`,
        }}
      />
      <StyleNameProducts>{name}</StyleNameProducts>
      <WrapperReportText>
        <span style={{ marginRight: "4px" }}>
          <span>{rating} </span>{" "}
          <StarFilled
            style={{ fontSize: "12px", color: "rgb(253, 216, 54)" }}
          />
        </span>
        <WrapperStyleTextSell> | Đã bán {selled || 1000}+</WrapperStyleTextSell>
      </WrapperReportText>
      <WrapperPriceText>
        <span style={{ marginRight: "8px" }}>{convertPrice(price)}</span>
        <WrapperDiscountText>- {discount || 5} %</WrapperDiscountText>
      </WrapperPriceText>
    </WrapperCardStyle>
  );
};

export default CardComponent;
