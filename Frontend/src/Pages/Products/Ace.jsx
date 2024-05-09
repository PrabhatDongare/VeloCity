import React, { Suspense } from 'react'
import Header from '../../Components/Header'

const IntroAce = React.lazy(() => import('../../Sections/Products/IntroAce'));
const ElectricMainContent = React.lazy(() => import('../../Components/ElectricMainContent'));


const Ace = () => {


  return (
    <>
      <Header bg={false} />
      <Suspense fallback={<div className='text-center'>Loading...</div>}>
        <IntroAce scrollId={"ace-specifications"} />
      </Suspense>

      {/* Content */}
      <Suspense fallback={<div className='text-center'>Loading...</div>}>
        <ElectricMainContent productName={"Ace_Two"} />
      </Suspense>
      
    </>
  )
}

export default Ace
