import React from "react";
import { FaSortUp } from "react-icons/fa";
import { BiSolidUpArrow, BiSolidDownArrow } from "react-icons/bi";
import { FaMinus } from "react-icons/fa6";

interface FilterButtonProps {
  content: number;
  setContent: any;
  text: string;
}

function FilterButton({ content, setContent, text }: FilterButtonProps) {
  return (
    <div
      className="flex justify-start items-start gap-1 cursor-pointer select-none"
      onClick={() => {
        if (content === 1) {
          setContent(2);
        } else if (content === 2) {
          setContent(3);
        } else {
          setContent(1);
        }
      }}
    >
      {content === 1 && (
        <div className="w-6 h-6 bg-content-color text-white flex justify-center items-center rounded-md">
          <BiSolidUpArrow className="bg-red-20 text-[1rem]" />
        </div>
      )}
      {content === 2 && (
        <div className="w-6 h-6 bg-content-color text-white flex justify-center items-center rounded-md">
          <BiSolidDownArrow className="bg-red-20 text-[1rem]" />
        </div>
      )}
      {content === 3 && (
        <div className="w-6 h-6 bg-content-color text-white flex justify-center items-center rounded-md">
          <FaMinus className="bg-red-20 text-[1rem]" />
        </div>
      )}{" "}
      {text}
    </div>
  );
}

export default FilterButton;
