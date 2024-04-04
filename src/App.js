import React, { Fragment, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { routes } from './routes'
import DefaultComponent from './Components/DefaultComponent/DefaultComponent'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
// import { config } from 'dotenv';
// config();

export function App() {

  // useEffect(()=>{
  //   fectApi()
  // },[])
  // const fectApi =async () => {
  //   const res = await axios.get(`${process.env.REACT_APP_API_URL}/product/getAll`)
  //   return res.data
  // }
  // const query = useQuery({ queryKey: ['todos'], queryFn: fectApi })
  // console.log(query)
  return (
    <div>
      <Router>
        <Routes>
          {routes.map((route) => {
            const Page = route.page
            const Layout = route.isShowHeader ? DefaultComponent : Fragment
            return (
              <Route path={route.path} element={
                <Layout>
                  <Page />
                </Layout>
              } />
            )
          })}
        </Routes>
      </Router>
    </div>
  )
}

export default App
