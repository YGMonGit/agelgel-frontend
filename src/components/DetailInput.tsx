import React from "react";

interface DetailInputProps {
  label: string;
  placeholder: string;
  value: string;
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

function DetailInput({
  label,
  placeholder,
  value,
  onChange,
}: DetailInputProps) {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (onChange) {
      onChange(e);
    }
  };

  return (
    <div className="w-full px-5 flex flex-col justify-start items-start gap-1 mb-6 relative">
      <label htmlFor={placeholder} className="text-[1rem] font-semibold">
        {label}
      </label>
      <textarea
        name={placeholder}
        rows={8}
        cols={50}
        placeholder={placeholder}
        id={placeholder}
        value={value}
        className={`border border-[#D1D5DB] pt-3 outline-none w-full px-4 rounded-lg text-gray-600`}
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        onChange={handleChange}
      ></textarea>
    </div>
  );
}

export default DetailInput;