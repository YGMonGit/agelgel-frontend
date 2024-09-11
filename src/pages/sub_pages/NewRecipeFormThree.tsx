import ChipsList from "../../components/ChipsList";
import React, { useEffect, useState } from "react";
import WideButton from "../../components/WideButton";
import DetailInput from "../../components/DetailInput";
import WideLink from "../../components/WideLink";
import { IngredientDetail, IngredientDetailWithUnit } from "@/src/api/types/recipe.type";
import ClipLoader from "react-spinners/ClipLoader";
import FancyTextArea from "../../components/FancyTextArea";

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
  isLoading: any;
}

function NewRecipeFormThree({ setFormNumber, ingredientList, setIngredientList, instructions, setInstructions, register, errors, isLoading }: NewRecipeFormThreeProps) {
  const [richTextContent, setRichTextContent] = useState('');

  useEffect(() => {
    console.log(richTextContent);
  }, [richTextContent])

  const onInstructionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    setInstructions(e.target.value);

  const onBackClick = () => { setFormNumber(3) };


  return (
    <div className="w-full flex-grow flex flex-col justify-start items-start mt-2">
      <ChipsList
        label="Added Ingredients"
        detail="Make sure to not forget anything!"
        selectedConditions={ingredientList}
        setSelectedConditions={setIngredientList}
      />
      <div className="w-full flex flex-col justify-start items-start flex-grow">
        <div className="w-full px-5">
          <FancyTextArea register={register} errors={errors.instructions} onChange={setInstructions} instruction={instructions} />
          
        </div>
      </div>
      <div className="w-full px-5 flex justify-center items-end gap-2">
        <WideLink label="Back" color="bg-white" outline={true} clickAction={onBackClick} />
        {isLoading ? (
          <WideButton label={
            <div className="flex justify-center items-center w-full h-full gap-2">
              <ClipLoader
                color={"white"}
                size={15}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
              <p className="text-white text-[1.1rem] italic">loading ...</p>
            </div>
          } color="bg-content-color" disable={true} />
        ) : (
          <WideButton label="Finish" color="bg-content-color" />
        )}
      </div>
    </div>
  );
}

export default NewRecipeFormThree;