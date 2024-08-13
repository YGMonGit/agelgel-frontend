import React from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import { Routes, Route } from "react-router-dom";
import { signUpUrl, createPasswordUrl, loginUrl, healthConditionUrl, homeUrl, recipeDetailUrl } from './assets/data';
import SignUpUsername from './pages/SignUpUsername';
import SignUpCreatePassword from './pages/SignUpCreatePassword';
import HealthConditions from './pages/HealthConditions';
import RecipeDetail from './pages/RecipeDetail';

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
        <Route path={signUpUrl} element={<SignUpUsername />} />
        <Route path={createPasswordUrl} element={<SignUpCreatePassword />} />
        <Route path={healthConditionUrl} element={<HealthConditions />} />
        <Route path={`${recipeDetailUrl}/:id`} element={<RecipeDetail />} />
      </Routes>
    </div>
  );
}

export default App;
