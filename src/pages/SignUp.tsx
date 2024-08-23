import React, { useState } from "react";
import SignUpUsername from "./sub_pages/SignUpUsername";
import SignUpCreatePassword from "./sub_pages/SignUpCreatePassword";
import HealthConditions from "./sub_pages/HealthConditions";
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { IUserSignUpFrom } from "../api/types/user.type";
import { useSignUpMutation } from "../api/slices/user.slices";
import * as Bytescale from "@bytescale/sdk";
import { useNavigate } from "react-router-dom";
import { signUpSchema } from "../validation/user.validation";
import { homeUrl } from "../assets/data";


function SignUp() {
  // Form navigator state
  const [formNumber, setFormNumber] = useState(1);

  // For form sign up username
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");

  // For form sign up create password
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // For form sign up health conditions
  const [healthCondition, setHealthCondition] = useState<string[]>([]);
  const [allergy, setAllergy] = useState<string[]>([]);
  const [mealPreference, setMealPreference] = useState<string[]>([]);

  const navigate = useNavigate();

  const [signUp] = useSignUpMutation();

  const { register, handleSubmit, formState: { errors }, setError, setValue, getValues } = useForm<IUserSignUpFrom>({
    resolver: zodResolver(signUpSchema),
  });


  async function SignUp(user: IUserSignUpFrom) {
    console.log("signing up in...");

    const uploadManager = new Bytescale.UploadManager({
      apiKey: process.env.REACT_APP_BYTESCLE ?? ""
    });

    try {
      const file = user.profile_img;
      const { fileUrl } = await uploadManager.upload({ data: file as any });
      await signUp({ data: { ...user, profile_img: fileUrl } }).unwrap();
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
    <div className="w-full flex-grow flex flex-col justify-start items-center">
      {formNumber !== 1 ? (
        formNumber === 2 ? (
          <SignUpCreatePassword
            setFormNumber={setFormNumber}
            password={password}
            setPassword={setPassword}
            confirmPassword={confirmPassword}
            setConfirmPassword={setConfirmPassword}
            handleWithGoogleClick={handleWithGoogleClick}
          />
        ) : (
          <HealthConditions
            healthCondition={healthCondition}
            setHealthCondition={(value) => {
              setValue("medical_condition.chronicDiseases", [...getValues().medical_condition.chronicDiseases, value as any]);
              setHealthCondition(value);
            }}
            allergy={allergy}
            setAllergy={
              (value) => {
                setValue("medical_condition.allergies", [...getValues().medical_condition.allergies, value as any]);
                setAllergy(value);
              }
            }
            mealPreference={mealPreference}
            setMealPreference={
              (value) => {
                setValue("medical_condition.dietary_preferences", [...getValues().medical_condition.dietary_preferences, value as any]);
                setMealPreference(value);
              }
            }
            register={register}
            handleSubmit={_handleSubmit}
          />
        )
      ) : (
        <>
          <form onSubmit={handleSubmit(SignUp)}>
            <SignUpUsername
              setFormNumber={setFormNumber}
              firstName={firstName}
              setFirstName={setFirstName}
              lastName={lastName}
              setLastName={setLastName}
              phone={phone}
              setPhone={setPhone}
              handleSubmit={_handleSubmit}
              register={register}
              setValue={setValue}

              handleWithGoogleClick={handleWithGoogleClick}


            />

            <button type="submit">Submit</button>
          </form>
        </>
      )}
    </div>
  );
}

export default SignUp;
