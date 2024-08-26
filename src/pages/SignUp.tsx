import React, { useState } from "react";
import SignUpUsername from "./sub_pages/SignUpUsername";
import SignUpCreatePassword from "./sub_pages/SignUpCreatePassword";
import HealthConditions from "./sub_pages/HealthConditions";
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { IUserSignUpFrom, EAllergies, EDietaryPreferences, EChronicDisease } from "../api/types/user.type";
import { useSignUpMutation } from "../api/slices/user.slices";
import * as Bytescale from "@bytescale/sdk";
import { useNavigate } from "react-router-dom";
import { signUpSchema } from "../validation/user.validation";
import { homeUrl } from "../assets/data";


function SignUp() {
  // Form navigator state
  const [formNumber, setFormNumber] = useState(1);

  // For form sign up username
  const [image, setImage] = useState<string | null>(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  // For form sign up create password
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // For form sign up health conditions
  const [healthCondition, setHealthCondition] = useState<EChronicDisease[]>([]);
  const [allergy, setAllergy] = useState<EAllergies[]>([]);
  const [mealPreference, setMealPreference] = useState<EDietaryPreferences[]>([]);

  const navigate = useNavigate();

  const [signUp, {isLoading}] = useSignUpMutation();

  const { register, handleSubmit, formState: { errors }, setError, setValue, getValues } = useForm<IUserSignUpFrom>({
    resolver: zodResolver(signUpSchema),
  });

  console.log({ errors });


  async function SignUp(user: IUserSignUpFrom) {
    console.log("signing up in...");

    const uploadManager = new Bytescale.UploadManager({
      apiKey: process.env.REACT_APP_BYTESCLE ?? ""
    });

    try {
      const file = user.profile_img;
      const { fileUrl } = await uploadManager.upload({ data: file as any });

      await signUp({
        data: {
          ...user,
          profile_img: fileUrl,
          medical_condition: {
            chronicDiseases: healthCondition.length == 0 ? [EChronicDisease.none] : healthCondition,
            allergies: allergy.length == 0 ? [EAllergies.none] : allergy,
            dietary_preferences: mealPreference.length == 0 ? [EDietaryPreferences.none] : mealPreference
          }
        }
      }).unwrap();
      navigate(homeUrl);
    } catch (error: any) {
      if (!error.data.error) return;
      const err = error.data.error;
      if (err.type === "Validation")
        setError(err.attr, { message: err.error });
    }
  }

  async function _handleSubmit() { }

  const handleWithGoogleClick = () => { };


  return (
    <form className="w-full flex-grow flex flex-col justify-start items-center" onSubmit={handleSubmit(SignUp)}>
      {formNumber !== 1 ? (
        formNumber === 2 ? (
          <SignUpCreatePassword
            setFormNumber={setFormNumber}
            password={password}
            setPassword={setPassword}
            confirmPassword={confirmPassword}
            setConfirmPassword={setConfirmPassword}
            register={register}
            errors={errors}
            handleWithGoogleClick={handleWithGoogleClick}
          />
        ) : (
          <HealthConditions
            setFormNumber={setFormNumber}
            healthCondition={healthCondition}
            setHealthCondition={setHealthCondition}
            allergies={allergy}
            setAllergies={setAllergy}
            mealPreference={mealPreference}
            setMealPreference={setMealPreference}
            isLoading={isLoading}
          />
        )
      ) : (
        <SignUpUsername
          setFormNumber={setFormNumber}
          image={image}
          setImage={setImage}
          firstName={firstName}
          setFirstName={setFirstName}
          lastName={lastName}
          setLastName={setLastName}
          email={email}
          setEmail={setEmail}
          phone={phone}
          setPhone={setPhone}
          register={register}
          setValue={setValue}
          handleWithGoogleClick={handleWithGoogleClick}
          errors={errors}
        />
      )}
    </form>
  );
}

export default SignUp;
