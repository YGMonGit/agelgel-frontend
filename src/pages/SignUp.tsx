import React, { useState } from "react";
import SignUpUsername from "./sub_pages/SignUpUsername";
import SignUpCreatePassword from "./sub_pages/SignUpCreatePassword";
import HealthConditions from "./sub_pages/HealthConditions";
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { EChronicDisease,EAllergies,EDietaryPreferences,IUserSignUpFrom } from "../api/types/user.type";
import { useSignUpMutation } from "../api/slices/user.slices";
import * as Bytescale from "@bytescale/sdk";


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

  const fileSchema = z
  .any()
  .refine((file) => file == null, {
    message: "Profile image is required.",
  });

  const signUpSchema = z.object({
  //   email: z.string()
  //   .email({ message: "Please enter a valid email address." })
  //   .nonempty({ message: "Email is required." }),
  // password: z.string()
  //   .min(8, { message: "Password must be at least 8 characters long." })
  //   .nonempty({ message: "Password is required." }),
    first_name: z.string().nonempty({ message: "first Name is required." }),
    last_name: z.string().nonempty({ message: "last Name is required." }),
    phone_number: z.string().nonempty({ message: "phone Number is required." }),
    profile_img: z.any().refine((file) => file != null, {
      message: "Profile image is required.",
    }),
    // medical_condition: z.object({
    //   chronicDiseases: z.array(z.nativeEnum(EChronicDisease)),
    //   allergy: z.array(z.nativeEnum(EAllergies)),
    //   dietary_preferences: z.array(z.nativeEnum(EDietaryPreferences)),
    // }),
  });

  const { register, handleSubmit, formState: { errors }, setError,setValue } = useForm<IUserSignUpFrom>({
    resolver: zodResolver(signUpSchema),
  });
  
  console.log({errors});

  const _handleSubmit = async (data: any) => {};

  const [signUp] = useSignUpMutation();


  async function SignUp(user: IUserSignUpFrom) {
    console.log("signing up in...");

    const uploadManager = new Bytescale.UploadManager({
      apiKey: process.env.REACT_APP_BYTESCLE??""
    });

    try {
      const file = user.profile_img;
      const { fileUrl, filePath } = await uploadManager.upload({ data: file as any });
      console.log(file,fileUrl, filePath);
      const data = await signUp({ data: {...user,profile_img:fileUrl} }).unwrap();
      console.log(data);
    } catch (error:any) {
      if (!error.data.error) return;
        const err = error.data.error;
        if (err.type === "Validation")
          setError("email", { message: err.msg });

    }
  }

  const handleWithGoogleClick = () => {};


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
            setHealthCondition={setHealthCondition}
            allergy={allergy}
            setAllergy={setAllergy}
            mealPreference={mealPreference}
            setMealPreference={setMealPreference}
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
