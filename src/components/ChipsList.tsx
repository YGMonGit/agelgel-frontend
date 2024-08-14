import React, { useRef } from "react";
import { Chip } from "@mui/material";
import { IoIosClose } from "react-icons/io";

interface ChipsListProps {
  label: string;
  detail: string;
  selectedConditions: string[];
  setSelectedConditions: React.Dispatch<React.SetStateAction<string[]>>;
}

const ChipsList: React.FC<ChipsListProps> = ({
  label,
  detail,
  selectedConditions,
  setSelectedConditions,
}) => {
  const scrollableDivRef = useRef<HTMLDivElement>(null);

  const handleDelete = (conditionToDelete: string) => {
    setSelectedConditions((conditions) =>
      conditions.filter((condition) => condition !== conditionToDelete)
    );
  };

  const handleWheel = (event: React.WheelEvent<HTMLDivElement>) => {
    const wheelDelta = Math.max(-1, Math.min(1, event.deltaY || -event.detail));
    if (scrollableDivRef.current) {
      scrollableDivRef.current.scrollLeft += wheelDelta * 30;
    }
  };

  return (
    <div className="w-full px-5 mb-6">
      <h2 className="text-[1.1rem] mb-[6px] font-semibold">{label}</h2>
      <div
        className="flex items-center leading-none overflow-x-auto w-full px-2 py-2 border rounded-xl border-neutral-300"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        ref={scrollableDivRef}
        onWheel={handleWheel}
      >
        {selectedConditions.length > 0 ? (
          selectedConditions.map((condition, index) => (
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
          ))
        ) : (
          <span className="text-slate-400 italic px-2 py-2">No ingredient yet</span>
        )}
      </div>
      <h2 className="text-[.9rem] font-normal text-slate-500 mt-1 leading-5 border-b pb-8">
        {detail}
      </h2>
    </div>
  );
};

export default ChipsList;