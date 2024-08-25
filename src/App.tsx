import React from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import { Routes, Route } from "react-router-dom";
import { signUpUrl, loginUrl, homeUrl, recipeDetailUrl, postUrl, mySpaceUrl } from './assets/data';
import RecipeDetail from './pages/RecipeDetail';
import NewRecipeForm from './pages/NewRecipeForm';
import SignUp from './pages/SignUp';
import useAdjustedHeight from './hooks/useAdjustedHeight';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import MySpace from './pages/MySpace';

function App() {

  const adjustedHeight = useAdjustedHeight();

  return (
    // <div className="w-full h-screen-minus-56 bg-red-400 overflow-x-hidden flex flex-col justify-start items-center">
    <div
      className="w-full overflow-x-hidden flex flex-col justify-start items-center"
      style={{ height: `calc(${adjustedHeight}px)` }}
    >
      <Navbar />
      <div className='mt-[56px]'></div>
      <Routes> 
        <Route path={homeUrl} element={<Home />} />
        <Route path={loginUrl} element={<Login />} />
        <Route path={signUpUrl} element={<SignUp />} />
        <Route path={`${recipeDetailUrl}/:id`} element={<RecipeDetail />} />
        <Route path={postUrl} element={<NewRecipeForm />} />
        <Route path={mySpaceUrl} element={<MySpace />} />
      </Routes>
    </div>
  );
}

export default App;