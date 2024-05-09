import React from 'react'
import ReactDOM from 'react-dom/client'

import App from './App.jsx'
import Home from './Pages/Home.jsx'
import Login from './Pages/Auth/Login.jsx'
import Signup from './Pages/Auth/Signup.jsx'
import Account from './Pages/Account.jsx'
import ElectricBike from './Pages/ElectricBike.jsx'
import CityBike from './Pages/CityBike.jsx'
import Store from './Pages/Store.jsx'
import Accessories from './Pages/Accessories.jsx'
import LeaseEmployee from './Pages/Leasing/LeaseEmployer.jsx'
import LeaseEmployer from './Pages/Leasing/LeaseEmployer.jsx'
import Robyn from './Pages/Products/Robyn.jsx'
import Ivy from './Pages/Products/Ivy.jsx'
import ErrorPage from './Pages/ErrorPage.jsx'

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "signup",
        element: <Signup />,
      },
      {
        path: "account",
        element: <Account />,
      },
      {
        path: "electricBike",
        element: <ElectricBike />,
      },
      {
        path: "cityBike",
        element: <CityBike />,
      },
      {
        path: "store",
        element: <Store />,
      },
      {
        path: "accessories",
        element: <Accessories />,
      },
      {
        path: "leaseEmployer",
        element: <LeaseEmployer />,
      },
      {
        path: "leaseEmployee",
        element: <LeaseEmployee />,
      },
      {
        path: "products/ivy",
        element: <Ivy />,
      },
      {
        path: "products/robyn-women",
        element: <Robyn />,
      },
    ]
  },
  {
    path: "*",
    element: <ErrorPage />,
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
    <ToastContainer
      position="bottom-right"
      autoClose={2000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss={false}
      draggable
      pauseOnHover
      theme="light"
      transition:Bounce
    />
  </React.StrictMode>,
)
