import React, { useEffect, useState } from "react";
import PageHeader from "../components/PageHeader";
import NewRecipeFormOne from "./sub_pages/NewRecipeFormOne";
import NewRecipeFormTwo from "./sub_pages/NewRecipeFormTwo";
import NewRecipeFormThree from "./sub_pages/NewRecipeFormThree";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  IRecipeUpdateFrom,
  EPreparationDifficulty,
  EPreferredMealTime,
  IngredientDetailWithUnit,
} from "../api/types/recipe.type";
import { useFieldArray, useForm } from "react-hook-form";
import { editRecipeSchema, newRecipeSchema } from "../validation/recipe.validation";
import { useNavigate, useParams } from "react-router-dom";
import { useGetRecipeByIdQuery, useUpdateRecipeMutation } from "../api/slices/recipe.slices";
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
import EditRecipeFormOne from "./sub_pages/EditRecipeFormOne";
import EditRecipeFormTwo from "./sub_pages/EditRecipeFormTwo";

function RecipeEditForm() {
  const rID = useParams();
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

  const [recipeName, setRecipeName] = useState("");
  const [description, setDescription] = useState("");
  const [mealTime, setMealTime] = useState<EPreferredMealTime[]>([
    EPreferredMealTime.breakfast,
  ]);
  const [difficulty, setDifficulty] = useState<EPreparationDifficulty>(
    EPreparationDifficulty.easy
  );
  const [time, setTime] = useState<number>(0);

  const [defaultImages, setDefaultImages] = useState<string[]>([]);
  const [newImages, setNewImages] = useState<File[]>([]);

  const [removedImages, setRemovedImages] = useState<string[]>([]);

  const [ingredientList, setIngredientList] = useState<IngredientDetailWithUnit[]>([]);
  const [ingredients, setIngredients] = useState<INewIngredientFrom[]>([]);

  const [instructions, setInstructions] = useState("");
  const { uploadFile, loading } = useFileUpload();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  console.log({ ingredientList });



  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    setError,
    setValue,
    getValues,
  } = useForm<IRecipeUpdateFrom>({
    resolver: zodResolver(editRecipeSchema),
    defaultValues: {
      cookingTime: 0,
      medical_condition: user?.medical_condition,
    },
  });

  console.log({ errors, values: getValues() });


  const { replace: replaceIngredients } = useFieldArray({
    control,
    name: "ingredients",
  });

  useEffect(() => {
    replaceIngredients(ingredientList as any);
  }, [ingredientList, replaceIngredients]);

  useEffect(() => {
    setValue("instructions", instructions);
  }, [instructions, setValue]);

  useEffect(() => {
    setValue("preferredMealTime", mealTime);
  }, [mealTime, setValue]);

  useEffect(() => {
    setValue("youtubeLink", youTubeLink);
  }, [youTubeLink, setValue]);

  useEffect(() => {
    setValue("preparationDifficulty", difficulty);
  }, [difficulty, setValue]);

  useEffect(() => {
    setValue("medical_condition.chronicDiseases", healthCondition);
  }, [healthCondition, setValue]);

  useEffect(() => {
    setValue("medical_condition.allergies", allergies);
  }, [allergies, setValue]);

  useEffect(() => {
    setValue("medical_condition.dietary_preferences", mealPreference);
  }, [mealPreference, setValue]);

  const [updateRecipe, { isLoading }] = useUpdateRecipeMutation();

  const navigate = useNavigate();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let files: FileList | null = null;
    files = e.target.files;

    if (files) {
      const AFiles = Array.from(files)
      setValue("imgs", AFiles as any);
      // const newImages = AFiles.map(file => URL.createObjectURL(file));
      setNewImages(prevImages => [...prevImages, ...AFiles]);
    }
  };

  const handleRemoveImage = (index: number) => {
    const removedImage = defaultImages[index];
    setDefaultImages((prevImages) => prevImages.filter((_, i) => i !== index));
    setRemovedImages((prevRemoved) => [...prevRemoved, removedImage]);
  };

  const handleRemoveNewImage = (index: number) => {
    setNewImages((prevNewImages) => prevNewImages.filter((_, i) => i !== index));
  };

  async function EditRecipe(recipe: IRecipeUpdateFrom) {

    try {
      console.log({ newImages });
      console.log({ defaultImages });

      const files = recipe.imgs;
      const fileUrls: string[] = [];
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        let fileUrl = await uploadFile(file as any);
        if (fileUrl) fileUrls.push(fileUrl);
      }


      await updateRecipe({
        recipeId: String(rID.id),
        updates: {
          ...recipe,
          ingredients: ingredientList,
          imgs: [...defaultImages, ...fileUrls],
          preparationDifficulty: difficulty,
          preferredMealTime: mealTime,
          medical_condition: {
            chronicDiseases: healthCondition,
            allergies: allergies,
            dietary_preferences: mealPreference,
          },
        }
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

  const { data: recipe } = useGetRecipeByIdQuery(String(rID.id));
  useEffect(() => {
    if (recipe) {
      setValue("name", recipe.name);
      setRecipeName(recipe.name);
      setValue("description", recipe.description);
      setDescription(recipe.description || "");
      setValue("imgs", []);
      setDefaultImages(recipe.imgs);
      setValue("preferredMealTime", recipe.preferredMealTime);
      setMealTime(recipe.preferredMealTime);
      setValue("preparationDifficulty", recipe.preparationDifficulty);
      setDifficulty(recipe.preparationDifficulty);
      setValue("cookingTime", recipe.cookingTime);
      setTime(recipe.cookingTime);

      setValue("ingredients", recipe.ingredients.map((ingredient: any) => {
        return {
          ingredient: ingredient._id,
          name: ingredient.name,
          amount: ingredient.amount,
          unit: ingredient.unit
        };
      }));
      setIngredientList(recipe.ingredients.map((ingredient: any) => {
        return {
          ingredient: ingredient._id,
          name: ingredient.name,
          amount: ingredient.amount,
          unit: ingredient.unit
        };
      }));

      setValue("youtubeLink", recipe.youtubeLink);
      setYouTubeLink(recipe.youtubeLink);

      setValue("instructions", recipe.instructions);
      setInstructions(recipe.instructions);
      setValue("medical_condition", recipe.medical_condition);
      setHealthCondition(recipe.medical_condition.chronicDiseases);
      setAllergies(recipe.medical_condition.allergies);
      setMealPreference(recipe.medical_condition.dietary_preferences);
    }
  }, [recipe, setValue]);

  return (
    <form
      className="w-full flex-grow flex flex-col justify-start items-center mb-6"
      onSubmit={handleSubmit(EditRecipe)}
    >
      <PageHeader
        header="Edit Recipe"
        detail="Thanks for contributing to our database of recipes!"
      />
      {formNumber === 1 && (
        <EditRecipeFormOne
          control={control}
          youTubeLink={youTubeLink}
          setYouTubeLink={setYouTubeLink}
          setFormNumber={setFormNumber}
          recipeName={recipeName}
          images={defaultImages}
          newImages={newImages}
          setNewImages={setNewImages}
          setImages={setDefaultImages}
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
          handleImageChange={handleImageChange}
          handleRemoveImage={handleRemoveImage}
          handleRemoveNewImage={handleRemoveNewImage}
        />
      )}
      {formNumber === 2 && (
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
      )}
      {formNumber === 3 && (
        <EditRecipeFormTwo
          setFormNumber={setFormNumber}
          ingredients={ingredients as any}
          ingredientList={ingredientList}
          setIngredients={setIngredients as any}
          setIngredientList={setIngredientList}
          register={register}
          errors={errors}
          setError={setErrorMessage}
        />
      )}
      {formNumber === 4 && (
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
      )}
      <ErrorPopup error={errorMessage} />
    </form>
  );
}

export default RecipeEditForm;