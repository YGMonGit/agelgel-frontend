import React, { useEffect, useRef, useState } from "react";
import { Chip } from "@mui/material";
import { EPreferredMealTimeFilter, EPreferredMealTimeForMealPlan, EPreferredMealTimeForMealPlanFilter } from "../api/types/recipe.type";

interface FilterBarActiveProps {
  data: string[];
  selectedChip: EPreferredMealTimeFilter | EPreferredMealTimeForMealPlanFilter | EPreferredMealTimeForMealPlan | null;
  setSelectedChip: (condition: any) => void;
}

function FilterBarActive({ data, selectedChip, setSelectedChip }: FilterBarActiveProps) {

  const scrollableDivRef = useRef<HTMLDivElement>(null);

  // Determine the current time of day and set the selected chip
  useEffect(() => {
    const currentHour = new Date().getHours();

    if (currentHour >= 6 && currentHour < 11) {
      // Breakfast time: 6 AM - 11 AM
      setSelectedChip(EPreferredMealTimeFilter.breakfast);
    } else if (currentHour >= 11 && currentHour < 16) {
      // Lunch time: 11 AM - 4 PM
      setSelectedChip(EPreferredMealTimeFilter.lunch);
    } else if (currentHour >= 16 && currentHour < 18) {
      // Snacks time: 4 PM - 6 PM
      setSelectedChip(EPreferredMealTimeFilter.snack);
    } else if (currentHour >= 18 || currentHour < 6) {
      // Dinner time: 6 PM - 6 AM
      setSelectedChip(EPreferredMealTimeFilter.dinner);
    }
  }, []);

  const handleWheel = (event: React.WheelEvent<HTMLDivElement>) => {
    const wheelDelta = Math.max(-1, Math.min(1, event.deltaY || -event.detail));
    if (scrollableDivRef.current) {
      scrollableDivRef.current.scrollLeft += wheelDelta * 30;
    }
  };

  const handleChipClick = (condition: EPreferredMealTimeFilter) => {
    setSelectedChip(condition);
  };

  return (
    <div className="w-full my-3">
      <div
        className="flex items-center overflow-x-auto w-full gap-2"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        ref={scrollableDivRef}
        onWheel={handleWheel}
      >
        {data.map((condition, index) => (
          <Chip
            key={index}
            label={condition}
            onClick={() => { handleChipClick(EPreferredMealTimeFilter[condition as keyof typeof EPreferredMealTimeFilter]) }}
            sx={{
              margin: "0 4px",
              borderRadius: "8px",
              backgroundColor: selectedChip === condition ? "#bbf7d0" : "#F3F4F6",
              color: selectedChip === condition ? "#15803d" : "#374151",
              height: "25px",
              cursor: "pointer",
              "&:hover": selectedChip === condition
                ? {
                  background: "#bbf7d0",
                  color: "#15803d"
                }
                : {
                  backgroundColor: "#e5e7eb",
                  color: "#1f2937",
                },
            }}
            className="font-[500]"
          />
        ))}
      </div>
    </div>
  );
}

export default FilterBarActive;