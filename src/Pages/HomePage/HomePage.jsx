import React, { useEffect, useState } from "react";
import TypeProducts from "../../Components/TypeProducts/TypeProducts";
import {
  WrapperButtonMore,
  WrapperProducts,
  WrapperTypeProduct,
} from "./style";
import SliderComponent from "../../Components/SliderComponent/SliderComponent";
import slider1 from "../../assests/images/Slider1.jpg";
import slider2 from "../../assests/images/Slider2.jpg";
import slider3 from "../../assests/images/Slider3.jpg";
import CardComponent from "../../Components/CardComponent/CardComponent";
import * as ProductService from "../../service/ProductService";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { useDebounce } from "../../hooks/useDebounce";
import Loading from "../../Components/LoadingComponent/Loading";

const HomePage = () => {
  const searchProduct = useSelector((state) => state?.product?.search);
  const searchDebounce = useDebounce(searchProduct, 500);
  const user = useSelector((state) => state.user);
  // const [loading, setLoading] = useState(false)
  const [limit, setLimit] = useState(6);
  const [typeProducts, setTypeProducts] = useState([]);
  const [height, setHeight] = useState(0);

  const fetchProductAll = async (context) => {
    const limit = context?.queryKey && context?.queryKey[1];
    const search = context?.queryKey && context?.queryKey[2];
    const res = await ProductService.getAllProduct(search, limit);

    return res;
  };

  const fetchAllTypeProduct = async () => {
    const res = await ProductService.getAllTypeProduct();
    if (res?.status === "OK") {
      setTypeProducts(res?.data);
    }
  };

  const {
    isPending,
    data: products,
    isPreviousData,
  } = useQuery({
    queryKey: ["products", limit, searchDebounce],
    queryFn: fetchProductAll,
    retry: 3,
    retryDelay: 1000,
    keepPreviousData: true,
  });

  const handleLoadMore = () => {
    setHeight((prev) => prev + 20);
    setLimit((prev) => prev + 6);
  };

  useEffect(() => {
    fetchAllTypeProduct();
  }, []);
  return (
    <Loading isLoading={isPending}>
      <div style={{ width: "1270px", margin: "0 auto" }}>
        <WrapperTypeProduct>
          {typeProducts.map((item) => {
            return <TypeProducts name={item} key={item} />;
          })}
        </WrapperTypeProduct>
      </div>
      <div
        className="body"
        style={{
          width: "100%",
          backgroundColor: "#efefef",
        }}
      >
        <div
          id="container"
          style={{
            height: `${1000 + height}px`,
            width: "1270px",
            margin: `0 auto `,
            backgroundColor: "#efefef",
          }}
        >
          <SliderComponent max={50} arrImages={[slider1, slider2, slider3]} />
          <WrapperProducts>
            {products?.data?.map((product) => {
              return (
                <CardComponent
                  key={product._id}
                  countInStock={product.countInStock}
                  description={product.description}
                  image={product.image}
                  name={product.name}
                  price={product.price}
                  rating={product.rating}
                  type={product.type}
                  selled={product.selled}
                  discount={product.discount}
                  id={product._id}
                />
              );
            })}
          </WrapperProducts>
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              marginTop: "10px",
            }}
          >
            <WrapperButtonMore
              textButton={isPreviousData ? "Load more" : "Xem thêm"}
              type="outline"
              styleButton={{
                border: `1px solid ${
                  products?.total === products?.data?.length
                    ? "#f5f5f5"
                    : "#9255FD"
                }`,
                color: `${
                  products?.total === products?.data?.length
                    ? "#f5f5f5"
                    : "#9255FD"
                }`,
                width: "240px",
                height: "38px",
                borderRadius: "4px",
              }}
              disabled={
                products?.total === products?.data?.length ||
                products?.totalPage === 1
              }
              styleTextButton={{
                fontWeight: 500,
                color: products?.total === products?.data?.length && "#fff",
              }}
              onClick={handleLoadMore}
            />
          </div>
        </div>
      </div>
    </Loading>
  );
};

export default HomePage;
