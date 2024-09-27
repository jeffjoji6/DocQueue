import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Navbar_white from './components/Navbar_white.jsx'
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom'
import Hospitaldetails from './pages/Hospitaldetails.jsx'
import Quiz from './components/Quiz.jsx'
import Timeslot from './components/Timeslot.jsx'
import Confirmationpop from './components/Confirmationpop.jsx'


const Layout=()=>{
  return(
    <>
    <Navbar_white />
    <Outlet/>
    </>
  )
}
const router=createBrowserRouter([{path:"/",element:<Layout />,children:[{path:"/",element:<App/>},{path:"/HospitalDetails",element:<Hospitaldetails/>},{path:"/quiz",element:<Quiz/>},{path:"/timeslot",element:<Timeslot/>},{path:"/Confirmed",element:<Confirmationpop/>}]}])

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router}/>
)
