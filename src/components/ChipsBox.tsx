import React, { useRef, useEffect, useState } from "react";
import { TextField, Chip, Autocomplete, IconButton } from "@mui/material";
import { IoIosClose } from "react-icons/io";

interface ChipsBoxProps {
  label: string;
  name: string;
  options: string[];
  detail?: string;
  selectedConditions: string[];
  setSelectedConditions: React.Dispatch<React.SetStateAction<any[]>>;
  errors?: any;
  register?: any;
}

const ChipsBox: React.FC<ChipsBoxProps> = ({
  label,
  name,
  options,
  detail,
  selectedConditions,
  setSelectedConditions,
  errors,
  register = (placeholder: string) => { },
}) => {
  const [inputValue, setInputValue] = React.useState("");
  const [chipAdded, setChipAdded] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollableDivRef = useRef<HTMLDivElement>(null);

  const handleDelete = (conditionToDelete: string) => {
    setSelectedConditions((conditions) =>
      conditions.filter((condition) => condition !== conditionToDelete)
    );
    setChipAdded(false); // Indicate that a chip was not added
  };

  const handleAddCondition = () => {
    if (inputValue && options.includes(inputValue) && !selectedConditions.includes(inputValue)) {
      setSelectedConditions([...selectedConditions, inputValue]);
      setInputValue("");
      setChipAdded(true); // Indicate that a chip was added
    }
  };

  const handleWheel = (event: React.WheelEvent<HTMLDivElement>) => {
    const wheelDelta = Math.max(-1, Math.min(1, event.deltaY || -event.detail));
    if (scrollableDivRef.current) {
      scrollableDivRef.current.scrollLeft += wheelDelta * 30;
    }
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.width = inputValue
        ? `${inputValue.length + 1}ch`
        : "10ch";
    }
  }, [inputValue]);

  useEffect(() => {
    if (scrollableDivRef.current && chipAdded) {
      scrollableDivRef.current.scrollLeft = scrollableDivRef.current.scrollWidth;
    }
  }, [selectedConditions, chipAdded]);

  const errorStyle = "text-[.8rem] text-red-400";


  return (
    <div className="w-full px-5 mb-6">
      <h2 className="text-[1.1rem] mb-[6px] font-semibold">{label}</h2>
      <div
        className="flex items-center leading-none overflow-x-auto w-full px-[6px] border rounded-xl border-neutral-300 dark:border-neutral-700"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        ref={scrollableDivRef}
        onWheel={handleWheel}
      >
        {selectedConditions.map((condition, index) => (
          <Chip
            key={index}
            label={condition}
            onDelete={() => handleDelete(condition)}
            sx={{
              margin: "0 4px",
              borderRadius: "8px",
              backgroundColor: "#F3F4F6",
            }}
            className="dark:bg-neutral-800 dark:text-white"
            deleteIcon={
              <span className="text-[1.2rem] text-neutral-100 mx-2 cursor-pointer">
                <IoIosClose className="text-neutral-500" />
              </span>
            }
          />
        ))}
        <Autocomplete
          freeSolo
          options={options.filter(
            (option) => !selectedConditions.includes(option)
          )}
          inputValue={inputValue}
          onInputChange={(_, newInputValue, reason) => {
            if (reason !== "reset") {
              setInputValue(newInputValue);
            }
          }}
          onChange={(_, newValue) => {
            if (typeof newValue === 'string' && options.includes(newValue) && !selectedConditions.includes(newValue)) {
              setSelectedConditions([...selectedConditions, newValue]);
              setInputValue("");
              setChipAdded(true); // Indicate that a chip was added
            }
          }}
          renderInput={(params) => (
            <TextField
              {...register(name)}
              {...params}
              inputRef={inputRef}
              placeholder="Add here..."
              sx={{
                margin: "0",
                "& .MuiOutlinedInput-notchedOutline": {
                  border: "none",
                },
                "& input": {
                  width: "inherit",
                  minWidth: "10ch",
                  color: "#94a3b8",
                  "::placeholder": {
                    color: "#64748b", // This sets the placeholder color
                  },
                },
              }}
              className="flex justify-start items-center w-[150px]"
              InputProps={{
                ...params.InputProps,
                endAdornment: inputValue && options.includes(inputValue) ? (
                  <div onClick={handleAddCondition} className="hover:bg-gray-100 w-5 h-5 flex justify-center items-center rounded-full text-[1.1rem] leading-none cursor-pointer">
                    +
                  </div>
                ) : null,
              }}
            />
          )}
        />
      </div>
      {errors && <p className={errorStyle}>{errors.message}</p>}
      {detail && (
        <h2 className="text-[.9rem] font-normal text-slate-500 mt-1 leading-5">
          {detail}
        </h2>
      )}
    </div>
  );
};

export default ChipsBox;