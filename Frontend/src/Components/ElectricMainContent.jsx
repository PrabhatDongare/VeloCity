import React, { Suspense } from 'react'
import { BsDownload } from "react-icons/bs";
import { TbBookDownload } from "react-icons/tb";
import PropTypes from 'prop-types';

const CustomVideo = React.lazy(() => import('./CustomVideo'));
const InteractiveCycleDiagram = React.lazy(() => import('./InteractiveDiagram'));
import { Ace_Two, Ivy_Two } from "../Utils/product"

const ElectricMainContent = ({ productName }) => {

  const handelDownloadSpecification = () => {
    window.open('/downloads/VeloCity_Electric_Two_Spec__Sheet_1123.pdf', '_blank');
  };
  const handelDownloadManual = () => {
    window.open('/downloads/Manual_Electric_Two_VeloCity.pdf', '_blank');
  };

  return (
    <>

      <section className='relative'>
        <Suspense fallback={<div className='text-center'>Loading...</div>}>
          <CustomVideo videoDimension={"h-[100vh] w-full"} videoButton={"flex items-center justify-center text-9xl h-[100vh] w-full"}
            videoSrc={"https://download-video.akamaized.net/v3-1/playback/c920f1ef-8e46-4301-9ebe-1acaa3ec80b8/33dfa638-384b84f8?__token__=st=1714986235~exp=1715000635~acl=%2Fv3-1%2Fplayback%2Fc920f1ef-8e46-4301-9ebe-1acaa3ec80b8%2F33dfa638-384b84f8%2A~hmac=eaacc098330b866e0ca6e70621051b4d541a9b958a3cd20b47f6f04bb4faa40d&r=dXMtZWFzdDE%3D"} />
        </Suspense>
        <div className='text-white absolute top-48 left-32 w-2/6' >
          <h1 className='text-6xl' >Removable long-range battery</h1>
          <p className='font-montserrat-light py-6 w-11/12' >Recharge anytime, anywhere. Our in-house developed battery is built to go the distance. With a powerful 540 Wh and an impressive range of up to 120km, you&rsquo;ll have the freedom to explore without worrying about running out of power. And if you do need to recharge, our removable and smart battery pack can be easily detached and charged with any electrical outlet.</p>
        </div>
      </section>

      {productName == "Ace_Two" ?
        <section className='flex'>
          <div className='mx-32 my-auto'>
            <h1 className='text-5xl font-montserrat-medium py-5'>Ace Two</h1>
            <p className='text-[#a8abac] font-montserrat-light'>Introducing the Ivy Two, the electric bike that takes your daily commute to the next level. With an accessible lower frame, the latest technology, and safety features, the Ivy delivers instant power, convenience, and peace of mind at every turn, making it the go-to bike for any commute. Equipped with a bright LED brake light for enhanced visibility and safety tracking for added security, the Ivy Two is the perfect combination of design, technology, and safety.</p>
          </div>
          <img className='w-1/2' src="/images/Ace/Ace_Two_PDP_desktop.webp" alt="Ivy Two PDP" loading='lazy' />
        </section>
        :
        <section className='flex'>
          <div className='mx-32 my-auto'>
            <h1 className='text-5xl font-montserrat-medium py-5'>Ivy Two</h1>
            <p className='text-[#a8abac] font-montserrat-light'>Introducing the Ivy Two, the electric bike that takes your daily commute to the next level. With an accessible lower frame, the latest technology, and safety features, the Ivy delivers instant power, convenience, and peace of mind at every turn, making it the go-to bike for any commute. Equipped with a bright LED brake light for enhanced visibility and safety tracking for added security, the Ivy Two is the perfect combination of design, technology, and safety.</p>
          </div>
          <img className='w-1/2' src="/images/Ivy/Ivy_Two_PDP_desktop_1.webp" alt="Ivy Two PDP" loading='lazy' />
        </section>
      }

      <section className='flex'>
        <div className='w-1/2'>
          <Suspense fallback={<div className='text-center'>Loading...</div>}>
            <CustomVideo videoDimension={"h-[100vh]"} videoButton={"flex items-center justify-center text-9xl h-[100vh]"}
              videoSrc={"https://download-video.akamaized.net/v3-1/playback/c920f1ef-8e46-4301-9ebe-1acaa3ec80b8/33dfa638-384b84f8?__token__=st=1714986235~exp=1715000635~acl=%2Fv3-1%2Fplayback%2Fc920f1ef-8e46-4301-9ebe-1acaa3ec80b8%2F33dfa638-384b84f8%2A~hmac=eaacc098330b866e0ca6e70621051b4d541a9b958a3cd20b47f6f04bb4faa40d&r=dXMtZWFzdDE%3D"} />
          </Suspense>
        </div>

        <div className='my-auto w-1/2 px-40'>
          <h1 className='text-5xl font-montserrat-medium py-5'>Silent and powerful mid-motor</h1>
          <p className='text-[#a8abac] font-montserrat-light'>Natural and powerful. The 65Nm torque mid-engine gives you all the power you need. Because the engine is directly connected to your pedals, it automatically adjusts its power to your torque instead of speed. This gives you the most natural electric biking experience there is.</p>
        </div>
      </section>

      <section className='relative'>
        <Suspense fallback={<div className='text-center'>Loading...</div>}>
          <CustomVideo videoDimension={"h-[100vh] w-full"} videoButton={"flex items-center justify-center text-9xl h-[100vh] w-full"}
            videoSrc={"https://download-video.akamaized.net/v3-1/playback/3f3875a9-c99e-4750-b025-542dd3fdee1c/70395819-f0cac7b5?__token__=st=1714988509~exp=1715002909~acl=%2Fv3-1%2Fplayback%2F3f3875a9-c99e-4750-b025-542dd3fdee1c%2F70395819-f0cac7b5%2A~hmac=923201315a423bf39af777b19c3cd1010db8dbcb7effd5987b478deaee51ac83&r=dXMtd2VzdDE%3D"} />
        </Suspense>
        <div className='text-white absolute top-48 left-24 w-2/6 px-14' >
          <h1 className='text-6xl' >Built-in display</h1>
          <p className='font-montserrat-light py-6 w-11/12' >Discover a new level of convenience and control with our elegantly designed integrated display. Everything you need to manage your ride is right at your fingertips, from customizing your bike&rsquo;s settings to navigating unfamiliar parts of the city. And with seamless integration to our app, you can access all your data and ride information with ease.</p>
        </div>
      </section>

      <section className='flex'>
        <div className='px-48 my-auto w-1/2'>
          <h1 className='text-5xl font-montserrat-medium py-5'>Enviolo<sup>&reg;</sup> automated gears</h1>
          <p className='text-[#a8abac] font-montserrat-light'>Never think about shifting gears again. The Enviolo<sup>&reg;</sup> gear system takes automated gear-shifting to the next level, delivering the ultimate ride experience every time. This advanced technology effortlessly shifts gears to optimize performance, delivering a natural and effortless ride. Say goodbye to clunky gear changes and hello to a ride that&rsquo;s both easy and efficient.</p>
        </div>
        <div className='w-1/2 '>
          <Suspense fallback={<div className='text-center'>Loading...</div>}>
            <CustomVideo videoDimension={"h-[100vh] w-full"} videoButton={"flex items-center justify-center text-9xl h-[100vh] w-full "}
              videoSrc={"https://download-video.akamaized.net/v3-1/playback/0e46a374-f100-4aaf-9f01-a9d8f3bc1689/b2c41431-6b0c5aa9?__token__=st=1714988731~exp=1715003131~acl=%2Fv3-1%2Fplayback%2F0e46a374-f100-4aaf-9f01-a9d8f3bc1689%2Fb2c41431-6b0c5aa9%2A~hmac=653c802ed18646324802c0b3c4984206395c361a146f384c88e61c7ba252243c&r=dXMtY2VudHJhbDE%3D"} />
          </Suspense>
        </div>
      </section>

      <section className='flex'>
        <img className='w-1/2' src="/images/Ivy/Gates___belt_drive_desktop.webp" alt="Ivy Two PDP" loading='lazy' />
        <div className='px-40 my-auto'>
          <h1 className='text-6xl font-montserrat-medium py-5 pr-32'>Gates<sup>&reg;</sup> belt drive</h1>
          <p className='text-[#a8abac] font-montserrat-light'>The Gates Carbon Belt drive is a game-changer. Made from premium quality carbon, it offers unmatched durability and strength. And the best part? You&rsquo;ll never have to worry about oiling your chain again. With our carbon belt, you&rsquo;ll enjoy a seamless, hassle-free biking experience that requires no maintenance for up to 30,000 kilometers.</p>
        </div>
      </section>

      <section className='flex'>
        <div className='px-40 my-auto w-1/2'>
          <h1 className='text-5xl font-montserrat-medium py-5'>LED brake light</h1>
          <p className='text-[#a8abac] font-montserrat-light'>When commuting, safety is priority. We acknowledge the significance of being alert and responsive on the road. That&rsquo;s why we created our brake light to activate instantly and illuminate brightly upon pressing the brakes. This feature guarantees that other drivers and commuters are immediately notified of your intention to slow down or come to a complete stop, ensuring your safety on the road.</p>
        </div>
        <div className='w-1/2 '>
          <Suspense fallback={<div className='text-center'>Loading...</div>}>
            <CustomVideo videoDimension={"h-[100vh] w-full"} videoButton={"flex items-center justify-center text-9xl h-[100vh] w-full "}
              videoSrc={"https://download-video.akamaized.net/v3-1/playback/d4766cd4-1bb5-45cb-853f-a72a484b6325/92ca8131?__token__=st=1714990059~exp=1715004459~acl=%2Fv3-1%2Fplayback%2Fd4766cd4-1bb5-45cb-853f-a72a484b6325%2F92ca8131%2A~hmac=194d617fe8eb076d45505f9055ce4636d1212d3e459eefb9aba6405c71eef830&r=dXMtY2VudHJhbDE%3D"} />
          </Suspense>
        </div>
      </section>

      <section className='flex'>
        <img className='w-1/2 py-20 px-14' src="/images/Ivy/Osram_Presicion_Light_desktop.webp" alt="Ivy Two PDP" loading='lazy' />
        <div className='px-40 my-auto'>
          <h1 className='text-5xl font-montserrat-medium py-5 pr-20'>Osram<sup>&reg;</sup> precision light</h1>
          <p className=' font-montserrat-regular'>Safety is fundamental when it comes to biking. We&rsquo;ve designed the precision front light with precision and clarity in mind. From dark roads to challenging city terrain, the precision front light, with its strong beam, is designed to help you navigate with ease and safety. No matter the environment, we make sure we provide you with the visibility you need.</p>
        </div>
      </section>

      <section className='flex'>
        <div className='px-32 my-auto w-1/2'>
          <h1 className='text-5xl font-montserrat-medium'>Safety tracking</h1>
          <p className='font-montserrat-light py-5'>The Electric Two comes with safety tracking. In case you find yourself in an uncertain situation, simply press the button on your handlebar to alert your loved ones of your live location and feel more secure.</p>
          <p className='font-montserrat-light'>Whether you&rsquo;re commuting in the city or exploring the countryside, you can have peace of mind knowing that notifying is just a button press away. Moreover, the tracking feature automatically deactivates after an hour, allowing you to enjoy your rides with complete privacy and security.</p>
        </div>
        <div className='w-1/2 py-20 px-14'>
          <Suspense fallback={<div className='text-center'>Loading...</div>}>
            <CustomVideo videoDimension={"h-[100vh] w-full"} videoButton={"flex items-center justify-center text-9xl h-[100vh] w-full "}
              videoSrc={"https://download-video.akamaized.net/v3-1/playback/952f1cbf-5a78-446e-8721-4e18e23f7931/04e46dcc-aa22b83d?__token__=st=1714990118~exp=1715004518~acl=%2Fv3-1%2Fplayback%2F952f1cbf-5a78-446e-8721-4e18e23f7931%2F04e46dcc-aa22b83d%2A~hmac=5ff0b24cd3171670ad7c118d0513a1e048ddb0c154380ee7e05238fcf735086a&r=dXMtY2VudHJhbDE%3D"} />
          </Suspense>
        </div>
      </section>

      <section className='flex'>
        <img className='w-1/2 py-20 px-14' src="/images/Ivy/Shimano___hydraulic_discbrakes_desktop.webp" alt="Ivy Two PDP" loading='lazy' />
        <div className='px-36 my-auto'>
          <h1 className='text-5xl font-montserrat-medium py-5 '>Shimano<sup>&reg;</sup> hydraulic discbrakes</h1>
          <p className=' font-montserrat-regular'>The Shimano® discbrakes are premium hydraulic disc brakes designed to deliver lightning-fast stopping power, so you can ride with complete confidence and control. Rest assured, you&rsquo;ll feel the difference in the moments you need it most.</p>
        </div>
      </section>

      <section className="mb-28 " >
          <Suspense fallback={<div className='text-center'>Loading...</div>}>
            <InteractiveCycleDiagram productLink={ productName == "Ace_Two" ? Ace_Two["Matte Black"][0] : Ivy_Two["Matte Black"][0] } />
          </Suspense>
      </section>
      <hr />

      {/* Product Specification */}
      <section id="specifications" className='ml-14 mr-28 text-[#727373] my-24 '>
        <h1 className='relative'><span className='text-6xl'>All in the details</span><span className="text-2xl absolute top-[35px]">&#9642;</span></h1>

        <div className='grid grid-flow-col gap-28 font-montserrat-medium my-16' >
          <div className=' grid grid-flow-row gap-5'>
            <div className='mb-2 text-3xl' >Frame</div>
            <div >
              <p className='text-black'>Frame</p>
              <p className=' font-montserrat-regular'>Coated aluminum with integrated battery case</p>
            </div>
            <div >
              <p className='text-black'>Paint</p>
              <p className=' font-montserrat-regular'>PPG Powder Coating 2K</p>
            </div>
            <div >
              <p className='text-black'>Weight</p>
              <p className=' font-montserrat-regular'>Frame 26 kg</p>
              <p className=' font-montserrat-regular'>Battery 3 kg</p>
            </div>
            <div >
              <p className='text-black'>Rider Height</p>
              {productName == "Ace_Two" ?
                <p className=' font-montserrat-regular'>173-200cm</p> : <p className=' font-montserrat-regular'>164-184cm</p>
              }
            </div>
            <div className='row-span-12' >
              <p className=' font-montserrat-regular'>Your bike is delivered to your home at 85% assembled. Or have it assembled for you at one of our partner stores for €99.</p>
            </div>
          </div>

          <div className=' grid grid-flow-row gap-5'>
            <div className='mb-2 text-3xl' >Components</div>
            <div >
              <p className='text-black'>Motor</p>
              <p className=' font-montserrat-regular'>Bafang® 36v 250W / Torq + Rotation Sensor w/ a maximum torque of 65 Nm</p>
            </div>
            <div >
              <p className='text-black'>Battery</p>
              <p className=' font-montserrat-regular'>Removable Smart Battery / 36Vdc, 540 WH 60-120 km range</p>
            </div>
            <div >
              <p className='text-black'>Gears</p>
              <p className=' font-montserrat-regular'>Enviolo® TR / Pro 44T Stepless Automatic Shifting / Ratio 310%</p>
            </div>
            <div >
              <p className='text-black'>Display</p>
              <p className=' font-montserrat-regular'>VeloCity built-in display</p>
            </div>
            <div >
              <p className='text-black'>Brakes</p>
              <p className=' font-montserrat-regular'>Shimano® MT200 hydraulic disc brakes</p>
            </div>
            <div >
              <p className='text-black'>Tires</p>
              <p className=' font-montserrat-regular'>Performance Plus tire / 50-622 / Anti Puncture level 2</p>
            </div>
            <div >
              <p className='text-black'>Belt</p>
              <p className=' font-montserrat-regular'>Gates® Carbon Beltdrive / 122T CDX</p>
            </div>
            <div >
              <p className='text-black'>Light front</p>
              <p className=' font-montserrat-regular'>Osram® Precision front light LED, StVZO approved</p>
            </div>
            <div >
              <p className='text-black'>Light rear</p>
              <p className=' font-montserrat-regular'>COB Hyperbolic LED</p>
            </div>
          </div>

          <div className=' grid grid-flow-row gap-5'>
            <div className='mb-2 text-3xl' >Accessories</div>
            <div >
              <p className='text-black'>Abus plug</p>
              <p className=' font-montserrat-regular'>In-chain lock 140 cm</p>
            </div>
            <div >
              <p className='text-black'>Front carrier</p>
              <p className=' font-montserrat-regular'>AVS front carrier 480g</p>
              <p className=' font-montserrat-regular'>Carrying Capacity: 10 kg (22 lb)</p>
            </div>
            <div >
              <p className='text-black'>Rear carrier</p>
              <p className=' font-montserrat-regular'>AVS rear carrier</p>
            </div>
            <div >
              <p className='text-black'>Basket</p>
              <p className=' font-montserrat-regular'>AVS basket 1.33kg</p>
              <p className=' font-montserrat-regular'>Carrying Capacity: 10 kg (22 lb)</p>
            </div>
            <div className='row-span-12' >
              <p className='text-black'>Cargo basket</p>
              <p className=' font-montserrat-regular'>AVS cargo basket 1.7kg</p>
              <p className=' font-montserrat-regular'>Carrying Capacity: 10 kg (22 lb)</p>
            </div>
          </div>
        </div>

        {/* Downloadable */}
        <div className='flex gap-10' >
          <button onClick={handelDownloadSpecification}
            className="border border-black rounded-full flex items-center gap-4 px-10 py-3">
            <BsDownload className='text-black' />
            <span>Download specifications</span>
          </button>

          <button onClick={handelDownloadManual}
            className="border border-black rounded-full flex items-center gap-4 px-10 py-3 text-xl">
            <TbBookDownload className='text-black' />
            <span>Download manual</span>
          </button>
        </div>
      </section>

    </>
  )
}

ElectricMainContent.propTypes = {
  productName: PropTypes.string
}

export default ElectricMainContent
