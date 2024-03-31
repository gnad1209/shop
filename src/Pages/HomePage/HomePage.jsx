import React from 'react'
import TypeProducts from '../../Components/TypeProducts/TypeProducts'
import { WrapperTypeProduct } from './style'
import SliderComponent from '../../Components/SliderComponent/SliderComponent'
import slider1 from '../../assests/images/Slider1.jpg'
import slider2 from '../../assests/images/Slider2.jpg'
import slider3 from '../../assests/images/Slider3.jpg'
import CardComponent from '../../Components/CardComponent/CardComponent'
import NavbarComponent from '../../Components/NavbarComponent/NavbarComponent'
import ButtonComponent from '../../Components/ButtonComponent/ButtonComponent'

const HomePage = () => {
    const arr = ['Nike', 'Vans', 'Owen', 'Converse']
    return (
        <>
            <div style={{ padding: `0 120px` }}>
                <WrapperTypeProduct>
                    {
                        arr.map((item) => {
                            return (
                                <TypeProducts name={item} key={item} />
                            )
                        })
                    }
                </WrapperTypeProduct>
            </div>
            <div id="container" style={{ background: `#efefef`, padding: `0 120px`, height: `1000px` }}>
                <SliderComponent arrImages={[slider1, slider2, slider3]} />
                <div style={{ marginTop: `20px`, display: `flex`, alignItems: `center`, gap: `20px` }}>
                    <CardComponent />
                </div>
                <ButtonComponent textButton='Xem them' type='outline' />
            </div>
        </>
    )
}

export default HomePage
