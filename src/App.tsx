import React from 'react';
import logo from './logo.svg';
import Login from './pages/Login';
import Navbar from './components/Navbar';
import { Routes, Route } from "react-router-dom";
import { signUpUrl, createPasswordUrl, loginUrl, healthConditionUrl } from './assets/data';
import SignUpUsername from './pages/SignUpUsername';
import SignUpCreatePassword from './pages/SignUpCreatePassword';
import HealthConditions from './pages/HealthConditions';

function App() {
  return (
    <div className="w-full h-screen overflow-x-hidden flex flex-col justify-start items-center">
      <Navbar />
      <Routes>     
        <Route path={loginUrl} element={<Login />} />
        <Route path={signUpUrl} element={<SignUpUsername />} />
        <Route path={createPasswordUrl} element={<SignUpCreatePassword />} />
        <Route path={healthConditionUrl} element={<HealthConditions />} />
      </Routes>
    </div>
  );
}

export default App;
