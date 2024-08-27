import React, { useEffect } from 'react'
import logo from "../assets/images/agelgel-logo.png";
import ClipLoader from "react-spinners/ClipLoader";
import { useGetUserQuery } from '../api/slices/user.slices';
import { useNavigate } from 'react-router-dom';
import { homeUrl, loginUrl, signUpUrl } from '../assets/data';

function Loading() {
  const navigate = useNavigate();
  const { data, isLoading, isError } = useGetUserQuery();

  useEffect(() => {
    if (data) {
      navigate(homeUrl);
    }
  }
    , [data, isLoading, isError, navigate])

  return (
    <div className='flex flex-col justify-center items-center gap-5 w-screen h-screen pb-10'>
      <img src={logo} alt="agelgel logo" className="w-[71.73px] h-[84px]" />
      <p className="text-[1.2rem] font-semibold mb-10">Agelgel</p>
      {isLoading ? <ClipLoader
        color={"var(--content-color)"}
        size={30}
        aria-label="Loading Spinner"
        data-testid="loader"
      /> : <div>
        <p className="text-[1rem] text-red-500">it seems your not login</p>
        <button className="bg-red-500 text-white px-4 py-2 rounded-md" onClick={() => navigate(signUpUrl)}>Sign Up</button>
        <button className="bg-red-500 text-white px-4 py-2 rounded-md" onClick={() => navigate(loginUrl)}>Log In</button>
      </div>}
    </div>
  )
}

export default Loading