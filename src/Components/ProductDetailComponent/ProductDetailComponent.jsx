import { Col, Image, Row } from 'antd'
import React from 'react'
import imageProduct from '../../assests/images/test.webp'
import imageSmall from '../../assests/images/imagesmall.webp'
import { WrapperAddressProduct, WrapperInputNumber, WrapperPriceProduct, WrapperPriceTextProduct, WrapperQualityProduct, WrapperStyleColImage, WrapperStyleImageSmall, WrapperStyleNameProduct, WrapperStyleTextSell } from './style'
import { StarFilled,PlusOutlined,MinusOutlined } from '@ant-design/icons'
import ButtonComponent from '../ButtonComponent/ButtonComponent'

const ProductDetailComponent = () => {
    const onChange = () => {}
return (
    <Row style={{padding: '16px', background: '#fff', borderRadius: '4px', height:'100%'}}>
        <Col span={10} style={{ borderRight: '1px solid #e5e5e5', paddingRight: '8px' }}>
            <Image src={imageProduct} alt='image-products' />
            <Row style={{paddingTop:'10px', justifyContent:'space-between'}}>
                <WrapperStyleColImage span={4}>
                    <WrapperStyleImageSmall src={imageSmall} alt='image-small' preview={false}/>
                </WrapperStyleColImage>
                <WrapperStyleColImage span={4}>
                    <WrapperStyleImageSmall src={imageSmall} alt='image-small' preview={false}/>
                </WrapperStyleColImage>
                <WrapperStyleColImage span={4}>
                    <WrapperStyleImageSmall src={imageSmall} alt='image-small' preview={false}/>
                </WrapperStyleColImage>
                <WrapperStyleColImage span={4}>
                    <WrapperStyleImageSmall src={imageSmall} alt='image-small' preview={false}/>
                </WrapperStyleColImage>
                <WrapperStyleColImage span={4}>
                    <WrapperStyleImageSmall src={imageSmall} alt='image-small' preview={false}/>
                </WrapperStyleColImage>
                <WrapperStyleColImage span={4}>
                    <WrapperStyleImageSmall src={imageSmall} alt='image-small' preview={false}/>
                </WrapperStyleColImage>
            </Row>
        </Col>

        <Col span={14} style={{paddingLeft:'10px'}}>
            <WrapperStyleNameProduct>Giày đẹp vans</WrapperStyleNameProduct>
            <div>
                <StarFilled style={{ fontSize: `12px`, color: `rgb(235,216,54)` }} />
                <StarFilled style={{ fontSize: `12px`, color: `rgb(235,216,54)` }} />
                <StarFilled style={{ fontSize: `12px`, color: `rgb(235,216,54)` }} />
                <WrapperStyleTextSell>| đã bán 100+</WrapperStyleTextSell>
            </div>
            <WrapperPriceProduct>
                <WrapperPriceTextProduct>200.000đ</WrapperPriceTextProduct>
            </WrapperPriceProduct>
            <WrapperAddressProduct>
                <span>Giao đến </span>
                <span className='address'>Hà nội</span> - 
                <span className='change-address'>Đổi địa chỉ</span>
            </WrapperAddressProduct>
            <div  style={{ margin: '10px 0 20px', padding: '10px 0', borderTop: '1px solid #e5e5e5', borderBottom: '1px solid #e5e5e5' }}>
                <div  style={{ marginBottom: '10px' }}>Số lượng</div>
                <WrapperQualityProduct>
                    <button style={{border:'none',background:'transparent'}}>
                        <PlusOutlined style={{ color: '#000',fontSize:'10px' }} size='10' />
                    </button>
                    <WrapperInputNumber defaultValue={1} onChange={onChange} />
                    <button style={{border:'none',background:'transparent'}}>
                        <MinusOutlined style={{ color: '#000',fontSize:'10px' }} size='10'  />
                    </button>
                </WrapperQualityProduct>
            </div>
            <div style={{display:'flex',alignItems:'center',gap:'12px'}}>
                <ButtonComponent 
                    size={40}
                    styleButton={{ 
                        backgroundColor: 'rgb(255,57,69)',
                        height:'48px',
                        width:'220px',
                        border:'none',
                        borderRadius:'4px'
                    }}
                    textButton={"Chọn mua"}
                    styleTextButton={{ color: "#fff",fontSize:'15px',fontWeight:'700' }}>
                </ButtonComponent>
                <ButtonComponent 
                    size={40}
                    styleButton={{ 
                        backgroundColor: '#fff',
                        height:'48px',
                        width:'220px',
                        border:'1px solid rgb(13,92,182)',
                        borderRadius:'4px'
                    }}
                    textButton={"Mua trước trả sau"}
                    styleTextButton={{ color: "rgb(13,92,182)",fontSize:'15px'}}>
                </ButtonComponent>
            </div>
        </Col>
    </Row>
  )
}

export default ProductDetailComponent