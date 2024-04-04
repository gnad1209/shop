import React from 'react'
import { Col } from 'antd';
import { WrapperHeader, WrapperTextHeader, WrapperHeaderAccount, WrapperTextHeaderSmall } from './style';
// import Search from 'antd/lib/transfer/search';
import { UserOutlined, CaretDownOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import ButtonInputSearch from '../ButtonInputSearch/ButtonInputSearch';
const HeaderComponent = () => {
    return (
        <div>
            <WrapperHeader>
                <Col span={6}>
                    <WrapperTextHeader>GIAYDEP</WrapperTextHeader>
                </Col>
                <Col span={12}>
                    <ButtonInputSearch
                        size='large'
                        bordered={false}
                        textButton='Tim kiem'
                        placeholder="input search text"
                    />
                </Col>
                <Col span={6} style={{ display: `flex`, gap: `20px`, alignItems: `center` }}>
                    <WrapperHeaderAccount>
                        <UserOutlined style={{ fontSize: `30px` }} />
                        <div>
                            <WrapperTextHeaderSmall style={{ fontSize: `12px` }}>Đăng nhập/Đăng ký</WrapperTextHeaderSmall>
                            <div>
                                <WrapperTextHeaderSmall style={{ fontSize: `12px` }}>Tài khoản</WrapperTextHeaderSmall>
                                <CaretDownOutlined />
                            </div>
                        </div>
                    </WrapperHeaderAccount>
                    <div>
                        <div>
                            <ShoppingCartOutlined style={{ fontSize: `30px`, color: `#fff` }} />
                            <WrapperTextHeaderSmall>Giỏ hàng</WrapperTextHeaderSmall>
                        </div>
                    </div>
                </Col>
            </WrapperHeader>
        </div>
    )
}

export default HeaderComponent