import React from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import { Routes, Route } from "react-router-dom";
import { signUpUrl, loginUrl, homeUrl, recipeDetailUrl, postUrl, mySpaceUrl, loadingUrl, searchUrl, moderatorSignUpUrl, moderatorLoginUrl, moderatorHomeUrl, moderatorSearchUrl, moderatorRecipeDetailUrl, moderatorSpaceUrl } from './assets/data';
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
import ModeratorSignUp from './pages/Moderator/ModeratorSignUp';
import ModeratorLogin from './pages/Moderator/ModeratorLogin';
import ModeratorHome from './pages/Moderator/ModeratorHome';
import ModeratorSearch from './pages/Moderator/ModeratorSearch';
import ModeratorRecipeDetail from './pages/Moderator/ModeratorRecipeDetail';
import ModeratorSpace from './pages/Moderator/ModeratorSpace';
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

          <Route path={loginUrl} element={<Login />} />
          <Route path={signUpUrl} element={<SignUp />} />
          <Route path={loadingUrl} element={<Loading />} />


          <Route
            path="/user/*"
            element={
              <ProtectedRoute>
                <Routes>
                  <Route path={homeUrl} element={<Home />} />
                  <Route path={searchUrl} element={<Search />} />
                  <Route path={`${recipeDetailUrl}/:id`} element={<RecipeDetail />} />
                  <Route path={postUrl} element={<NewRecipeForm />} />
                  <Route path={mySpaceUrl} element={<MySpace />} />
                </Routes>
              </ProtectedRoute>
            }
          />

          <Route path={moderatorSignUpUrl} element={<ModeratorSignUp />} />
          <Route path={moderatorLoginUrl} element={<ModeratorLogin />} />
          <Route path={moderatorHomeUrl} element={<ModeratorHome />} />
          <Route path={moderatorSearchUrl} element={<ModeratorSearch />} />
          <Route path={`${moderatorRecipeDetailUrl}/:id`} element={<ModeratorRecipeDetail />} />
          <Route path={moderatorSpaceUrl} element={<ModeratorSpace />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;