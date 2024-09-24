import React, { useEffect, useState } from "react";
import SignUpUsername from "./sub_pages/SignUpUsername";
import SignUpCreatePassword from "./sub_pages/SignUpCreatePassword";
import HealthConditions from "./sub_pages/HealthConditions";
import { set, useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { IUserSignUpFrom, EAllergies, EDietaryPreferences, EChronicDisease, IUserUpdateFrom } from "../api/types/user.type";
import { useGetUserQuery, useSignUpMutation, useUpdateUserMutation } from "../api/slices/user.slices";
import * as Bytescale from "@bytescale/sdk";
import { useNavigate } from "react-router-dom";
import { signUpSchema, updateUserSchema } from "../validation/user.validation";
import { homeUrl } from "../assets/data";
import useFileUpload from "../hooks/useFileUpload";
import ErrorPopup from "../components/ErrorPopup";


function EditUserInfo() {

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

  const navigate = useNavigate();

  const { data: user, isLoading: userIsLoading } = useGetUserQuery();

  const [update, { isLoading }] = useUpdateUserMutation();
  const { uploadFile, loading } = useFileUpload();

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const { register, handleSubmit, formState: { errors }, setError, setValue, getValues } = useForm<IUserUpdateFrom>({
    resolver: zodResolver(updateUserSchema),
  });

  useEffect(() => {
    if (!user) return;
    setValue("email", user.email);
    setEmail(user.email);
    setValue("first_name", user.first_name);
    setFirstName(user.first_name);
    setValue("last_name", user.last_name);
    setLastName(user.last_name);
    setValue("phone_number", user.phone_number);
    setPhone(user.phone_number);
    setValue("profile_img", user.profile_img);

  }, [user]);

  console.log({ errors });


  async function Update(user: IUserUpdateFrom) {
    console.log("Update up in...");
    console.log({ user });

    // try {
    //   const file = user.profile_img;
    //   const fileUrl = await uploadFile(file as any);

    //   await signUp({
    //     data: {
    //       ...user,
    //       profile_img: fileUrl,
    //       medical_condition: {
    //         chronicDiseases: healthCondition.length == 0 ? [EChronicDisease.none] : healthCondition,
    //         allergies: allergy.length == 0 ? [EAllergies.none] : allergy,
    //         dietary_preferences: mealPreference.length == 0 ? [EDietaryPreferences.none] : mealPreference
    //       }
    //     }
    //   }).unwrap();

    //   navigate(`/user/${homeUrl}`);

    // } catch (error: any) {
    //   if (!error.data.error) return;
    //   const err = error.data.error;
    //   if (err.type === "Validation")
    //     setError(err.attr, { message: err.error });
    // }
  }


  const handleWithGoogleClick = () => { };

  const formatErrors = (): string | null => {
    const errorMessages: string[] = [];
    const pageErrors: { [key: number]: string[] } = {
      1: [],
      2: [],
      3: [],
    };

    const addErrorToPage = (page: number, field: string) => {
      pageErrors[page].push(field);
    };

    if (errors.profile_img) addErrorToPage(1, "profile image");
    if (errors.first_name) addErrorToPage(1, "first name");
    if (errors.last_name) addErrorToPage(1, "last name");
    if (errors.email) addErrorToPage(1, "email");
    if (errors.phone_number) addErrorToPage(1, "phone number");

    if (errors.password) addErrorToPage(2, "password");
    if (errors.confirm_password) addErrorToPage(2, "confirm password");

    if (errors.medical_condition?.chronicDiseases)
      addErrorToPage(3, "chronic diseases");
    if (errors.medical_condition?.allergies) addErrorToPage(3, "allergies");
    if (errors.medical_condition?.dietary_preferences)
      addErrorToPage(3, "dietary preferences");

    // Format error messages
    Object.entries(pageErrors).forEach(([page, fields]) => {
      if (fields.length > 0) {
        errorMessages.push(`Errors on Page ${page}: ${fields.join(", ")}`);
      }
    });

    return errorMessages.length > 0 ? errorMessages.join(". ") : null;
  };

  useEffect(() => {
    const formattedError = formatErrors();
    setErrorMessage(formattedError);
  }, [errors]);


  return (
    <form className="w-full flex-grow flex flex-col justify-start items-center" onSubmit={handleSubmit(Update)}>

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
        isLoading={isLoading}
        isOnly={true}
      />
      <ErrorPopup error={errorMessage} />
    </form>
  );
}

export default EditUserInfo;
