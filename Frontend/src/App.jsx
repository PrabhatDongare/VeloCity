import React, { Suspense } from 'react'
import { Outlet } from "react-router-dom";

const Footer = React.lazy(() => import('./Components/Footer'));

function App() {

  return (
    <>
      <Outlet />
      <Suspense fallback={<div className='text-center'>Loading...</div>}>
        <Footer />
      </Suspense>
    </>
  )
}

export default App
