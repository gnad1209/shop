import React from 'react'
import { Badge, Col } from 'antd';
import { WrapperHeader, WrapperTextHeader, WrapperHeaderAccount, WrapperTextHeaderSmall } from './style';
// import Search from 'antd/lib/transfer/search';
import { UserOutlined, CaretDownOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import ButtonInputSearch from '../ButtonInputSearch/ButtonInputSearch';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const HeaderComponent = () => {

    const navigate = useNavigate()
    const user = useSelector((state) => state.user)

    const handleNavigateLogin = () => {
        navigate('/sign-in')
    }

    return (
        <div style={{  heiht: '100%', width: '100%', display: 'flex',background: '#9255FD', justifyContent: 'center' }} >
            <WrapperHeader>
                <Col span={5}>
                    <WrapperTextHeader>GIAYDEP</WrapperTextHeader>
                </Col>
                <Col span={13}>
                    <ButtonInputSearch
                        size='large'
                        textButton='Tim kiem'
                        placeholder="input search text"
                        // onChange={onSearch}
                        backgroundColorButton="#5a20c1"
                    />
                </Col>
                <Col span={6} style={{ display: `flex`, gap: `20px`, alignItems: `center` }}>
                    <WrapperHeaderAccount>
                        <UserOutlined style={{ fontSize: `30px` }} />
                        {user?.name ? (
                            <div>{user.name}</div>
                        ):
                        (
                            <div>
                            <WrapperTextHeaderSmall  onClick={handleNavigateLogin} style={{cursor:'pointer'}}>Đăng nhập/Đăng ký</WrapperTextHeaderSmall>
                            <div>
                                <WrapperTextHeaderSmall >Tài khoản</WrapperTextHeaderSmall>
                                <CaretDownOutlined />
                            </div>
                        </div>
                        )}
                    </WrapperHeaderAccount>
                    <div>
                        <div>
                        <Badge count={4} size='small'>
                            <ShoppingCartOutlined  style={{ fontSize: `30px`, color: `#fff` }} />
                        </Badge>
                            <WrapperTextHeaderSmall>Giỏ hàng</WrapperTextHeaderSmall>
                        </div>
                    </div>
                </Col>
            </WrapperHeader>
        </div>
    )
}

export default HeaderComponent