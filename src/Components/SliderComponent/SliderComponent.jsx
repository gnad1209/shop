import React from 'react'
import Slider from "react-slick";
import { Image } from 'antd'

const SliderComponent = ({ arrImages }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  return (
    <Slider {...settings}>
      {arrImages.map((image) => {
        return (
          <Image src={image} alt='Slider' preview={false} width="100%" height="350px" style={{ objectFit: `cover` }} />
        )
      })}
    </Slider>
  )
}

export default SliderComponent