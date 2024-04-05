import React from 'react'
import { StyleNameProducts, WrapperCardStyle, WrapperDiscountText, WrapperPriceText, WrapperReportText } from './style'
import { StarFilled } from '@ant-design/icons'
import logo from '../../assests/images/logo.png'

const CardComponent = () => {
    return (
        <WrapperCardStyle
            hoverable
            styles={{ header: { width: '200px', height: '200px' },body: { padding: '10px' } }}
            style={{ width: 200 }}
            cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
        >
            <img src={logo} alt='logo' style={{ width: `68px`, height: `14px`, position: `absolute`, top: -1, left: -1, borderTopLeftRadius: `3px` }} />
            <StyleNameProducts>Iphone</StyleNameProducts>
            <WrapperReportText>
                <span style={{ marginRight: `4px` }}>
                    <span>4.96</span> <StarFilled style={{ fontSize: `12px`, color: `yellow` }} />
                </span>
                <span>| đã bán 100+</span>
            </WrapperReportText>
            <WrapperPriceText><span style={{marginRight:'8px'}}>1.000.000đ</span>
                <WrapperDiscountText>-5%</WrapperDiscountText>
            </WrapperPriceText>
        </WrapperCardStyle>
    )
}

export default CardComponent