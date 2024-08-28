import React, { useState } from "react";
import PageHeader from "../components/PageHeader";
import { Input, UseGoogle } from "../components/Input";

import { RiEyeCloseLine, RiEyeLine } from "react-icons/ri";

import { Checkbox } from "../components/ui/checkbox";
import WideButton from "../components/WideButton";
import { homeUrl, signUpUrl } from "../assets/data";
import { useLogInMutation } from "../api/slices/user.slices";
import { useForm } from "react-hook-form";
import { IUserLogInFrom } from "../api/types/user.type";
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate } from "react-router-dom";
import ProfileImageInput from "../components/ProfileImageInput";
import { logInSchema } from "../validation/user.validation";
import ClipLoader from "react-spinners/ClipLoader";

function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const navigate = useNavigate();

  const [logIn, { isLoading }] = useLogInMutation();

  const { register, handleSubmit, formState: { errors }, setError } = useForm<IUserLogInFrom>({
    resolver: zodResolver(logInSchema),
  });

  async function login(data: IUserLogInFrom) {
    console.log("Logging in...");
    try {
      await logIn({ data }).unwrap();
      navigate(homeUrl);
    } catch (error: any) {
      if (!error.data.error) return;
      const err = error.data.error;
      if (err.type === "Validation")
        if (err.attr === "")
          setError("email", { message: err.msg });
        else
          setError(err.attr, { message: err.error });

      // const [sreverError, setSreverError] = useState<string | null>(null);
      //  setSreverError(err.msg);
      // sreverError && { <p>{sreverError}</p>

    }
  }

  const handleWithGoogleClick = () => {

  };

  const onEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);
  const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);
  const handleToggle = () => setRememberMe(!rememberMe);

  return (
    <div className="w-full flex-grow flex flex-col justify-start items-center">
      <PageHeader header="Hey! Welcome Back." detail="Log in to your account." />
      <UseGoogle clickAction={handleWithGoogleClick} />
      <form className="w-full flex flex-col justify-start items-center flex-grow" onSubmit={handleSubmit(login)}>
        <Input label="Your email" placeholder="email" value={email} onChange={onEmailChange} register={register} errors={errors.email} />
        <Input label="Password" placeholder="password" value={password} isPassword={true} showPassword={showPassword} onChange={onPasswordChange} register={register} errors={errors.password}>
          <div
            className="text-[#6B7280] text-[1.3rem] absolute top-0 right-2 h-full flex justify-end items-center cursor-pointer border-0 bg-transparent"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <RiEyeLine /> : <RiEyeCloseLine />}
          </div>
        </Input>
        <div className="w-full px-5 flex justify-between items-center">
          <label
            htmlFor="terms"
            className="flex justify-start py-3 items-center gap-2 text-[1.1rem] leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-neutral-700 font-[500]"
          >
            <Checkbox id="terms" className="border-0 bg-[#F9FAFB]" onClick={handleToggle} />
            <span className="select-none">Remember me</span>
          </label>
          <a href="/" className="text-content-color font-[470]">Forgot Password?</a>
        </div>
        <div className="w-full px-5">
          {isLoading ? (
            <WideButton label={
              <div className="flex justify-center items-center w-full h-full gap-2">
                <ClipLoader
                  color={"white"}
                  size={15}
                  aria-label="Loading Spinner"
                  data-testid="loader"
                />
                <p className="text-white text-[1.1rem] italic">loading ...</p>
              </div>
            } color="bg-content-color" disable={true} />
          ) : (
            <WideButton label="Login" color="bg-content-color" />
          )}
        </div>
      </form>
      <div className="w-full px-5 text-slate-400 text-[1rem] mb-10">Not Registered? <a href={signUpUrl} className="text-content-color font-[470]">Create Account</a></div>
    </div>
  );
}

export default Login;

