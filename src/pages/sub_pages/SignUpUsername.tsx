import React from "react";
import PageHeader from "../../components/PageHeader";
import { Input, UseGoogle } from "../../components/Input";
import WideButton from "../../components/WideButton";
import { loginUrl } from "../../assets/data";
import ProfileImageInput from "../../components/ProfileImageInput";

interface SingUpUsernameProps {
  setFormNumber: React.Dispatch<React.SetStateAction<number>>;
  firstName: string;
  setFirstName: React.Dispatch<React.SetStateAction<string>>;
  lastName: string;
  setLastName: React.Dispatch<React.SetStateAction<string>>;
  phone: string;
  setPhone: React.Dispatch<React.SetStateAction<string>>;
  handleWithGoogleClick?: () => void;
  handleSubmit: (e: React.FormEvent<HTMLButtonElement>) => Promise<void>;
  register: any;
  setValue:any
}

function SignUpUsername({
  setFormNumber,
  firstName,
  setFirstName,
  lastName,
  setLastName,
  phone,
  setPhone,
  handleWithGoogleClick,
  handleSubmit,
  register,
  setValue,
}: SingUpUsernameProps) {
  const onFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFirstName(e.target.value);
  const onLastNameChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setLastName(e.target.value);
  const onPhoneChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setPhone(e.target.value);

  const onNextClick = () => {
    setFormNumber(2);
  };

  return (
    <div className="w-full flex-grow flex flex-col justify-start items-center">
      <PageHeader header="Register" detail="Sign up and create your account." />
      <UseGoogle clickAction={handleWithGoogleClick} />
      <div className="w-full flex flex-col justify-start items-center flex-grow">
        <div className="w-full px-5">
          <ProfileImageInput register={register} setValue={setValue} />
        </div>
        <Input
          label="First Name"
          placeholder="first_name"
          value={firstName}
          onChange={onFirstNameChange}
          register={register}
          />
        <Input
          label="Last Name"
          placeholder="last_name"
          value={lastName}
          onChange={onLastNameChange}
          register={register}
          />
        <Input
          label="Phone"
          placeholder="phone_number"
          value={phone}
          onChange={onPhoneChange}
          register={register}
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
