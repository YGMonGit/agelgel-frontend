import React, { useRef, useEffect } from "react";
import { TextField, Chip, Autocomplete, IconButton } from "@mui/material";
import { IoIosClose } from "react-icons/io";

interface ChipsBoxProps {
  label: string;
  options: string[];
  detail: string;
  selectedConditions: string[];
  setSelectedConditions: React.Dispatch<React.SetStateAction<string[]>>;
}

const ChipsBox: React.FC<ChipsBoxProps> = ({
  label,
  options,
  detail,
  selectedConditions,
  setSelectedConditions,
}) => {
  const [inputValue, setInputValue] = React.useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollableDivRef = useRef<HTMLDivElement>(null);

  const handleDelete = (conditionToDelete: string) => {
    setSelectedConditions((conditions) =>
      conditions.filter((condition) => condition !== conditionToDelete)
    );
  };

  const handleAddCondition = () => {
    if (inputValue && !selectedConditions.includes(inputValue)) {
      setSelectedConditions([...selectedConditions, inputValue]);
      setInputValue("");
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

  return (
    <div className="w-full px-5 mb-6">
      <h2 className="text-[1.1rem] mb-[6px] font-semibold">{label}</h2>
      <div
        className="flex items-center leading-none overflow-x-auto w-full px-[6px] border rounded-xl border-neutral-300"
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
            if (newValue && !selectedConditions.includes(newValue)) {
              setSelectedConditions([...selectedConditions, newValue]);
              setInputValue("");
            }
          }}
          renderInput={(params) => (
            <TextField
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
                },
              }}
              InputProps={{
                ...params.InputProps,
                endAdornment: inputValue ? (
                  <IconButton onClick={handleAddCondition} size="small">
                    +
                  </IconButton>
                ) : null,
              }}
            />
          )}
        />
      </div>
      <h2 className="text-[.9rem] font-normal text-slate-500 mt-1 leading-5">
        {detail}
      </h2>
    </div>
  );
};

export default ChipsBox;