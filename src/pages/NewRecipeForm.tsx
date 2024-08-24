import React, { useEffect, useState } from "react";
import PageHeader from "../components/PageHeader";
import NewRecipeFormOne from "./sub_pages/NewRecipeFormOne";
import NewRecipeFormTwo from "./sub_pages/NewRecipeFormTwo";
import NewRecipeFormThree from "./sub_pages/NewRecipeFormThree";
import { zodResolver } from '@hookform/resolvers/zod';
import { INewRecipeFrom, EPreparationDifficulty, EPreferredMealTime, IngredientDetail, IngredientDetailWithUnit } from "../api/types/recipe.type";
import { useFieldArray, useForm } from "react-hook-form";
import { newRecipeSchema } from "../validation/recipe.validation";
import * as Bytescale from "@bytescale/sdk";
import { useNavigate } from "react-router-dom";
import { useCreateRecipeMutation } from "../api/slices/recipe.slices";
import { EAllergies, EDietaryPreferences, EChronicDisease } from "../api/types/user.type";


function NewRecipeForm() {
  // Form navigator state
  const [formNumber, setFormNumber] = useState(1);

  const [healthCondition, setHealthCondition] = useState<EChronicDisease[]>([]);
  const [allergy, setAllergy] = useState<EAllergies[]>([]);
  const [mealPreference, setMealPreference] = useState<EDietaryPreferences[]>([]);


  // For form one
  const [recipeName, setRecipeName] = useState("");
  const [description, setDescription] = useState("");
  const [mealTime, setMealTime] = useState<EPreferredMealTime[]>([EPreferredMealTime.breakfast]);
  const [difficulty, setDifficulty] = useState<EPreparationDifficulty[]>([EPreparationDifficulty.easy]);
  const [time, setTime] = useState<number>(0);
  const [images, setImages] = useState<string[]>([]);


  // For form two
  const [ingredientList, setIngredientList] = useState<IngredientDetailWithUnit[]>([]);
  const [ingredients, setIngredients] = useState<IngredientDetail[]>([]);

  const [instructions, setInstructions] = useState("");

  const { register, control, handleSubmit, formState: { errors }, setError, setValue, getValues } = useForm<INewRecipeFrom>({
    resolver: zodResolver(newRecipeSchema),
    defaultValues: {
      cookingTime: 0,
    }
  });

  const { replace: replaceIngredients } = useFieldArray({
    control,
    name: "ingredients",
  });

  // const { replace: replaceMealTime } = useFieldArray({
  //   control,
  //   name: "",
  // });

  useEffect(() => {
    replaceIngredients(ingredients);
  }, [ingredients]);

  console.log({ errors, time });

  const [CreateRecipe] = useCreateRecipeMutation();


  async function NewRecipe(recipe: INewRecipeFrom) {
    console.log("Adding New Recipe....");

    const uploadManager = new Bytescale.UploadManager({
      apiKey: process.env.REACT_APP_BYTESCLE ?? ""
    });

    try {
      const files = recipe.imgs;
      const fileUrls: string[] = [];
      files.forEach(async (file) => {
        const { fileUrl } = await uploadManager.upload({ data: file });
        fileUrls.push(fileUrl);
      });

      await CreateRecipe({
        ...recipe,
        imgs: fileUrls,
        preparationDifficulty: difficulty.length == 0 ? EPreparationDifficulty.easy : difficulty[0],
        preferredMealTime: mealTime,
        medical_condition: {
          chronicDiseases: healthCondition.length == 0 ? [EChronicDisease.none] : healthCondition,
          allergies: allergy.length == 0 ? [EAllergies.none] : allergy,
          dietary_preferences: mealPreference.length == 0 ? [EDietaryPreferences.none] : mealPreference
        }
      }).unwrap();
      // navigate(homeUrl);
    } catch (error: any) {
      if (!error.data.error) return;
      const err = error.data.error;
      if (err.type === "Validation")
        setError(err.attr, { message: err.error });
    }
  }

  return (
    <form className="w-full flex-grow flex flex-col justify-start items-center mb-6"
      onSubmit={handleSubmit(NewRecipe)}
    >
      <PageHeader
        header="Add a New Recipe"
        detail="Thanks for contributing to our database of recipes!"
      />
      {formNumber !== 1 ? (
        formNumber === 2 ? (
          <>
            <NewRecipeFormTwo
              setFormNumber={setFormNumber}
              ingredients={ingredients}
              ingredientList={ingredientList}
              setIngredients={setIngredients}
              setIngredientList={setIngredientList}
              register={register}
              errors={errors}
            />
            <button type="submit" className="btn-primary mt-4">Submit</button>
          </>
        ) : (
          <>
            <NewRecipeFormThree
              setFormNumber={setFormNumber}
              ingredients={ingredients}
              ingredientList={ingredientList}
              setIngredients={setIngredients}
              setIngredientList={setIngredientList}
              instructions={instructions}
              setInstructions={setInstructions}
              register={register}
              errors={errors}
            />
          </>
        )
      ) : (
        <>
          <NewRecipeFormOne
            setFormNumber={setFormNumber}
            recipeName={recipeName}
            images={images}
            setImages={setImages}
            setRecipeName={setRecipeName}
            description={description}
            setDescription={setDescription}
            mealTime={mealTime}
            setMealTime={setMealTime}
            difficulty={difficulty}
            setDifficulty={setDifficulty}
            time={time}
            setTime={setTime}
            register={register}
            setValue={setValue}
            errors={errors}
          />
          <button type="submit" className="btn-primary mt-4">Submit</button>
        </>
      )}

    </form>
  );
}

export default NewRecipeForm;