import React, { useRef, useState } from "react";
import { Chip } from "@mui/material";

interface FilterBarProps {
  label?: string;
  data: string[];
}

function FilterBar({ data, label }: FilterBarProps) {
  const [selectedChip, setSelectedChip] = useState<string | null>(null);

  const scrollableDivRef = useRef<HTMLDivElement>(null);

  const handleWheel = (event: React.WheelEvent<HTMLDivElement>) => {
    const wheelDelta = Math.max(-1, Math.min(1, event.deltaY || -event.detail));
    if (scrollableDivRef.current) {
      scrollableDivRef.current.scrollLeft += wheelDelta * 30;
    }
  };

  // const handleChipClick = (condition: string) => {
  //   console.log(condition);
  //   setSelectedChip(condition === selectedChip ? null : condition);
  // };

  // Check if the data array contains the value "none"
  if (data.includes("none")) {
    return null;
  }

  return (
    <div className="w-full my-[2px]">
      <p className="text-[.8rem] text-slate-400 italic w-[110px] text-start mb-4">{label}</p>
      <div
        className="flex items-center overflow-x-auto w-full gap-2"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        ref={scrollableDivRef}
        onWheel={handleWheel}
      >
        {data.map((condition, index) => (
          // <Chip
          //   key={index}
          //   onClick={() => handleChipClick(condition)}
          //   label={condition}
          //   sx={{ margin: "0 4px", borderRadius: "8px", backgroundColor: "#F3F4F6", height: "25px" }}
          //   className="font-[500] dark:bg-opacity-30"
          // />
          <div className={`px-4 rounded-[8px] ${selectedChip === condition ? "bg-[#bbf7d0] dark:text-neutral-800":"bg-[#F3F4F6] dark:bg-opacity-30"} h-[25px] select-none cursor-pointer`} key={index}>{condition}</div>
          // <div className="px-4 rounded-[8px] bg-[#F3F4F6] h-[25px] dark:bg-opacity-30" onClick={() => handleChipClick(condition)} key={index}>{condition}</div>
        ))}
      </div>
    </div>
  );
}

export default FilterBar;
