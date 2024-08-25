// import React from "react";
// import { Outlet, Link } from "react-router-dom";
// import { useEffect, useRef, useState } from "react";
// // import { useRefreshMutation } from "../../features/auth/authApiSlice";
// import usePersist from "../hooks/usePersist";
// import { useSelector } from "react-redux";
// // import { selectCurrentToken } from "../../features/auth/authSlice";
// import { useGetUserQuery } from "../api/slices/user.slices";

// // import Loading from "../Loading";

// const PersistLogin = () => {
//   const [persist] = usePersist();
//   const token = useSelector(selectCurrentToken);
//   const effectRan = useRef(false);

//   const [trueSuccess, setTrueSuccess] = useState(false);

//   const [refresh, { isLoading, isSuccess, isError, error }] =
//     useGetUserQuery();

//   useEffect(() => {
//     if (effectRan.current === true || process.env.NODE_ENV !== "development") {
//       // React 18 Strict Mode
//       const verifyRefreshToken = async () => {
//         console.log("verifying refresh token");
//         try {
//           //const response =
//           await refresh();
//           //const { accessToken } = response.data
//           // setTrueSuccess(true);
//         } catch (err) {
//           console.error(err);
//         }
//       };
//       if (!token && persist) verifyRefreshToken();
//     }
//     return () => (effectRan.current = true);
//     // eslint-disable-next-line
//   }, []);

//   let content;
//   if (!persist) {
//     content = <Outlet />;
//   } else if (isLoading) {
//     content = <Loading />;
//   } else if (isError) {
//     content = (
//       <p className="errmsg">
//         {error.data?.message}
//         <Link to="/login">Please login again</Link>.
//       </p>
//     );
//   } else if (isSuccess && trueSuccess) {
//     content = <Outlet />;
//   } else if (token && isUninitialized) {
//     content = <Outlet />;
//   }

//   return content;
// };

// export default PersistLogin;