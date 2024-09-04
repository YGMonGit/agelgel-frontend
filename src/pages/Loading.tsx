import React, { useEffect } from 'react'
import logo from "../assets/images/agelgel-logo.png";
import ClipLoader from "react-spinners/ClipLoader";
import { useGetUserQuery } from '../api/slices/user.slices';
import { useLocation, useNavigate } from 'react-router-dom';
import { homeUrl, loginUrl, moderatorLoginUrl, moderatorSignUpUrl, signUpUrl } from '../assets/data';

function Loading() {
  const navigate = useNavigate();
  const location = useLocation();


  return (
    <div className='flex flex-col justify-center items-center gap-5 w-screen h-screen pb-10'>
      <img src={logo} alt="agelgel logo" className="w-[71.73px] h-[84px]" />
      <p className="text-[1.2rem] font-semibold mb-10">Agelgel</p>

      <div className='w-full flex flex-col justify-center items-center gap-2 px-5'>
        <p className="w-full text-[1rem] text-slate-500 text-center">It seems your not login</p>
        <button className="bg-content-color border border-content-color font-semibold text-white px-4 py-2 rounded-md w-full" onClick={() => {
          if (location.pathname.startsWith("/user")) {
            navigate(signUpUrl);
          } else if (location.pathname.startsWith("/moderator")) {
            navigate(moderatorSignUpUrl);
          }
        }}>Sign Up</button>
        <button className="bg-white border border-content-color font-semibold text-content-color px-4 py-2 rounded-md w-full" onClick={() => {
          if (location.pathname.startsWith("/user")) {
            navigate(loginUrl);
          } else if (location.pathname.startsWith("/moderator")) {
            navigate(moderatorLoginUrl);
          }
        }}>Log In</button>
      </div>
    </div>
  )
}

export default Loading;