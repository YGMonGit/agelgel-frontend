import React, { useState, useEffect, useRef } from 'react';
import { FaStarOfLife } from "react-icons/fa6";

interface DropdownInputProps {
  usedFor: string;
  boxLabel: string;
  wFull?: boolean;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement> | { target: { value: string } }) => void;
  validationClass?: string;
  data: string[];
  mustFill?: boolean;
}

const DropdownInput: React.FC<DropdownInputProps> = ({
  usedFor,
  boxLabel,
  wFull = false,
  value,
  onChange,
  validationClass,
  data,
  mustFill = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [value]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    onChange(e);
    setIsOpen(true);
  };

  const handleOptionClick = (option: string) => {
    onChange({ target: { value: option } });
    setSearchTerm('');
    setIsOpen(false);
  };

  const filteredOptions = data.filter(option =>
    option.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const [isFocused, setIsFocused] = useState(false);
  const [isNotEmpty, setIsNotEmpty] = useState(false);
  const [borderColor, setBorderColor] = useState(
    value === "" ? "border-neutral-400" : "border-neutral-500"
  );

  const handleFocus = () => {
    setIsFocused(true);
    setBorderColor("border-neutral-500");
    setIsOpen(true);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(false);
    setIsNotEmpty(e.target.value !== "");
    setBorderColor("border-neutral-400");
  };

  return (
    <div className={`relative bg-red-30 w-[91%] ${wFull ? "" : "md:w-[30%]"}`} ref={dropdownRef}>
      <input
        className={`peer w-full h-[35px] text-[.8rem] py-1 px-4 ${isFocused ? "rounded-t-sm border-t border-l border-r": "rounded-sm border"} ${filteredOptions.length === 0 && "rounded-xl bg-red-200"} outline-none ${borderColor} ${
          !isFocused && isNotEmpty ? validationClass : ""
        }`}
        type="text"
        id={usedFor}
        name={usedFor}
        value={value}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={handleInputChange}
        autoComplete='off'
        required
      />
      <label
        className="absolute flex justify-start items-center leading-none top-1/2 left-4 -translate-y-1/2 text-base pointer-events-none transition-all duration-300 peer-focus:top-0 peer-focus:text-sm peer-focus:px-2 peer-focus:bg-white peer-valid:top-0 peer-valid:text-sm peer-valid:px-2 peer-valid:bg-white text-neutral-400"
        htmlFor={usedFor}
        style={{ background: "white" }}
      >
        {boxLabel}<span className="text-red-500 text-[.3rem] ml-1">{mustFill && <FaStarOfLife />}</span>
      </label>
      {isOpen && (
        <ul className="absolute top-full left-0 w-full bg-white border border-gray-500 border-t-neutral-300 rounded-b-sm max-h-40 overflow-y-auto z-10">
          {filteredOptions.map((option, index) => (
            <li
              key={index}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </li>
          ))}
          <li
            className={`${filteredOptions.length && "hidden"} px-4 py-1 bg-gray-50 cursor-default text-[.9rem] text-neutral-300`}
          >
            No result
          </li>
        </ul>
      )}
    </div>
  );
};

export default DropdownInput;