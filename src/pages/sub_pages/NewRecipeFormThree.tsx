import ChipsList from "../../components/ChipsList";
import React from "react";
import WideButton from "../../components/WideButton";
import DetailInput from "../../components/DetailInput";
import WideLink from "../../components/WideLink";
import { IngredientDetail, IngredientDetailWithUnit } from "@/src/api/types/recipe.type";

interface NewRecipeFormThreeProps {
  setFormNumber: React.Dispatch<React.SetStateAction<number>>;
  ingredients: IngredientDetail[];
  ingredientList: IngredientDetailWithUnit[];
  setIngredientList: React.Dispatch<React.SetStateAction<IngredientDetailWithUnit[]>>;
  setIngredients: React.Dispatch<React.SetStateAction<IngredientDetail[]>>;
  instructions: string;
  setInstructions: React.Dispatch<React.SetStateAction<string>>;
  register: any;
  errors: any;
}

function NewRecipeFormThree({ setFormNumber, ingredientList, setIngredientList, instructions, setInstructions, register, errors }: NewRecipeFormThreeProps) {
  const onInstructionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    setInstructions(e.target.value);

  const onBackClick = () => { setFormNumber(2) };

  return (
    <div className="w-full flex-grow flex flex-col justify-start items-start mt-2">
      <ChipsList
        label="Added Ingredients"
        detail="Make sure to not forget anything!"
        selectedConditions={ingredientList}
        setSelectedConditions={setIngredientList}
      />
      <div className="w-full flex flex-col justify-start items-start flex-grow mt-2">
        <DetailInput
          label="Instructions"
          placeholder="instructions"
          value={instructions}
          onChange={onInstructionChange}
          register={register}
          errors={errors && errors.instructions}
        />
      </div>
      <div className="w-full px-5 flex justify-center items-end gap-2">
        <WideLink label="Back" color="bg-white" outline={true} clickAction={onBackClick} />
        <WideButton label="Finish" color="bg-content-color" />
      </div>
    </div>
  );
}

export default NewRecipeFormThree;