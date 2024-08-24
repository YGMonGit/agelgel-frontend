import React from "react";
import { Input } from "../../components/Input";
import ImageInput from "../../components/ImageInput";
import DetailInput from "../../components/DetailInput";
import Choice from "../../components/Choice";
import WideLink from "../../components/WideLink";
import { EPreferredMealTime, EPreparationDifficulty } from "../../api/types/recipe.type";

interface NewRecipeFormOneProps {
  setFormNumber: React.Dispatch<React.SetStateAction<number>>;
  recipeName: string;
  setRecipeName: React.Dispatch<React.SetStateAction<string>>;
  images: string[];
  setImages: React.Dispatch<React.SetStateAction<string[]>>;
  description: string;
  setDescription: React.Dispatch<React.SetStateAction<string>>;
  mealTime: any;
  setMealTime: any;
  difficulty: any;
  setDifficulty: any;
  time: string;
  setTime: React.Dispatch<React.SetStateAction<string>>;
  register: any;
  setValue: any;
  errors: any;
}

function NewRecipeFormOne({
  setFormNumber,
  recipeName,
  setRecipeName,
  images,
  setImages,
  description,
  setDescription,
  mealTime,
  setMealTime,
  difficulty,
  setDifficulty,
  time,
  setTime,
  register,
  setValue,
  errors,
}: NewRecipeFormOneProps) {
  const onRecipeNameChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setRecipeName(e.target.value);
  const onDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    setDescription(e.target.value);
  const onTimeChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setTime(e.target.value);

  const onNextClick = () => {setFormNumber(2)};

  const errorStyle = "text-[.8rem] text-red-400";

  return (
    <div className="w-full flex-col justify-start items-start mt-2">
      <Input
        label="Recipe Name"
        placeholder="name"
        value={recipeName}
        onChange={onRecipeNameChange}
        register={register}
        errors={errors.name}
      />
      <div className="w-full px-5">
        <ImageInput register={register} setValue={setValue} images={images} setImages={setImages} />
        {errors.imgs && <p className={errorStyle}>{errors.imgs.message}</p>}
      </div>
      <DetailInput
        label="Description"
        placeholder="description"
        value={description}
        onChange={onDescriptionChange}
        register={register}
        errors={errors.description}
      />
      <Choice
        label="Preferred Meal Time"
        data={Object.values(EPreferredMealTime)}
        value={mealTime}
        setValues={setMealTime}
        multiSelect={true}
      />
      <Choice
        label="Preparation Difficulty"
        data={Object.values(EPreparationDifficulty)}
        value={difficulty}
        setValues={setDifficulty}
        multiSelect={false}
      />
      <Input
        label="Cooking Time"
        placeholder="cookingTime"
        value={time}
        onChange={onTimeChange}
        instruction="In minutes."
        register={register}
        errors={errors.cookingTime}
      />
      <div className="w-full px-5">
        <WideLink label="Next" color="bg-content-color" clickAction={onNextClick} />
      </div>
    </div>
  );
}

export default NewRecipeFormOne;
