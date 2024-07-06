import React, { Suspense } from 'react'
import Header from '../../Components/Header'
import LoadingAnimation from '../../Components/LoadingAnimation';

const IntroAce = React.lazy(() => import('../../Sections/Products/IntroAce'));
const ElectricMainContent = React.lazy(() => import('../../Components/ElectricMainContent'));

const Ace = () => {
  return (
    <>
      <Header bg={false} />
      <Suspense fallback={<LoadingAnimation/>}>
        <IntroAce scrollId={"specifications"} />
      </Suspense>

      {/* Content */}
      <Suspense fallback={<LoadingAnimation/>}>
        <ElectricMainContent productName={"Ace_Two"} />
      </Suspense>
      
    </>
  )
}

export default Ace
