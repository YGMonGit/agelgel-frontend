import React, { useEffect, useState } from "react";
import SignUpUsername from "./sub_pages/SignUpUsername";
import SignUpCreatePassword from "./sub_pages/SignUpCreatePassword";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  IUserSignUpFrom,
} from "../api/types/user.type";

import { useNavigate } from "react-router-dom";
import { forgotPasswordSchema, signUpSchema } from "../validation/user.validation";
import { homeUrl, moderatorHomeUrl } from "../assets/data";
import useFileUpload from "../hooks/useFileUpload";
import ErrorPopup from "../components/ErrorPopup";
import { useModeratorSignUpMutation } from "../api/slices/moderator.slices";
import { IModeratorSignUpFrom } from "../api/types/moderator.type";
import VerifyEmail from "./VerifyEmail";
import { Input } from "../components/Input";
import { useForgotPasswordMutation, useSendEmailOtpMutation } from "../api/slices/user.slices";
import { Button } from "@mui/material";

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

  const [SendEmail, { isLoading }] = useSendEmailOtpMutation();
  const [ForgotPassword, { isLoading: forgotPasswordLoading }] = useForgotPasswordMutation();

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    setValue,
  } = useForm<IModeratorSignUpFrom>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  console.log({ errors });

  async function sendEmail(user: IModeratorSignUpFrom) {
    console.log("hello");
    
    try {
      await SendEmail({ email: email });
      // setFormNumber(2);
    } catch (error) {
      console.error("Failed to send email:", error);
      setError("email", {
        type: "manual",
        message: "Failed to send email",
      });
    }
  }

  async function forgotPassword(user: IModeratorSignUpFrom) {
    try {
      await ForgotPassword({ email: email, otp: otp, password: password });
      navigate(homeUrl);
    } catch (error) {
      console.error("Failed to change password:", error);
      setError("email", {
        type: "manual",
        message: "Failed to change password",
      });
    }
  }

  const formatErrors = (): string | null => {
    const errorMessages: string[] = [];
    const pageErrors: { [key: number]: string[] } = {
      1: [],
    };

    const addErrorToPage = (page: number, field: string) => {
      pageErrors[page].push(field);
    };

    if (errors.password) addErrorToPage(1, "password");
    if (errors.confirm_password) addErrorToPage(1, "confirm password");


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
      onSubmit={handleSubmit(forgotPassword)}
    >
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
            click={sendEmail as any}
          />
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
            singleBtn={true}
          />
        </>
      <ErrorPopup error={errorMessage} />
    </form>
  );
}

export default ChangePassword;
