import React from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import { Routes, Route } from "react-router-dom";
import { signUpUrl, loginUrl, homeUrl, recipeDetailUrl, postUrl } from './assets/data';
import RecipeDetail from './pages/RecipeDetail';
import NewRecipeForm from './pages/NewRecipeForm';
import SignUp from './pages/SignUp';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

function App() {
  return (
    <div className="w-full h-screen overflow-x-hidden flex flex-col justify-start items-center">
      <Navbar />
      <div className='mt-[56px]'></div>
      <Routes> 
        <Route path={homeUrl} element={<Home />} />
        <Route path={loginUrl} element={<Login />} />
        <Route path={signUpUrl} element={<SignUp />} />
        <Route path={`${recipeDetailUrl}/:id`} element={<RecipeDetail />} />
        <Route path={postUrl} element={<NewRecipeForm />} />
      </Routes>
    </div>
  );
}

export default App;