import React from "react";

interface DetailInputProps {
  label: string;
  placeholder: string;
  value: string;
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  noPad?: boolean;
  register?: any;
  errors?: any;
}

function DetailInput({
  label,
  placeholder,
  value,
  onChange,
  noPad=false,
  register = (placeholder: string) => { },
  errors,
}: DetailInputProps) {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (onChange) {
      onChange(e);
    }
  };

  const errorStyle = "text-[.8rem] text-red-400";

  return (
    <div className={`w-full ${!noPad ? "px-5" : "px-2"} flex flex-col justify-start items-start gap-1 mb-6 relative`}>
      <label htmlFor={placeholder} className="text-[1rem] font-semibold">
        {label}
      </label>
      <textarea
        {...register(placeholder)}
        name={placeholder}
        rows={8}
        cols={50}
        placeholder={placeholder}
        id={placeholder}
        value={value}
        className={`border border-[#D1D5DB] dark:bg-neutral-800 dark:border-neutral-700 pt-3 outline-none w-full px-4 rounded-lg text-gray-600`}
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        onChange={handleChange}
      />
      {errors && <p className={errorStyle}>{errors.message}</p>}
    </div>
  );
}

export default DetailInput;
