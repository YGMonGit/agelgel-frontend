import React, { useEffect, useState } from "react";
import PageHeader from "../components/PageHeader";
import NewRecipeFormOne from "./sub_pages/NewRecipeFormOne";
import NewRecipeFormTwo from "./sub_pages/NewRecipeFormTwo";
import NewRecipeFormThree from "./sub_pages/NewRecipeFormThree";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  INewRecipeFrom,
  EPreparationDifficulty,
  EPreferredMealTime,
  IngredientDetailWithUnit,
} from "../api/types/recipe.type";
import { useFieldArray, useForm } from "react-hook-form";
import { newRecipeSchema } from "../validation/recipe.validation";
import * as Bytescale from "@bytescale/sdk";
import { useNavigate } from "react-router-dom";
import { useCreateRecipeMutation } from "../api/slices/recipe.slices";
import {
  EAllergies,
  EDietaryPreferences,
  EChronicDisease,
} from "../api/types/user.type";
import HealthConditions from "./sub_pages/HealthConditions";
import { homeUrl } from "../assets/data";
import { useGetUserQuery } from "../api/slices/user.slices";
import useFileUpload from "../hooks/useFileUpload";
import ErrorPopup from "../components/ErrorPopup";
import { INewIngredientFrom } from "../api/types/ingredient.type";

function NewRecipeForm() {
  // Form navigator state
  const [formNumber, setFormNumber] = useState(1);

  const { data: user } = useGetUserQuery();

  const [healthCondition, setHealthCondition] = useState<EChronicDisease[]>(
    user?.medical_condition?.chronicDiseases ?? []
  );
  const [allergies, setAllergies] = useState<EAllergies[]>(
    user?.medical_condition?.allergies ?? []
  );
  const [mealPreference, setMealPreference] = useState<EDietaryPreferences[]>(
    user?.medical_condition?.dietary_preferences ?? []
  );
  const [youTubeLink, setYouTubeLink] = useState<string | undefined>(undefined);

  // For form one
  const [recipeName, setRecipeName] = useState("");
  const [description, setDescription] = useState("");
  const [mealTime, setMealTime] = useState<EPreferredMealTime[]>([
    EPreferredMealTime.breakfast,
  ]);
  const [difficulty, setDifficulty] = useState<EPreparationDifficulty>(
    EPreparationDifficulty.easy
  );
  const [time, setTime] = useState<number>(0);
  const [images, setImages] = useState<string[]>([]);

  // For form two
  const [ingredientList, setIngredientList] = useState<
    IngredientDetailWithUnit[]
  >([]);
  const [ingredients, setIngredients] = useState<INewIngredientFrom[]>([]);

  const [instructions, setInstructions] = useState("");
  console.log({instructions});
  
  const { uploadFile, loading } = useFileUpload();

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    setError,
    setValue,
  } = useForm<INewRecipeFrom>({
    resolver: zodResolver(newRecipeSchema),
    defaultValues: {
      cookingTime: "0",
      medical_condition: user?.medical_condition,
    },
  });

  const { replace: replaceIngredients } = useFieldArray({
    control,
    name: "ingredients",
  });

  useEffect(() => {
    replaceIngredients(ingredients as any);
  }, [ingredients]);

  useEffect(() => {
    setValue("instructions", instructions);
  }, [instructions]);

  useEffect(() => {
    setValue("preferredMealTime", mealTime);
  }, [mealTime]);

  useEffect(() => {
    setValue("youtubeLink", youTubeLink);
  }, [youTubeLink]);

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

  const [CreateRecipe, { isLoading }] = useCreateRecipeMutation();

  const navigate = useNavigate();

  async function NewRecipe(recipe: INewRecipeFrom) {
    console.log("Adding New Recipe....");

    try {
      const files = recipe.imgs;
      const fileUrls: string[] = [];
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        let fileUrl = await uploadFile(file as any);
        if (fileUrl) fileUrls.push(fileUrl);
      }

      await CreateRecipe({
        ...recipe,
        imgs: fileUrls,
        preparationDifficulty: difficulty,
        preferredMealTime: mealTime,
        medical_condition: {
          chronicDiseases: healthCondition,
          allergies: allergies,
          dietary_preferences: mealPreference,
        },
      }).unwrap();
      navigate(homeUrl);
    } catch (error: any) {
      if (!error.data.error) return;
      const err = error.data.error;
      if (err.type === "Validation") setError(err.attr, { message: err.error });
    }
  }

  const formatErrors = (): string | null => {
    const errorMessages: string[] = [];
    const pageErrors: { [key: number]: string[] } = {
      1: [],
      2: [],
      3: [],
      4: [],
    };

    const addErrorToPage = (page: number, field: string) => {
      pageErrors[page].push(field);
    };

    if (errors.name) addErrorToPage(1, "recipe name");
    if (errors.description) addErrorToPage(1, "description");
    if (errors.preferredMealTime) addErrorToPage(1, "meal time");
    if (errors.preparationDifficulty) addErrorToPage(1, "difficulty");
    if (errors.cookingTime) addErrorToPage(1, "cooking time");
    if (errors.imgs) addErrorToPage(1, "images");
    if (errors.youtubeLink) addErrorToPage(1, "YouTube link");

    if (errors.ingredients) addErrorToPage(3, "ingredients");

    if (errors.instructions) addErrorToPage(4, "instructions");

    if (errors.medical_condition?.chronicDiseases)
      addErrorToPage(2, "chronic diseases");
    if (errors.medical_condition?.allergies) addErrorToPage(2, "allergies");
    if (errors.medical_condition?.dietary_preferences)
      addErrorToPage(2, "dietary preferences");

    // Format error messages
    Object.entries(pageErrors).forEach(([page, fields]) => {
      if (fields.length > 0) {
        errorMessages.push(`Errors on Page ${page}: ${fields.join(", ")}`);
      }
    });

    return errorMessages.length > 0 ? errorMessages.join(". ") : null;
  };

  useEffect(() => {
    const formattedError = formatErrors();
    setErrorMessage(formattedError);
  }, [errors]);
  // console.log(errors.root?.message);

  return (
    <form
      className="w-full flex-grow flex flex-col justify-start items-center mb-6"
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
              ingredients={ingredients as any}
              ingredientList={ingredientList}
              setIngredients={setIngredients as any}
              setIngredientList={setIngredientList}
              register={register}
              errors={errors}
              setError={setErrorMessage}
            />
          </>
        ) : formNumber === 4 ? (
          <>
            <NewRecipeFormThree
              setFormNumber={setFormNumber}
              ingredients={ingredients as any}
              ingredientList={ingredientList}
              setIngredients={setIngredients as any}
              setIngredientList={setIngredientList}
              instructions={instructions}
              setInstructions={setInstructions}
              register={register}
              errors={errors}
              isLoading={isLoading || loading}
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
              recipe={true}
            />
          </>
        )
      ) : (
        <>
          <NewRecipeFormOne
            youTubeLink={youTubeLink}
            setYouTubeLink={setYouTubeLink}
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
        </>
      )}
      <ErrorPopup error={errorMessage} />
    </form>
  );
}

export default NewRecipeForm;
