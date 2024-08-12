import React, { useState } from "react";
import PageHeader from "../components/PageHeader";
import { Input, UseGoogle } from "../components/Input";
import { MdVisibility } from "react-icons/md";
import { AiFillEyeInvisible } from "react-icons/ai";
import { Checkbox } from "../components/ui/checkbox";
import WideButton from "../components/WideButton";
import { loginUrl } from "../assets/data";

function SignUp() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = async (e: React.FocusEvent<HTMLInputElement>) => {

  }
  const handleWithGoogleClick = () => {

  };

  // const onUsernameChange = (e: React.FocusEvent<HTMLInputElement>) => setUsername(e.target.value);
  const onUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value);
  const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);
  const handleToggle = () => setRememberMe(!rememberMe);

  return (
    <div className="w-full flex-grow flex flex-col justify-start items-center">
      <PageHeader header="Register" detail="Sign up and create your account." />
      <UseGoogle clickAction={handleWithGoogleClick} />
      <div className="w-full flex flex-col justify-start items-center flex-grow">
        <Input label="Your username" placeholder="username" value={username} onChange={onUsernameChange} />
        <Input label="Password" placeholder="password" value={password} isPassword={true} showPassword={showPassword} onChange={onPasswordChange}>
          <div
            className="text-[#6B7280] text-[1.3rem] absolute top-0 right-2 h-full flex justify-end items-center cursor-pointer border-0 bg-transparent"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <MdVisibility /> : <AiFillEyeInvisible />}
          </div>
        </Input>
        <div className="w-full px-5 flex justify-between items-center">
          <label
            htmlFor="terms"
            className="flex justify-start py-3 items-center gap-2 text-[1.1rem] leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-neutral-700 font-[500]"
          >
            <Checkbox id="terms" className="border-0 bg-[#F9FAFB]" onClick={handleToggle}/>
            <span className="select-none">Remember me</span>
          </label>
          <a href="/" className="text-content-color font-[470]">Forgot Password?</a>
        </div>
      </div>
      <WideButton label="Next" color="bg-content-color" />
      <div className="w-full px-5 text-slate-400 text-[1rem] mb-10">Already have an account? <a href={loginUrl} className="text-content-color font-[470]">Login</a></div>
    </div>
  );
}

export default SignUp;