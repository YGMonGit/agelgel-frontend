import ChipsList from "../../components/ChipsList";
import React from "react";
import WideButton from "../../components/WideButton";
import DetailInput from "../../components/DetailInput";

interface NewRecipeFormThreeProps {
  setFormNumber: React.Dispatch<React.SetStateAction<number>>;
  ingredientList: string[];
  setIngredientList: React.Dispatch<React.SetStateAction<string[]>>;
  instructions: string;
  setInstructions: React.Dispatch<React.SetStateAction<string>>;
  handleSubmit: (e: React.FormEvent<HTMLButtonElement>) => Promise<void>;
}

function NewRecipeFormThree({ setFormNumber, ingredientList, setIngredientList, instructions, setInstructions, handleSubmit }: NewRecipeFormThreeProps) {
  const onInstructionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    setInstructions(e.target.value);

  const onBackClick = () => {setFormNumber(2)};

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
          placeholder="Write a recipe instructions here ..."
          value={instructions}
          onChange={onInstructionChange}
        />
      </div>
      <div className="w-full px-5 flex justify-center items-end gap-2">
        <WideButton label="Back" color="bg-white" outline={true} clickAction={onBackClick} />
        <WideButton label="Finish" color="bg-content-color" clickEvent={handleSubmit} />
      </div>
    </div>
  );
}

export default NewRecipeFormThree;