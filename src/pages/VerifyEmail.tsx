import React, { useEffect, useState } from 'react';
import PageHeader from '../components/PageHeader';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "../components/ui/input-otp";
import WideLink from '../components/WideLink';
import { loginUrl, moderatorLoginUrl } from '../assets/data';

interface VerifyEmailProps {
  setFormNumber: React.Dispatch<React.SetStateAction<number>>;
  email: string;
  otp: string;
  setOtp: React.Dispatch<React.SetStateAction<string>>;
  forModerator?: boolean;
}

function VerifyEmail({ setFormNumber, email, otp, setOtp, forModerator=false }: VerifyEmailProps) {
  const temp = "123456"; // Dummy OTP value
  const [error, setError] = useState("");

  //to reset the error message to empty when user start to change otp value
  useEffect(() => {
    setError("");
  }, [otp]);

  // Helper function to shorten the email
  const shortenEmail = (email: string) => {
    const [name, domain] = email.split('@');
    if (name.length > 4) {
      return `${name.slice(0, 2)}...${name.slice(-1)}@${domain}`;
    }
    return email;
  };

  // Function to handle "Next" button click
  const onNextClick = () => {
    if (otp === temp) {
      // If OTP matches, proceed
      setError(""); // Clear error
      setFormNumber(3);
    } else {
      // If OTP doesn't match, show error
      setError("Invalid verification code. Please try again.");
    }
  };

  // Function to update OTP value
  const handleOtpChange = (value: string) => {
    setOtp(value);
  };

  return (
    <div className='w-full flex-grow flex flex-col justify-start items-start'>
      <PageHeader header='Verify Email' detail='Enter the code sent to your email' />
      <div className='w-full px-5 flex-grow flex flex-col justify-start items-center gap-2 pt-3'>
        <div className='px-4 py-6 bg-gray-50 dark:bg-neutral-800 flex flex-col justify-center items-start gap-2 rounded-lg'>
          <p className='text-[1rem] italic text-slate-400'>
            Verification code sent to <span className='text-slate-500 font-semibold'>{shortenEmail(email)}</span>
          </p>
          <InputOTP maxLength={6} value={otp} onChange={handleOtpChange}>
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
            </InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup>
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
          {/* Error message */}
          {error && <p className="text-red-500 text-sm leading-none -my-1">{error}</p>}
          <p className='flex justify-start items-center text-blue-500 underline select-none cursor-pointer'>Resend code</p>
        </div>
      </div>
      <div className="w-full px-5 flex justify-center items-end gap-2">
        <WideLink label="Back" color="dark:bg-neutral-900 bg-white" outline={true} clickAction={() => setFormNumber(1)} />
        <WideLink label="Next" color="bg-content-color" clickAction={onNextClick} />
      </div>
      <div className="w-full px-5 text-slate-400 text-[1rem] mb-10">
        Already have an account?{" "}
        <a href={ forModerator ? moderatorLoginUrl : loginUrl } className="text-content-color font-[470]">
          Login now
        </a>
      </div>
    </div>
  );
}

export default VerifyEmail;