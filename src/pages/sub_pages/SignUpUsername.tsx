import React from "react";
import PageHeader from "../../components/PageHeader";
import { Input, UseGoogle } from "../../components/Input";
import WideButton from "../../components/WideButton";
import { loginUrl } from "../../assets/data";

interface SingUpUsernameProps {
  setFormNumber: React.Dispatch<React.SetStateAction<number>>;
  username: string;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  handleWithGoogleClick?: () => void;
}

function SignUpUsername({
  setFormNumber,
  username,
  setUsername,
  handleWithGoogleClick,
}: SingUpUsernameProps) {
  const onUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setUsername(e.target.value);

  const onNextClick = () => {
    setFormNumber(2);
  };

  return (
    <div className="w-full flex-grow flex flex-col justify-start items-center">
      <PageHeader header="Register" detail="Sign up and create your account." />
      <UseGoogle clickAction={handleWithGoogleClick} />
      <div className="w-full flex flex-col justify-start items-center flex-grow">
        <Input
          label="Your username"
          placeholder="username"
          value={username}
          onChange={onUsernameChange}
        />
      </div>
      <div className="w-full px-5">
        <WideButton
          label="Next"
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

export default SignUpUsername;
