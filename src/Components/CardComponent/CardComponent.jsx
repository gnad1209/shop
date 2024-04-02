import React from 'react'
import { StyleNameProducts, WrapperCardStyle, WrapperDiscountText, WrapperPriceText, WrapperReportText } from './style'
import { StarFilled } from '@ant-design/icons'
import logo from '../../assests/images/logo.png'

const CardComponent = () => {
    return (
        <WrapperCardStyle
            hoverable
            headStyle={{ Width: '200px', height: '200px' }}
            style={{ width: 240 }}
            bodyStyle={{ padding: '10px' }}

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
            <WrapperPriceText>1.000.000đ
                <WrapperDiscountText>-5%</WrapperDiscountText>
            </WrapperPriceText>
        </WrapperCardStyle>
    )
}

export default CardComponent