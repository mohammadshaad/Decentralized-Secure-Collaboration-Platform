"use client";

import { useState, useRef, useEffect } from "react";
import Link from 'next/link'
import React from 'react'
import { Input } from "../../@/components/ui/input";
import { useRouter } from 'next/router';
import { Button } from "./ui/moving-border";

import { Spotlight } from "./ui/Spotlight";

function Hero() {
  const [pinataJWT, setPinataJWT] = useState("");

  const router = useRouter();

  const handleGetStarted = () => {
    router.push({
      pathname: '/files',
      query: { pinataJWT },
    });
  };

  return (

    
    <div className='container flex flex-col items-start justify-center w-full  max-h-screen h-[500px]'>
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="pink"
      />
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

      <div className='w-full flex items-center justify-center mt-10 gap-6'>
        <div className="w-1/2">
          <Input
            type="text"
            id="pinataJWT"
            className="rounded-full py-5"
            value={pinataJWT}
            onChange={(e) => setPinataJWT(e.target.value)}
            placeholder="Enter Pinata JWT"
          />
        </div>
        {/* Update the onClick handler to call handleGetStarted instead of directly navigating */}
        <button
          onClick={handleGetStarted}
          className='submit-button hover:border-white text-center dark:text-white dark:hover:border-black border border-[#e536ab] text-black transition-all duration-300 rounded-full hover:text-white text-xs font-light w-full md:w-auto py-3 px-7 uppercase ring-0 outline-none'
        >
          Get Started
        </button>
      </div>


    </div>
  )
}

export default Hero