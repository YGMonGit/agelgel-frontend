import React, { useState } from "react";
import PageHeader from "../../components/PageHeader";
import { Input, UseGoogle } from "../../components/Input";
import { RiEyeCloseLine, RiEyeLine } from "react-icons/ri";
import WideButton from "../../components/WideButton";
import { loginUrl } from "../../assets/data";

interface SingUpCreatePasswordProps {
  setFormNumber: React.Dispatch<React.SetStateAction<number>>;
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  confirmPassword: string;
  setConfirmPassword: React.Dispatch<React.SetStateAction<string>>;
  handleWithGoogleClick?: () => void;
}

function SignUpCreatePassword({
  setFormNumber,
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
  handleWithGoogleClick,
}: SingUpCreatePasswordProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showCPassword, setShowCPassword] = useState(false);

  const onConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setConfirmPassword(e.target.value);
  const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setPassword(e.target.value);

  const onBackClick = () => {
    setFormNumber(1);
  };
  const onNextClick = () => {
    setFormNumber(3);
  };

  return (
    <div className="w-full flex-grow flex flex-col justify-start items-center">
      <PageHeader
        header="Last step!"
        detail="Sign up and create your account."
      />
      <UseGoogle clickAction={handleWithGoogleClick} />
      <div className="w-full flex flex-col justify-start items-center flex-grow">
        <Input
          label="Password"
          placeholder="password"
          value={password}
          isPassword={true}
          showPassword={showPassword}
          onChange={onPasswordChange}
        >
          <div
            className="text-[#6B7280] text-[1.3rem] absolute top-0 right-2 h-full flex justify-end items-center cursor-pointer border-0 bg-transparent"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <RiEyeLine /> : <RiEyeCloseLine />}
          </div>
        </Input>
        <Input
          label="Confirm Password"
          placeholder="rewrite password"
          value={confirmPassword}
          isPassword={true}
          showPassword={showCPassword}
          onChange={onConfirmPasswordChange}
        >
          <div
            className="text-[#6B7280] text-[1.3rem] absolute top-0 right-2 h-full flex justify-end items-center cursor-pointer border-0 bg-transparent"
            onClick={() => setShowCPassword(!showCPassword)}
          >
            {showCPassword ? <RiEyeLine /> : <RiEyeCloseLine />}
          </div>
        </Input>
      </div>
      <div className="w-full px-5 flex justify-center items-end gap-2">
        <WideButton
          label="Back"
          color="bg-white"
          outline={true}
          clickAction={onBackClick}
        />
        <WideButton
          label="Finish"
          color="bg-content-color"
          clickAction={onNextClick}
        />
      </div>
      <div className="w-full px-5 text-slate-400 text-[1rem] mb-10">
        Already have an account?{" "}
        <a href={loginUrl} className="text-content-color font-[470]">
          Login now
        </a>
      </div>
    </div>
  );
}

export default SignUpCreatePassword;
