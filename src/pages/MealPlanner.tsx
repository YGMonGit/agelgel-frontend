import React, { useState } from 'react'
import FilterBarActive from '../components/FilterBarActive';
import { EPreferredMealTime, EPreferredMealTimeFilter } from '../api/types/recipe.type';

function MealPlanner() {
  const [filter, setFilter] = useState<EPreferredMealTimeFilter>(
    EPreferredMealTimeFilter.all
  );

  return (
    <div className="w-full flex flex-grow flex-col justify-start items-center pt-4 min-h-[100%-56px]">
      <div className="w-full px-5">
        <FilterBarActive
          data={["all", ...Object.values(EPreferredMealTime)]}
          selectedChip={filter}
          setSelectedChip={(filter) => {
            setFilter(filter as any);
          }}
        />
      </div>
    </div>
  )
}

export default MealPlanner