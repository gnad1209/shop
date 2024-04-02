import React from 'react'
import TypeProducts from '../../Components/TypeProducts/TypeProducts'
import { WrapperButtonMore, WrapperProducts, WrapperTypeProduct } from './style'
import SliderComponent from '../../Components/SliderComponent/SliderComponent'
import slider1 from '../../assests/images/Slider1.jpg'
import slider2 from '../../assests/images/Slider2.jpg'
import slider3 from '../../assests/images/Slider3.jpg'
import CardComponent from '../../Components/CardComponent/CardComponent'

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
            <div id="container" style={{ height: '1000px', width: '1270px', margin: '0 auto'  }}>
                <SliderComponent max={50} arrImages={[slider1, slider2, slider3]} />
                <WrapperProducts>
                    <CardComponent />
                    <CardComponent />
                    <CardComponent />
                    <CardComponent />
                    <CardComponent />
                    <CardComponent />
                    <CardComponent />
                    <CardComponent />
                    <CardComponent />
                    <CardComponent />
                    <CardComponent />
                </WrapperProducts>
               <div style={{width:'100%',display:'flex',justifyContent:'center',alignItems:'center',marginTop:'10px'}}>
                <WrapperButtonMore textButton='Xem thêm' type='outline' 
                    styleButton={{border:'1px solid rgb(11,116,229)',width:'240px',height:'38px', borderRadius:'4px'}} 
                    styleTextButton={{fontWeight: 500}}
                    />
               </div>
            </div>
        </>
    )
}

export default HomePage
