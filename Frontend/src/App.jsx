import React, { Suspense } from 'react'
import { Outlet } from "react-router-dom";
import { ScrollToTop } from './Utils/scrollToTop.jsx'

const Footer = React.lazy(() => import('./Components/Footer'));

function App() {

  return (
    <>
      <Outlet />
      <ScrollToTop />
      <Suspense fallback={<div className='text-center'>Loading...</div>}>
        <Footer />
      </Suspense>
    </>
  )
}

export default App
