import React, { useState, useEffect, useRef } from 'react';
import { FaStarOfLife } from "react-icons/fa6";
import { IIngredient } from '../api/types/ingredient.type';

interface DropdownInputProps {
  usedFor: string;
  boxLabel: string;
  wFull?: boolean;
  value: any;
  onChange: any
  onClick: any;
  validationClass?: string;
  data: IIngredient[];
  mustFill?: boolean;
  register?: any
  errors?: any
  ingredientSearch: string;
  setIngredientSearch: any;
}

const DropdownInput: React.FC<DropdownInputProps> = ({
  usedFor,
  boxLabel,
  wFull = false,
  value,
  onChange,
  validationClass,
  data,
  onClick,
  mustFill = false,
  register = (placeholder: string) => { },
  errors,
  ingredientSearch,
  setIngredientSearch

}) => {
  const [isOpen, setIsOpen] = useState(false);
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
    setIngredientSearch(e.target.value);
    onChange(e);
    setIsOpen(true);
  };

  const handleOptionClick = (option: any) => {
    onClick(option);
    setIngredientSearch(option.name);
    setIsOpen(false);
  };

  const filteredOptions = data.filter(option =>
    option.name.toLowerCase().includes(ingredientSearch.toLowerCase())
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

  const errorStyle = "text-[.8rem] text-red-400";

  return (
    <div className="relative flex flex-col justify-center items-start w-full px-5" ref={dropdownRef}>
      <label
        className="flex justify-start items-center leading-none font-semibold mb-3 text-[1.2rem]"
        htmlFor={usedFor}
        // style={{ background: "white" }}
      >
        Ingredients
      </label>
      <input
        className={`w-full py-[10px] bg-[#F9FAFB] dark:bg-neutral-800 leading-none text-[1rem] px-4 border outline-none rounded-lg border-[#D1D5DB] dark:border-neutral-700`}
        // {...register(usedFor)}
        type="text"
        id={usedFor}
        name={usedFor}
        value={ingredientSearch}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={handleInputChange}
        autoComplete='off'
      />
      {errors && <p className={errorStyle}>{errors.message}</p>}
      {isOpen && (
        <div className='w-full px-8 relative'>
          <ul className="absolute top-full rounded-b-lg left-0 w-full px-5 bg-[#F9FAFB] dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 shadow-lg border-t-transparent max-h-40 overflow-y-auto z-10">
            {filteredOptions.map((option, index) => (
              <li
                key={index}
                id={option._id}
                className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-neutral-700 cursor-pointer"
                onClick={() => handleOptionClick(option)}
              >
                {option.name}  ({option.localName})
              </li>
            ))}
            <li
              className={`${filteredOptions.length && "hidden"} px-4 py-1 bg-gray-50 cursor-default text-[.9rem] text-neutral-300`}
            >
              No result
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default DropdownInput;