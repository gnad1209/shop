import React, { Fragment, useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { routes } from './routes'
import DefaultComponent from './Components/DefaultComponent/DefaultComponent'
// import { useQuery } from '@tanstack/react-query'
import { isJsonString } from './utils'
import { jwtDecode } from "jwt-decode";
import * as UserService from './service/UserService'
import { useDispatch, useSelector } from 'react-redux'
import Loading from './Components/LoadingComponent/Loading'
import { resetUser, updateUser } from './redux/slide/userSlide'
import Dashboard from './modules/Dashboard';
import './App.css';
// import { config } from 'dotenv';
// config();

export function App() {
  const dispatch = useDispatch()
  const [isPending, setIsLoading] = useState(false)
  const user = useSelector((state) => state.user)

  useEffect(() => {
    setIsLoading(true)
    const { storageData, decoded } = handleDecoded()
    if (decoded?.id) {
      handleGetDetailUser(decoded?.id, storageData)
    }
    setIsLoading(false)
  }, [])
  const handleDecoded = () => {
    let storageData = user?.access_token || localStorage.getItem('access_token')
    let decoded = {}
    if (storageData && isJsonString(storageData) && !user?.access_token) {
      storageData = JSON.parse(storageData)
      decoded = jwtDecode(storageData)
    }
    return { decoded, storageData }
  }
  UserService.axiosJWT.interceptors.request.use(async (config) => {
    const currentTime = new Date()
    const { decoded } = handleDecoded()
    let storageRefreshToken = localStorage.getItem('refresh_token')
    const refreshToken = JSON.parse(storageRefreshToken)
    const decodedRefreshToken = jwtDecode(refreshToken)
    if (decoded?.exp < currentTime.getTime() / 1000) {
      if (decodedRefreshToken?.exp > currentTime.getTime() / 1000) {
        const data = await UserService.refreshToken(refreshToken)
        config.headers['token'] = `Bearer ${data?.access_token}`
      } else {
        dispatch(resetUser())
      }
    }
    return config;
  }, (err) => {
    return Promise.reject(err)
  })
  const handleGetDetailUser = async (id, token) => {
    let storageRefreshToken = localStorage.getItem('refresh_token')
    const refreshToken = JSON.parse(storageRefreshToken)
    const res = await UserService.getDetailUser(id, token)
    dispatch(updateUser({ ...res?.data, access_token: token }))
  }
  const ProtectedRoute = ({ children, auth = false }) => {
    const isLoggedIn = localStorage.getItem('access_token') !== null || false
    if (!isLoggedIn && auth) {
      return <Navigate to={"/sign-in"} />
    }
    else if (isLoggedIn && ["/sign-in", "/sign-up"].includes(window.location.pathname)) {
      return <Navigate to={"/"} />
    }

    return children

  }
  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <Loading isLoading={isPending}>
        <Router>
          <Routes>
            {routes.map((route) => {
              const Page = route.page
              {/* const isCheckAuth = !route.isPrivate || user.isAdmin */ }
              const Layout = route.isShowHeader ? DefaultComponent : Fragment
              return (
                <>
                  <Route key={route.path} path={route.path} element={
                    <Layout>
                      <Page />
                    </Layout>
                  } />
                  <Route path='/messages' element={
                    <ProtectedRoute auth={true}>
                      <Dashboard />
                    </ProtectedRoute>} />
                </>
              )
            })}

          </Routes>
        </Router>
      </Loading>
    </div>
  )
}
export default App
