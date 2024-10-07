import React, { useEffect, useState } from "react";
import SignUpUsername from "./sub_pages/SignUpUsername";
import SignUpCreatePassword from "./sub_pages/SignUpCreatePassword";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  IUserSignUpFrom,
} from "../api/types/user.type";

import { useNavigate } from "react-router-dom";
import { signUpSchema } from "../validation/user.validation";
import { moderatorHomeUrl } from "../assets/data";
import useFileUpload from "../hooks/useFileUpload";
import ErrorPopup from "../components/ErrorPopup";
import { useModeratorSignUpMutation } from "../api/slices/moderator.slices";
import { IModeratorSignUpFrom } from "../api/types/moderator.type";
import VerifyEmail from "./VerifyEmail";
import { Input } from "../components/Input";

function ChangePassword() {
  // Form navigator state
  const [formNumber, setFormNumber] = useState(1);

  // For form sign up username
  const [otp, setOtp] = useState("");

  const [email, setEmail] = useState("");


  // For form sign up create password
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");


  const navigate = useNavigate();

  const [signUp, { isLoading }] = useModeratorSignUpMutation();

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
  }

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
  const onEmailChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setEmail(e.target.value);

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
        <>
          <div className="pt-8"></div>
          <Input
            label="Email"
            placeholder="email"
            value={email}
            onChange={onEmailChange}
            register={register}
            errors={errors.email}
          />
          <VerifyEmail
            setFormNumber={setFormNumber}
            email={email}
            otp={otp}
            setOtp={setOtp}
            forModerator={true}
          />
        </>
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
          second={true}
        />
      )}
      <ErrorPopup error={errorMessage} />
    </form>
  );
}

export default ChangePassword;
