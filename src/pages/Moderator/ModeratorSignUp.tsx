import React, { useEffect, useState } from "react";
import SignUpUsername from "../sub_pages/SignUpUsername";
import SignUpCreatePassword from "../sub_pages/SignUpCreatePassword";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  IUserSignUpFrom,
} from "../../api/types/user.type";

import { useNavigate } from "react-router-dom";
import { signUpSchema } from "../../validation/user.validation";
import { moderatorHomeUrl } from "../../assets/data";
import useFileUpload from "../../hooks/useFileUpload";
import ErrorPopup from "../../components/ErrorPopup";
import { useModeratorSignUpMutation } from "../../api/slices/moderator.slices";
import { IModeratorSignUpFrom } from "../../api/types/moderator.type";

function ModeratorSignUp() {
  // Form navigator state
  const [formNumber, setFormNumber] = useState(1);

  // For form sign up username
  const [image, setImage] = useState<string | null>(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [bio, setBio] = useState("");


  // For form sign up create password
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");


  const navigate = useNavigate();

  const [signUp, { isLoading }] = useModeratorSignUpMutation();
  const { uploadFile, loading } = useFileUpload();

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    setValue,
  } = useForm<IModeratorSignUpFrom>({
    resolver: zodResolver(signUpSchema),
  });

  console.log({ errors });

  async function SignUp(user: IModeratorSignUpFrom) {
    console.log("signing up in...");

    try {
      const file = user.profile_img;
      const fileUrl = await uploadFile(file as any);

      await signUp({
        data: {
          ...user,
          bio,
          profile_img: fileUrl,
        },
      }).unwrap();
      navigate(moderatorHomeUrl);
    } catch (error: any) {
      if (!error.data.error) return;
      const err = error.data.error;
      if (err.type === "Validation") setError(err.attr, { message: err.error });
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
    <form
      className="w-full flex-grow flex flex-col justify-start items-center"
      onSubmit={handleSubmit(SignUp)}
    >
      {formNumber === 1 ? (
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
          forModerator={true}
          handleWithGoogleClick={handleWithGoogleClick}
          bio={bio}
          setBio={setBio}
          errors={errors}
        />
      ) : (
        <SignUpCreatePassword
          setFormNumber={setFormNumber}
          password={password}
          setPassword={setPassword}
          confirmPassword={confirmPassword}
          setConfirmPassword={setConfirmPassword}
          register={register}
          errors={errors}
          forModerator={true}
          isLoading={isLoading}
          handleWithGoogleClick={handleWithGoogleClick}
        />
      )}
      <ErrorPopup error={errorMessage} />
    </form>
  );
}

export default ModeratorSignUp;
