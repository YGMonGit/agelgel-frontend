import React from "react";
import { Input } from "../../components/Input";
import ImageInput from "../../components/ImageInput";
import DetailInput from "../../components/DetailInput";
import Choice from "../../components/Choice";
import WideButton from "../../components/WideButton";

interface NewRecipeFormOneProps {
  setFormNumber: React.Dispatch<React.SetStateAction<number>>;
  recipeName: string;
  setRecipeName: React.Dispatch<React.SetStateAction<string>>;
  description: string;
  setDescription: React.Dispatch<React.SetStateAction<string>>;
  mealTime: string;
  setMealTime: React.Dispatch<React.SetStateAction<string>>;
  difficulty: string;
  setDifficulty: React.Dispatch<React.SetStateAction<string>>;
  time: string;
  setTime: React.Dispatch<React.SetStateAction<string>>;
}

function NewRecipeFormOne({
  setFormNumber,
  recipeName,
  setRecipeName,
  description,
  setDescription,
  mealTime,
  setMealTime,
  difficulty,
  setDifficulty,
  time,
  setTime,
}: NewRecipeFormOneProps) {
  const onRecipeNameChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setRecipeName(e.target.value);
  const onDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    setDescription(e.target.value);
  const onTimeChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setTime(e.target.value);

  const onNextClick = () => {setFormNumber(2)};


  return (
    <div className="w-full flex-col justify-start items-start mt-2">
      <Input
        label="Recipe Name"
        placeholder="Add here ..."
        value={recipeName}
        onChange={onRecipeNameChange}
      />
      <div className="w-full px-5">
        <ImageInput />
      </div>
      <DetailInput
        label="Description"
        placeholder="Write a recipe description here ..."
        value={description}
        onChange={onDescriptionChange}
      />
      <Choice
        label="Preferred Meal Time"
        data={["Breakfast", "Lunch", "Dinner", "Snacks"]}
        value={mealTime}
        setValue={setMealTime}
      />
      <Choice
        label="Preparation Difficulty"
        data={["Easy", "Medium", "Hard"]}
        value={difficulty}
        setValue={setDifficulty}
      />
      <Input
        label="Cooking Time"
        placeholder="Add here ..."
        value={time}
        onChange={onTimeChange}
        instruction="In minutes."
      />
      <div className="w-full px-5">
        <WideButton label="Next" color="bg-content-color" clickAction={onNextClick} />
      </div>
    </div>
  );
}

export default NewRecipeFormOne;
