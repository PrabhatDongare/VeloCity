import React, { Suspense } from 'react'
import Header from '../../Components/Header'
import LoadingAnimation from '../../Components/LoadingAnimation';

const IntroIvy = React.lazy(() => import('../../Sections/Products/IntroIvy'));
const ElectricMainContent = React.lazy(() => import('../../Components/ElectricMainContent'));


const Ivy = () => {

  return (
    <>
      <Header bg={false} />
      <Suspense fallback={<LoadingAnimation/>}>
        <IntroIvy scrollId={"specifications"} />
      </Suspense>

      {/* Content */}
      <Suspense fallback={<LoadingAnimation/>}>
        <ElectricMainContent productName={"Ivy_Two"} />
      </Suspense>
    </>
  )
}

export default Ivy
