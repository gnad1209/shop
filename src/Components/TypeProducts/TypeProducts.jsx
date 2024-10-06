import React from 'react'
import { useNavigate } from 'react-router-dom'
<<<<<<< HEAD

const TypeProducts = ({ name }) => {
    const navigate = useNavigate()
    const handleNavigatetype = (type) => {
        navigate(`/product/${type.normalize('NFD').replace(/[\u0300-\u036f]/g, '')}`)
    }
    return (
        <div style={{ fontSize: '14px', cursor: 'pointer' }} onClick={() => { handleNavigatetype(name) }}>{name}</div>
    )
=======
import { WrapperType } from './style'

const TypeProducts = ({ name }) => {
  const navigate = useNavigate()
  const handleNavigatetype = (type) => {
    navigate(`/product/${type.normalize('NFD').replace(/[\u0300-\u036f]/g, '')?.replace(/ /g, '_')}`, { state: type })
  }
  return (
    <WrapperType style={{ fontSize: '14px', cursor: 'pointer' }} onClick={() => { handleNavigatetype(name) }}>{name}</WrapperType>
  )
>>>>>>> b1dfa1aa33c49f38a985894b45971777c054aedf
}

export default TypeProducts