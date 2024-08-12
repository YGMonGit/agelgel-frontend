import React, { useState } from "react";
import PageHeader from "../components/PageHeader";
import { Input, UseGoogle } from "../components/Input";
import WideButton from "../components/WideButton";
import { loginUrl } from "../assets/data";

function SignUpUsername() {

  const [username, setUsername] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // Handle form submission logic here
  }

  const handleWithGoogleClick = () => {

  };

  const onUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value);

  return (
    <div className="w-full flex-grow flex flex-col justify-start items-center">
      <PageHeader header="Register" detail="Sign up and create your account." />
      <UseGoogle clickAction={handleWithGoogleClick} />
      <form className="w-full flex flex-col justify-start items-center flex-grow" onSubmit={handleSubmit}>
        <Input label="Your username" placeholder="username" value={username} onChange={onUsernameChange} />
      </form>
      <WideButton label="Next" color="bg-content-color" />
      <div className="w-full px-5 text-slate-400 text-[1rem] mb-10">Already have an account? <a href={loginUrl} className="text-content-color font-[470]">Login now</a></div>
    </div>
  );
}

export default SignUpUsername;