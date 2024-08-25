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
import HealthConditions from "./sub_pages/HealthConditions";
import { homeUrl } from "../assets/data";


function NewRecipeForm() {
  // Form navigator state
  const [formNumber, setFormNumber] = useState(1);

  const [healthCondition, setHealthCondition] = useState<EChronicDisease[]>([]);
  const [allergies, setAllergies] = useState<EAllergies[]>([]);
  const [mealPreference, setMealPreference] = useState<EDietaryPreferences[]>([]);


  // For form one
  const [recipeName, setRecipeName] = useState("");
  const [description, setDescription] = useState("");
  const [mealTime, setMealTime] = useState<EPreferredMealTime[]>([EPreferredMealTime.breakfast]);
  const [difficulty, setDifficulty] = useState<EPreparationDifficulty>(EPreparationDifficulty.easy);
  const [time, setTime] = useState<number>(0);
  const [images, setImages] = useState<string[]>([]);


  // For form two
  const [ingredientList, setIngredientList] = useState<IngredientDetailWithUnit[]>([]);
  const [ingredients, setIngredients] = useState<IngredientDetail[]>([]);

  const [instructions, setInstructions] = useState("");

  const { register, control, handleSubmit, formState: { errors }, setError, setValue } = useForm<INewRecipeFrom>({
    resolver: zodResolver(newRecipeSchema),
    defaultValues: {
      cookingTime: "0",
    }
  });

  const { replace: replaceIngredients } = useFieldArray({
    control,
    name: "ingredients",
  });


  useEffect(() => {
    replaceIngredients(ingredients);
  }, [ingredients]);

  useEffect(() => {
    setValue("preferredMealTime", mealTime);
  }, [mealTime]);

  useEffect(() => {
    setValue("preparationDifficulty", difficulty);
  }, [difficulty]);

  useEffect(() => {
    setValue("medical_condition.chronicDiseases", healthCondition);
  }, [healthCondition]);

  useEffect(() => {
    setValue("medical_condition.allergies", allergies);
  }, [allergies]);

  useEffect(() => {
    setValue("medical_condition.dietary_preferences", mealPreference);
  }, [mealPreference]);

  console.log({ errors });

  const [CreateRecipe] = useCreateRecipeMutation();

  const navigate = useNavigate();



  async function NewRecipe(recipe: INewRecipeFrom) {
    console.log("Adding New Recipe....");

    const uploadManager = new Bytescale.UploadManager({
      apiKey: process.env.REACT_APP_BYTESCLE ?? ""
    });

    try {
      const files = recipe.imgs;
      const fileUrls: string[] = [];
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const { fileUrl } = await uploadManager.upload({ data: file });
        fileUrls.push(fileUrl);
      }

      await CreateRecipe({
        ...recipe,
        imgs: fileUrls,
        preparationDifficulty: difficulty,
        preferredMealTime: mealTime,
        medical_condition: {
          chronicDiseases: healthCondition,
          allergies: allergies,
          dietary_preferences: mealPreference
        }
      }).unwrap();
      navigate(homeUrl);
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
        formNumber === 3 ? (
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
            {/* <button type="submit" className="btn-primary mt-4">Submit</button> */}
          </>
        ) : formNumber === 4 ? (
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
        ) : (
          <>

            <HealthConditions
              setFormNumber={setFormNumber}
              healthCondition={healthCondition}
              setHealthCondition={setHealthCondition}
              allergies={allergies}
              setAllergies={setAllergies}
              mealPreference={mealPreference}
              setMealPreference={setMealPreference}
              finish={false}

              register={register}
              errors={errors}
            />
            {/* <button type="submit" className="btn-primary mt-4">Submit</button> */}
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
          {/* <button type="submit" className="btn-primary mt-4">Submit</button> */}
        </>
      )}

    </form>
  );
}

export default NewRecipeForm;