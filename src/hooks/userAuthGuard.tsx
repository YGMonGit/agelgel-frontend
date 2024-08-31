import { Navigate, useNavigate } from 'react-router-dom';
import React from 'react';
import { useGetUserQuery } from '../api/slices/user.slices';
import { welcomeUrl } from '../assets/data';
import { Backdrop, CircularProgress } from '@mui/material';
import ClipLoader from 'react-spinners/ClipLoader';
import { useGetModeratorQuery } from '../api/slices/moderator.slices';

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
    return <Navigate to={welcomeUrl} replace />;
  }
  return children;
};

export function ModeratorProtectedRoute({ children }: { children: any }) {

  const { isError, isFetching } = useGetModeratorQuery();

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
    return <Navigate to={welcomeUrl} replace />;
  }
  return children;
};

