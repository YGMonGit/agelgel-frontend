import React, { useEffect, useRef } from "react";
import { Chip } from "@mui/material";
import { IoIosClose } from "react-icons/io";
import { IngredientDetail, IngredientDetailWithUnit } from "../api/types/recipe.type";

interface ChipsListProps {
  label: string;
  detail: string;
  selectedConditions: IngredientDetailWithUnit[];
  setSelectedConditions: React.Dispatch<React.SetStateAction<IngredientDetailWithUnit[]>>;
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
      conditions.filter((condition) => condition.ingredient !== conditionToDelete)
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
              label={`${condition.name}, ${condition.amount} ${condition.unit}`}
              onDelete={() => handleDelete(condition.ingredient as string)}
              sx={{
                margin: "0 4px",
                borderRadius: "8px",
                backgroundColor: "#0e9f6e",
                color: "#fff",
              }}
              deleteIcon={
                <span className="text-[1.2rem] text-white-100 mx-2 cursor-pointer">
                  <IoIosClose className="text-neutral-500" />
                </span>
              }
            />
          ))
        ) : (
          <span className="text-slate-400 italic px-2 py-2">No ingredient yet</span>
        )}
      </div>
      <h2 className="text-[.9rem] font-normal text-white-500 mt-1 leading-5 border-b pb-8">
        {detail}
      </h2>
    </div>
  );
};

export default ChipsList;