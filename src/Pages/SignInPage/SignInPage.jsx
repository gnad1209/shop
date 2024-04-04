import React from 'react'
import { WrapperContainerLeft, WrapperContainerRight, WrapperTextLight } from './style'
import InputForm from '../../Components/InputForm/InputForm'
import ButtonComponent from '../../Components/ButtonComponent/ButtonComponent'
import { Image } from 'antd'
import imageLogo from '../../assests/images/logo-login.png'
import { EyeFilled, EyeInvisibleFilled } from '@ant-design/icons'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const SignInPage = () => {
  const navigate = useNavigate()
    const handleNavigateLogin = () => {
        navigate('/sign-up')
    }
  const [isShowPassword, setIsShowPassword] = useState(false)
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleOnchangeEmail = (value) => {
    setEmail(value)
  }

  const handleOnchangePassword = (value) => {
    setPassword(value)
  }

  const handleSignIn = () => {
    console.log({ email, password })
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0, 0, 0, 0.53)', height: '100vh' }}>
      <div style={{ width: '800px', height: '445px', borderRadius: '6px', background: '#fff', display: 'flex' }}>
        <WrapperContainerLeft>
          <h1>Xin chào</h1>
          <p>Đăng nhập và tạo tài khoản</p>
          <InputForm style={{marginBottom:'10px'}} placeholder='abc@gmail.com' value={email} onChange={handleOnchangeEmail}/>
          <div style={{ position: 'relative' }}>
            <span
              onClick={() =>{setIsShowPassword(!isShowPassword)}}
              style={{
                zIndex: 10,
                position: 'absolute',
                top: '4px',
                right: '8px'
              }}
            >{
                isShowPassword ? (
                  <EyeFilled />
                ) : (
                  <EyeInvisibleFilled />
                )
              }
            </span>
            <InputForm
              placeholder="password"
              type={isShowPassword ? "text" : "password"}
              value={password} onChange={handleOnchangePassword}
            />
          </div>
          <ButtonComponent
              disabled={!email.length || !password.length}
              onClick={handleSignIn}
              size={40}
              styleButton={{ 
                  background: 'rgb(255, 57, 69)',
                  height: '48px',
                  width: '100%',
                  border: 'none',
                  borderRadius: '4px',
                  margin: '26px 0 10px'
              }}
              textButton={"Đăng nhập"}
              styleTextButton={{ color: "#fff",fontSize:'15px',fontWeight:'700' }}>
          </ButtonComponent>
          <p><WrapperTextLight>Quên mật khẩu?</WrapperTextLight></p>
          <p style={{margin:0}}>Chưa có tài khoản? <WrapperTextLight  onClick={handleNavigateLogin} style={{cursor:'pointer'}}>Tạo tài khoản</WrapperTextLight></p>
        </WrapperContainerLeft>
        <WrapperContainerRight>
          <Image src={imageLogo} alt={'imageLogo'} preview={false} height='203' width='203'/>
          <h4>Mua sắm tại Shop Gnad</h4>
        </WrapperContainerRight>
      </div>
    </div>
  )
}

export default SignInPage
