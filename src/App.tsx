import React from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import { Routes, Route } from "react-router-dom";
import { userSignUp, userLoginUrl, userHomeUrl, userRecipeDetailUrl, userPostUrl, userSpaceUrl, userLoadingUrl, userSearchUrl } from './assets/data';
import RecipeDetail from './pages/RecipeDetail';
import NewRecipeForm from './pages/NewRecipeForm';
import SignUp from './pages/SignUp';
import useAdjustedHeight from './hooks/useAdjustedHeight';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import MySpace from './pages/MySpace';
import Loading from './pages/Loading';
import Search from './pages/Search';
import ProtectedRoute from './hooks/userAuthGuard';

function App() {

  const adjustedHeight = useAdjustedHeight();

  return (
    <div className='w-full flex justify-center items-center'>
      <div
        className="w-full overflow-x-hidden flex flex-col justify-start items-center max-w-[800px]"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none", height: `calc(${adjustedHeight}px)` }}

      >
        <Navbar />
        <div className='mt-[56px]'></div>
        <Routes>

          <Route path={userLoginUrl} element={<Login />} />
          <Route path={userSignUp} element={<SignUp />} />
          <Route path={userLoadingUrl} element={<Loading />} />


          <Route
            path="/user/*"
            element={
              <ProtectedRoute>
                <Routes>
                  <Route path={userHomeUrl} element={<Home />} />
                  <Route path={userSearchUrl} element={<Search />} />
                  <Route path={`${userRecipeDetailUrl}/:id`} element={<RecipeDetail />} />
                  <Route path={userPostUrl} element={<NewRecipeForm />} />
                  <Route path={userSpaceUrl} element={<MySpace />} />
                </Routes>
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;