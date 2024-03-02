import Link from 'next/link'
import React from 'react'

function Hero() {
  return (
    <div className='container flex flex-col items-start justify-center w-full  max-h-screen h-[500px]'>
      <div className='text-4xl md:text-7xl text-left md:text-center font-extrabold md:max-w-6xl leading-tight uppercase'>
        <span className='hero-text'>
          Descentralised
        </span>
        {" "}
        Secure Collaboration Platform
      </div>

      <div className='w-full flex items-start justify-center '>
        <p className='text-sm text-left md:text-center w-full md:text-lg mt-5 md:mt-10 text-gray-500'>
          DSCP is a platform that allows you to collaborate with your team in a secure and decentralised manner.
        </p>
      </div>

      <div className='w-full flex items-center justify-center mt-5'>
        <Link href="/" className='submit-button hover:border-white text-center dark:text-white dark:hover:border-black border border-[#e536ab] text-black transition-all duration-300 rounded-full hover:text-white text-xs font-light w-full md:w-auto py-3 px-7 mt-5 uppercase'>
          Get Started
        </Link>
      </div>

    </div>
  )
}

export default Hero