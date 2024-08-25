import React from 'react'
import logo from "../assets/images/agelgel-logo.png";
import ClipLoader from "react-spinners/ClipLoader";

function Loading() {
  return (
    <div className='flex flex-col justify-center items-center gap-5 w-screen h-screen pb-10'>
      <img src={logo} alt="agelgel logo" className="w-[71.73px] h-[84px]" />
      <p className="text-[1.2rem] font-semibold mb-10">Agelgel</p>
      <ClipLoader
        color= {"var(--content-color)"}
        size={30}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  )
}

export default Loading