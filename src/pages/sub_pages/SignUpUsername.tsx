import React from "react";
import PageHeader from "../../components/PageHeader";
import { Input, UseGoogle } from "../../components/Input";
import { loginUrl, moderatorLoginUrl } from "../../assets/data";
import ProfileImageInput from "../../components/ProfileImageInput";
import WideLink from "../../components/WideLink";
import DetailInput from "../../components/DetailInput";
import WideButton from "../../components/WideButton";
import ClipLoader from "react-spinners/ClipLoader";

interface SingUpUsernameProps {
  setFormNumber: React.Dispatch<React.SetStateAction<number>>;
  image: string | undefined | null;
  setImage: React.Dispatch<React.SetStateAction<string | undefined | null>>;
  firstName: string;
  setFirstName: React.Dispatch<React.SetStateAction<string>>;
  lastName: string;
  setLastName: React.Dispatch<React.SetStateAction<string>>;
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  phone: string;
  setPhone: React.Dispatch<React.SetStateAction<string>>;
  handleWithGoogleClick?: () => void;
  forModerator?: boolean;
  register: any;
  setValue: any
  errors: any
  bio?: string;
  setBio?: React.Dispatch<React.SetStateAction<string>>;
  isOnly?: boolean;
  isLoading?: boolean;
}

function SignUpUsername({
  setFormNumber,
  isOnly = false,
  isLoading,
  image,
  setImage,
  firstName,
  setFirstName,
  lastName,
  setLastName,
  email,
  setEmail,
  phone,
  setPhone,
  forModerator = false,
  handleWithGoogleClick,
  register,
  setValue,
  errors,
  bio,
  setBio,
}: SingUpUsernameProps) {
  const onFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFirstName(e.target.value);
  const onLastNameChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setLastName(e.target.value);
  const onEmailChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setEmail(e.target.value);
  const onPhoneChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setPhone(e.target.value);

  const onNextClick = () => {
    setFormNumber(2);
  };

  const errorStyle = "text-[.8rem] text-red-400";

  return (
    <div className="w-full flex-grow flex flex-col justify-start items-center">
      <PageHeader header={
        isOnly ? "Update" : "Register"
      } detail="Sign up and create your account." />
      {!isOnly && <UseGoogle clickAction={handleWithGoogleClick} />}
      <div className="w-full flex flex-col justify-start items-center flex-grow">
        <div className="w-full px-5 flex flex-col justify-start items-center">
          <ProfileImageInput register={register} setValue={setValue} image={image} setImage={setImage} />
          {errors.profile_img && <p className={errorStyle}>{errors.profile_img.message}</p>}
        </div>
        <Input
          label="First Name"
          placeholder="first_name"
          value={firstName}
          onChange={onFirstNameChange}
          register={register}
          errors={errors.first_name}
        />
        <Input
          label="Last Name"
          placeholder="last_name"
          value={lastName}
          onChange={onLastNameChange}
          register={register}
          errors={errors.last_name}
        />
        <Input
          label="Email"
          placeholder="email"
          value={email}
          onChange={onEmailChange}
          register={register}
          errors={errors.email}
        />
        <Input
          label="Phone"
          placeholder="phone_number"
          value={phone}
          onChange={onPhoneChange}
          register={register}
          errors={errors.phone_number}
        />
        {
          bio != undefined && (<DetailInput
            label="bio"
            placeholder="bio"
            value={bio}
            onChange={(e) => (setBio as any)(e.target.value)}
            register={register}
            errors={errors.bio}
          />)
        }
      </div>
      {
        isOnly ? (
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
        ) : (
          <WideLink
            label="Next"
            color="bg-content-color"
            clickAction={onNextClick}
          />
        )}
      <div className="w-full px-5 text-slate-400 text-[1rem] mb-10">
        Already have an account?{" "}
        <a href={forModerator ? moderatorLoginUrl : loginUrl} className="text-content-color font-[470]">
          Login now
        </a>
      </div>
    </div>
  );
}

export default SignUpUsername;
