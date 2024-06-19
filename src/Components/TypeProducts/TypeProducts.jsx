import React from 'react'
import { useNavigate } from 'react-router-dom'

const TypeProducts = ({ name }) => {
    const navigate = useNavigate()
    const handleNavigatetype = (type) => {
        navigate(`/product/${type.normalize('NFD').replace(/[\u0300-\u036f]/g, '')}`)
    }
    return (
        <div style={{ fontSize: '14px', cursor: 'pointer' }} onClick={() => { handleNavigatetype(name) }}>{name}</div>
    )
}

export default TypeProducts