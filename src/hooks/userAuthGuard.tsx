import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useGetUserQuery } from '../api/slices/user.slices';
import { useGetModeratorQuery } from '../api/slices/moderator.slices';
import { welcomeUrl, loginUrl, moderatorLoginUrl } from '../assets/data';
import { Backdrop } from '@mui/material';
import ClipLoader from 'react-spinners/ClipLoader';

const LoadingBackdrop = () => (
  <Backdrop open={true} style={{ zIndex: 1300 }}>
    <ClipLoader
      color={"var(--content-color)"}
      size={40}
      aria-label="Loading Spinner"
      data-testid="loader"
    />
  </Backdrop>
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