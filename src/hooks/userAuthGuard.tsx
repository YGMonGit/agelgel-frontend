import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useGetUserQuery } from '../api/slices/user.slices';
import { useGetModeratorQuery } from '../api/slices/moderator.slices';
import { loginUrl, moderatorLoginUrl } from '../assets/data';
import ClipLoader from 'react-spinners/ClipLoader';
import logo from "../assets/images/agelgel-logo.png";

const LoadingBackdrop = () => (
  <div className='w-full h-full flex flex-col justify-center items-center gap-1'>
    <img src={logo} alt="agelgel logo" className="w-[71.73px] h-[84px] -mt-24" />
    <p className="text-[1.2rem] font-semibold mb-10">Agelgel</p>
    <ClipLoader
      color={"var(--content-color)"}
      size={40}
      aria-label="Loading Spinner"
      data-testid="loader"
    />
  </div>
);

export const ProtectedRoute: React.FC = () => {
  const { isError, isFetching } = useGetUserQuery();

  if (isFetching) {
    return <LoadingBackdrop />;
  }

  if (isError) {
    return <Navigate to={loginUrl} replace />;
  }

  return <Outlet />;
};

export const ModeratorProtectedRoute: React.FC = () => {
  const { isError, isFetching } = useGetModeratorQuery();

  if (isFetching) {
    return <LoadingBackdrop />;
  }

  if (isError) {
    return <Navigate to={moderatorLoginUrl} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;