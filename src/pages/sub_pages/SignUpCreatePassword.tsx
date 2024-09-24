import React, { useState } from "react";
import PageHeader from "../../components/PageHeader";
import { Input } from "../../components/Input";
import { RiEyeCloseLine, RiEyeLine } from "react-icons/ri";
import WideButton from "../../components/WideButton";
import { loginUrl, moderatorLoginUrl } from "../../assets/data";
import WideLink from "../../components/WideLink";
import ClipLoader from "react-spinners/ClipLoader";

interface SingUpCreatePasswordProps {
  setFormNumber: React.Dispatch<React.SetStateAction<number>>;
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  confirmPassword: string;
  setConfirmPassword: React.Dispatch<React.SetStateAction<string>>;
  register: any;
  errors: any;
  forModerator?: boolean;
  isLoading?: any;
}

function SignUpCreatePassword({
  setFormNumber,
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
  register,
  errors,
  forModerator = false,
  isLoading,
}: SingUpCreatePasswordProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showCPassword, setShowCPassword] = useState(false);

  const onConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setConfirmPassword(e.target.value);
  const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setPassword(e.target.value);

  const onBackClick = () => {
    setFormNumber(2);
  };
  const onNextClick = () => {
    setFormNumber(4);
  };

  return (
    <div className="w-full flex-grow flex flex-col justify-start items-center">
      <PageHeader
        header="Last step!"
        detail="Sign up and create your account."
      />
      <div className="w-full flex flex-col justify-start items-center flex-grow">
        <Input
          label="Password"
          placeholder="password"
          value={password}
          isPassword={true}
          showPassword={showPassword}
          onChange={onPasswordChange}
          register={register}
          errors={errors.password}
        // errors={errors.first_name}
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
          placeholder="confirm_password"
          value={confirmPassword}
          isPassword={true}
          showPassword={showCPassword}
          onChange={onConfirmPasswordChange}
          register={register}
          errors={errors.confirm_password}
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
        <WideLink
          label="Back"
          color="bg-white"
          outline={true}
          clickAction={onBackClick}
        />
        {forModerator ? (
          isLoading ? (
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
            } color="bg-content-color" disable={isLoading} />
          ) : (
            <WideButton
              label="Finish"
              color="bg-content-color"
            />
          )
        ): (
          <WideLink
            label="Next"
            color="bg-content-color"
            clickAction={onNextClick}
          />
        )}
      </div>
      <div className="w-full px-5 text-slate-400 text-[1rem] mb-10">
        Already have an account?{" "}
        <a href={ forModerator ? moderatorLoginUrl : loginUrl } className="text-content-color font-[470]">
          Login now
        </a>
      </div>
    </div>
  );
}

export default SignUpCreatePassword;
