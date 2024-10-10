import React from "react";
import google_logo from "../assets/icons/google-logo.png";

interface InputProps {
  label: string;
  placeholder: string;
  value: string | number | undefined;
  isPassword?: boolean;
  showPassword?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  instruction?: string;
  children?: React.ReactNode;
  register?: any
  errors?: any
  type?: "text" | "password" | "email" | "number";
  noPad?: boolean;
}

interface InputNumberProps {
  label: string;
  placeholder: string;
  value: string | number | undefined;
  isPassword?: boolean;
  showPassword?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  instruction?: string;
  children?: React.ReactNode;
  register?: any
  errors?: any
  type?: "text" | "password" | "email" | "number";
  noPad?: boolean;
}

interface UseGoogleProps {
  clickAction?: () => void;
}

function Input({ label, placeholder, value, isPassword, showPassword, onChange, instruction, children, register = (placeholder: string) => { }, errors, type = "text", noPad = false }: InputProps) {

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(e);
    }
  };

  const errorStyle = "text-[.8rem] text-red-400";

  return (
    <div className={`w-full ${!noPad && "px-5"} flex flex-col justify-start items-start gap-1 mb-6 relative`}>
      <label htmlFor={placeholder} className="text-[1rem] font-semibold">
        {label}
      </label>
      <div className="relative w-full">
        <input
          {...register(placeholder)}
          type={isPassword ? (showPassword ? "text" : "password") : type}
          placeholder={placeholder}
          id={placeholder}
          name={placeholder}
          value={value}
          onChange={handleChange}
          className={`w-full py-[10px] bg-[#F9FAFB] dark:bg-neutral-800 dark:border-neutral-700 leading-none text-[1rem] px-4 border outline-none rounded-lg border-[#D1D5DB]`}
        />
        {children}
        {errors && <p className={errorStyle}>{errors.message}</p>}
      </div>
      <p className="text-[.9rem] text-slate-400">
        {instruction}
      </p>
    </div>
  );
}

function InputNumber({ label, placeholder, value, isPassword, showPassword, onChange, instruction, children, register = (placeholder: string) => { }, errors, noPad = false }: InputProps) {

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(e);
    }
  };

  const errorStyle = "text-[.8rem] text-red-400";

  return (
    <div className={`w-full ${!noPad && "px-5"} flex flex-col justify-start items-start gap-1 mb-6 relative`}>
      <label htmlFor={placeholder} className="text-[1rem] font-semibold">
        {label}
      </label>
      <div className="relative w-full">
        <input
          {...register(placeholder)}
          type={"number"}
          placeholder={placeholder}
          id={placeholder}
          name={placeholder}
          value={value}
          onChange={handleChange}
          className={`w-full py-[10px] bg-[#F9FAFB] leading-none text-[1rem] px-4 border outline-none rounded-lg border-[#D1D5DB]`}
        />
        {children}
        {errors && <p className={errorStyle}>{errors.message}</p>}
      </div>
      <p className="text-[.9rem] text-slate-400">
        {instruction}
      </p>
    </div>
  );
}

// function UseGoogle({ clickAction }: UseGoogleProps) {
//   return (
//     <div className="w-full px-5 flex flex-col justify-start items-center gap-2 mt-3 mb-10">
//       <button className="w-full py-[12px] bg-[#F9FAFB] leading-none text-[1.1rem] px-4 border outline-none rounded-lg border-[#D1D5DB] flex justify-center items-center gap-2" onClick={clickAction}>
//         <img src={google_logo} alt="google-logo" className="w-[18px] h-[18px]" /> Continue with Google
//       </button>
//       <p className="text-[#6B7280]">or</p>
//     </div>
//   );
// }

export { Input, InputNumber };
