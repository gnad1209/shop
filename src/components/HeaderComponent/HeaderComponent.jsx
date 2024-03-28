import React from 'react'
import { Col, Row } from 'antd';

const HeaderComponent = () => {
  return (
    <div>
      <Row>
      <Col span={6}>col-8</Col>
      <Col span={12}>col-8</Col>
      <Col span={6}>
        col-8
      </Col>
    </Row>
    </div>
  )
}

export default HeaderComponent
