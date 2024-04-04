import React from 'react'
import NavbarComponent from '../../Components/NavbarComponent/NavbarComponent'
import CardComponent from '../../Components/CardComponent/CardComponent'
import { Col, Pagination, Row } from 'antd'
import { WrapperNavbar, WrapperProducts } from './style'

const TypeProductsPage = () => {
    const onChange = ()=>{

    }
  return (
    <div style={{ width: '100%', background: '#efefef', height: 'calc(100vh - 64px)' }}>
      <div style={{ width: '1270px', margin: '0 auto', height: '100%' }}>
        <Row style={{ flexWrap: 'nowrap', paddingTop: '10px',height: 'calc(100% - 20px)' }}>
          <WrapperNavbar span={4}>
            <NavbarComponent/>
          </WrapperNavbar>
          <Col span={20} style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
              <WrapperProducts span={20}>
                  <CardComponent/>
              </WrapperProducts>
          </Col>
        </Row>
        <Pagination showQuickJumper defaultCurrent={1} total={500} onChange={onChange} style={{ textAlign: 'center', marginTop: '10px' }}/>    
      </div>
    </div>
  )
}

export default TypeProductsPage