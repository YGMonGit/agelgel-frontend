import React, { useState } from "react";
import PageHeader from "../components/PageHeader";
import { Input, UseGoogle } from "../components/Input";

import { RiEyeCloseLine, RiEyeLine  } from "react-icons/ri";

import WideButton from "../components/WideButton";
import { loginUrl } from "../assets/data";

function SignUpCreatePassword() {

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showCPassword, setShowCPassword] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // Handle form submission logic here
  }

  const handleWithGoogleClick = () => {

  };

  const onConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => setConfirmPassword(e.target.value);
  const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);

  return (
    <div className="w-full flex-grow flex flex-col justify-start items-center">
      <PageHeader header="Last step!" detail="Sign up and create your account." />
      <UseGoogle clickAction={handleWithGoogleClick} />
      <form className="w-full flex flex-col justify-start items-center flex-grow" onSubmit={handleSubmit}>
        <Input label="Password" placeholder="password" value={password} isPassword={true} showPassword={showPassword} onChange={onPasswordChange}>
          <div
            className="text-[#6B7280] text-[1.3rem] absolute top-0 right-2 h-full flex justify-end items-center cursor-pointer border-0 bg-transparent"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <RiEyeLine /> : <RiEyeCloseLine />}
          </div>
        </Input>
        <Input label="Confirm Password" placeholder="rewrite password" value={confirmPassword} isPassword={true} showPassword={showCPassword} onChange={onConfirmPasswordChange}>
          <div
            className="text-[#6B7280] text-[1.3rem] absolute top-0 right-2 h-full flex justify-end items-center cursor-pointer border-0 bg-transparent"
            onClick={() => setShowCPassword(!showCPassword)}
          >
            {showCPassword ? <RiEyeLine /> : <RiEyeCloseLine />}
          </div>
        </Input>
      </form>
      <WideButton label="Next" color="bg-content-color" />
      <div className="w-full px-5 text-slate-400 text-[1rem] mb-10">Already have an account? <a href={loginUrl} className="text-content-color font-[470]">Login now</a></div>
    </div>
  );
}

export default SignUpCreatePassword;