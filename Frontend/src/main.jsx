import React from 'react'
import ReactDOM from 'react-dom/client'

import App from './App.jsx'
import Home from './Pages/Home.jsx'
import Login from './Pages/Auth/Login.jsx'
import Signup from './Pages/Auth/Signup.jsx'
import ForgotPassword from './Pages/Auth/ForgotPassword.jsx'
import ResetPassword from './Pages/Auth/ResetPassword.jsx'
import Account from './Pages/Account.jsx'
import ElectricBike from './Pages/ElectricBike.jsx'
import CityBike from './Pages/CityBike.jsx'
import Store from './Pages/Store.jsx'
import Accessories from './Pages/Accessories.jsx'
import Employees from './Pages/Leasing/Employees.jsx'
import Employers from './Pages/Leasing/Employers.jsx'
import Ace from './Pages/Products/Ace.jsx'
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
        path: "/account/login",
        element: <Login />,
      },
      {
        path: "/account/signup",
        element: <Signup />,
      },
      {
        path: "/account/forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "/account/reset-password/:id/:token",
        element: <ResetPassword />,
      },
      {
        path: "account",
        element: <Account />,
      },
      {
        path: "electric-bike",
        element: <ElectricBike />,
      },
      {
        path: "city-bike",
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
        path: "bike-leasing",
        element: <Employers />,
      },
      {
        path: "leasing-form",
        element: <Employees />,
      },
      {
        path: "products/ivy",
        element: <Ivy />,
      },
      {
        path: "products/ace",
        element: <Ace />,
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
