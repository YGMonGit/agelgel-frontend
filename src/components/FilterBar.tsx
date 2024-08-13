import React, { useRef } from "react";
import { Chip } from "@mui/material";

interface FilterBarProps {
  data: string[];
}

function FilterBar({ data }: FilterBarProps) {
  const scrollableDivRef = useRef<HTMLDivElement>(null);

  const handleWheel = (event: React.WheelEvent<HTMLDivElement>) => {
    const wheelDelta = Math.max(-1, Math.min(1, event.deltaY || -event.detail));
    if (scrollableDivRef.current) {
      scrollableDivRef.current.scrollLeft += wheelDelta * 30;
    }
  };

  return (
    <div className="w-full my-3 px-5">
      <div
        className="flex items-center overflow-x-auto w-full"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        ref={scrollableDivRef}
        onWheel={handleWheel}
      >
        {data.map((condition, index) => (
          <Chip
            key={index}
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
