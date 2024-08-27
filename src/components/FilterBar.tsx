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

  const handleChipClick = (condition: string) => {
    console.log(condition);
    setSelectedChip(condition === selectedChip ? null : condition);
  };

  // Check if the data array contains the value "none"
  if (data.includes("none")) {
    return null;
  }

  return (
    <div className="w-full my-[2px]">
      <div
        className="flex items-center overflow-x-auto w-full gap-2"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        ref={scrollableDivRef}
        onWheel={handleWheel}
      >
        <p className="text-[.8rem] text-slate-400 italic w-[110px] text-end">{label}</p>
        {data.map((condition, index) => (
          <Chip
            key={index}
            onClick={() => handleChipClick(condition)}
            label={condition}
            sx={{ margin: "0 4px", borderRadius: "8px", backgroundColor: "#F3F4F6", height: "25px" }}
            className="font-[500]"
          />
        ))}
      </div>
    </div>
  );
}

export default FilterBar;
