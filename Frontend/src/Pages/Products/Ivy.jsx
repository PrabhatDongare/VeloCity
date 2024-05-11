import React, { Suspense } from 'react'
import Header from '../../Components/Header'

const IntroIvy = React.lazy(() => import('../../Sections/Products/IntroIvy'));
const ElectricMainContent = React.lazy(() => import('../../Components/ElectricMainContent'));


const Ivy = () => {


  return (
    <>
      <Header bg={false} />
      <Suspense fallback={<div className='text-center'>Loading...</div>}>
        <IntroIvy scrollId={"specifications"} />
      </Suspense>

      {/* Content */}
      <Suspense fallback={<div className='text-center'>Loading...</div>}>
        <ElectricMainContent productName={"Ivy_Two"} />
      </Suspense>
    </>
  )
}

export default Ivy
