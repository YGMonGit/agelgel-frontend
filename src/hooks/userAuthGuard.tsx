import { Navigate, useNavigate } from 'react-router-dom';
import React from 'react';
import { useGetUserQuery } from '../api/slices/user.slices';
import { userLoadingUrl, userLoginUrl } from '../assets/data';
import { Backdrop, CircularProgress } from '@mui/material';
import ClipLoader from 'react-spinners/ClipLoader';

export default function ProtectedRoute({ children }: { children: any }) {

  const { isError, isFetching } = useGetUserQuery();

  if (isFetching) {
    return (
      <Backdrop open={isFetching} style={{ zIndex: 1300 }}>
        <ClipLoader
          color={"var(--content-color)"}
          size={40}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </Backdrop>
    )
  }

  if (!isFetching && isError) {
    return <Navigate to={userLoadingUrl} replace />;
  }
  return children;
};

