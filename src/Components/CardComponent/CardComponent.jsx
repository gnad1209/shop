import React from 'react'
import { StyleNameProducts, WrapperCardStyle, WrapperDiscountText, WrapperPriceText, WrapperReportText } from './style'
import { StarFilled } from '@ant-design/icons'

const CardComponent = () => {
    return (
        <WrapperCardStyle
            hoverable
            headStyle={{ Width: '200px', height: '200px' }}
            style={{ width: 240 }}
            bodyStyle={{ padding: '10px' }}

            cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
        >
            <StyleNameProducts>Iphone</StyleNameProducts>
            <WrapperReportText>
                <span style={{ marginRight: `4px` }}>
                    <span>4.96</span> <StarFilled style={{ fontSize: `10px`, color: `yellow` }} />
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