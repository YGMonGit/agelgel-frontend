import React from "react";
import { IngredientDetailWithUnit } from "../api/types/recipe.type";
import { GoDotFill } from "react-icons/go";
import { IoMdRemoveCircle } from "react-icons/io";

interface IngredientProps {
  selectedConditions: IngredientDetailWithUnit[];
  setSelectedConditions: React.Dispatch<React.SetStateAction<IngredientDetailWithUnit[]>>;
}

function Ingredient({selectedConditions, setSelectedConditions}: IngredientProps) {
  const handleDelete = (conditionToDelete: string) => {
    setSelectedConditions((conditions) =>
      conditions.filter((condition) => condition.ingredient !== conditionToDelete)
    );
  };
  return (
    <div className="w-full flex flex-col justify-start items-center gap-2 select-none">
    {selectedConditions.map((ingredient, index) => (
      <div className="w-full flex justify-between items-center">
        <div className="w-full flex justify-start items-center text-slate-500">
          <GoDotFill className="text-[.7rem] ml-[6px] mr-1" />
          <p className="text-[.9rem]">{ingredient.name}{", "}{ingredient.amount}{" "}{ingredient.unit}</p>
        </div>
        <IoMdRemoveCircle className="text-[1.2rem] text-[#FD6666] cursor-pointer" onClick={() => handleDelete(ingredient.ingredient as string)} />
      </div>
    ))}
    </div>
  );
}

export default Ingredient;
