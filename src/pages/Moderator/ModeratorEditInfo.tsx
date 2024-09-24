import React, { useEffect, useState } from "react";
import SignUpUsername from "../sub_pages/SignUpUsername";
import SignUpCreatePassword from "../sub_pages/SignUpCreatePassword";
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { IUserSignUpFrom, EAllergies, EDietaryPreferences, EChronicDisease } from "../../api/types/user.type";
import { useSignUpMutation } from "../../api/slices/user.slices";
import * as Bytescale from "@bytescale/sdk";
import { useNavigate } from "react-router-dom";
import { signUpSchema } from "../../validation/user.validation";
import { homeUrl } from "../../assets/data";
import useFileUpload from "../../hooks/useFileUpload";
import ErrorPopup from "../../components/ErrorPopup";


function ModeratorEditInfo() {
  // Form navigator state
  const [formNumber, setFormNumber] = useState(1);

  // For form sign up username
  const [image, setImage] = useState<string | undefined | null>(null);
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

  const [signUp, { isLoading }] = useSignUpMutation();
  const { uploadFile, loading } = useFileUpload();

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const { register, handleSubmit, formState: { errors }, setError, setValue, getValues } = useForm<IUserSignUpFrom>({
    resolver: zodResolver(signUpSchema),
  });

  console.log({ errors });


  async function SignUp(user: IUserSignUpFrom) {
    console.log("signing up in...");

    try {
      const file = user.profile_img;
      const fileUrl = await uploadFile(file as any);

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

      navigate(`/user/${homeUrl}`);

    } catch (error: any) {
      if (!error.data.error) return;
      const err = error.data.error;
      if (err.type === "Validation")
        setError(err.attr, { message: err.error });
    }
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
    <form className="w-full flex-grow flex flex-col justify-start items-center" onSubmit={handleSubmit(SignUp)}>
      {formNumber !== 1 ? (
        <SignUpCreatePassword
          setFormNumber={setFormNumber}
          password={password}
          setPassword={setPassword}
          confirmPassword={confirmPassword}
          setConfirmPassword={setConfirmPassword}
          register={register}
          errors={errors}
          forModerator={true}
          handleWithGoogleClick={handleWithGoogleClick}
        />
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
      <ErrorPopup error={errorMessage} />
    </form>
  );
}

export default ModeratorEditInfo;
