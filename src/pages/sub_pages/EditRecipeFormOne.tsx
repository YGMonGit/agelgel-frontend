import React from "react";
import { Input } from "../../components/Input";
import ImageInput from "../../components/ImageInput";
import DetailInput from "../../components/DetailInput";
import Choice from "../../components/Choice";
import WideLink from "../../components/WideLink";
import { EPreferredMealTime, EPreparationDifficulty } from "../../api/types/recipe.type";
import ImageEditInput from "../../components/ImageEditInput";
import { Controller } from "react-hook-form";

interface EditRecipeFormOneProps {
  setFormNumber: React.Dispatch<React.SetStateAction<number>>;
  recipeName: string;
  setRecipeName: React.Dispatch<React.SetStateAction<string>>;
  images: string[];
  newImages: File[];
  setImages: React.Dispatch<React.SetStateAction<string[]>>;
  setNewImages: React.Dispatch<React.SetStateAction<File[]>>;
  description: string;
  setDescription: React.Dispatch<React.SetStateAction<string>>;
  mealTime: EPreferredMealTime[];
  setMealTime: any;
  difficulty: any;
  setDifficulty: any;
  time: number;
  setTime: React.Dispatch<React.SetStateAction<number>>;
  register: any;
  setValue: any;
  errors: any;
  youTubeLink: string | undefined;
  setYouTubeLink: any;
  handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleRemoveImage: (index: number) => void;
  handleRemoveNewImage: (index: number) => void;
  control: any;
}

function EditRecipeFormOne({
  setFormNumber,
  recipeName,
  setRecipeName,
  images,
  newImages,
  setImages,
  setNewImages,
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
  setYouTubeLink,
  youTubeLink,
  handleImageChange,
  handleRemoveImage,
  handleRemoveNewImage,
  control,
}: EditRecipeFormOneProps) {
  const onRecipeNameChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setRecipeName(e.target.value);
  const onDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    setDescription(e.target.value);
  const onTimeChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setTime(Number.parseInt(e.target.value));
  const onYouTubeLinkChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setYouTubeLink(e.target.value);

  const onNextClick = () => { setFormNumber(2) };

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
        <ImageEditInput
          register={register}
          setValue={setValue}
          images={images}
          newImages={newImages}
          setImages={setImages}
          setNewImages={setNewImages}
          handleImageChange={handleImageChange}
          handleRemoveImage={handleRemoveImage}
          handleRemoveNewImage={handleRemoveNewImage}
        />
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
      <Input
        label="YouTube Link"
        placeholder="youTubeLink"
        value={youTubeLink}
        onChange={onYouTubeLinkChange}
        register={register}
        errors={errors.youtubeLink}
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
      <Controller
        control={control}
        name="cookingTime"
        defaultValue={time}
        render={({ field }) => (
          <Input
            type="number"
            label="Cooking Time"
            placeholder="cookingTime"
            value={field.value}
            onChange={field.onChange}
            instruction="In minutes."
            // register={register}
            errors={errors.cookingTime}
          />
        )}
      />
      {/*  */}
      <div className="w-full px-5">
        <WideLink label="Next" color="bg-content-color" clickAction={onNextClick} />
      </div>
    </div>
  );
}

export default EditRecipeFormOne;