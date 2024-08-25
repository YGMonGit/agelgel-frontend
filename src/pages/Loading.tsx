import React, { useEffect } from 'react'
import logo from "../assets/images/agelgel-logo.png";
import ClipLoader from "react-spinners/ClipLoader";
import { useGetUserQuery } from '../api/slices/user.slices';
import { useNavigate } from 'react-router-dom';
import { homeUrl, signUpUrl } from '../assets/data';

function Loading() {
  const navigate = useNavigate();
  const { data, isLoading, isError } = useGetUserQuery();

  useEffect(() => {
    if (data) {
      navigate(homeUrl);
    } else if (!data && isError) {
      navigate(signUpUrl);
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
      /> : null}
    </div>
  )
}

export default Loading