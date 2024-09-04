import React, { useEffect } from "react";
import { IoSearchOutline, IoCloseOutline } from "react-icons/io5";
import { MdOutlineFilterAlt } from "react-icons/md";
import { HiArrowsUpDown } from "react-icons/hi2";
import Drawer from "react-bottom-drawer";
import {
  EAllergies,
  EChronicDisease,
  EDietaryPreferences,
} from "../api/types/user.type";
import {
  EPreferredMealTime,
  EPreparationDifficulty,
  IRecipeSearchFrom,
} from "../api/types/recipe.type";

import { Button } from "./ui/button";

import { RiCloseLargeLine } from "react-icons/ri";
import { useGetIngredientsQuery } from "../api/slices/ingredient.slices";
import ChipsBox from "./ChipsBoxTwo";
import { Input, InputNumber } from "./Input";
import Choice from "./Choice";
import FilterButton from "./FilterButton";
import { zodResolver } from "@hookform/resolvers/zod";
import { searchRecipeSchema } from "../validation/recipe.validation";
import { Controller, useForm } from "react-hook-form";

import { Checkbox } from "@mui/material";
import { Switch } from "./ui/switch";

interface SearchProps {
  ingredient: string[] | undefined;
  setIngredient: any;
  time: number | undefined;
  setTime: React.Dispatch<React.SetStateAction<number | undefined>>;
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
  mealTime: EPreferredMealTime[] | undefined;
  setMealTime: any;
  difficulty: any;
  setDifficulty: any;
  healthCondition: string[] | undefined;
  setHealthCondition: any;
  mealPreference: string[] | undefined;
  setMealPreference: any;

  ingredientContent: number;
  setIngredientContent: any;
  timeContent: number;
  setTimeContent: any;
  nameContent: number;
  setNameContent: any;
  preferenceContent: number;
  setPreferenceContent: any;
  difficultyContent: number;
  setDifficultyContent: any;
  Search: any;
  page: number;
  setAllergy: any;
  allergy: any;
  useUserData?: boolean;
  setUserData?: any;
}

function SearchC({
  ingredient,
  setIngredient,
  time,
  setTime,
  name,
  setName,
  mealTime,
  setMealTime,
  difficulty,
  setDifficulty,
  healthCondition,
  setHealthCondition,
  mealPreference,
  setMealPreference,
  ingredientContent,
  setIngredientContent,
  timeContent,
  setTimeContent,
  nameContent,
  setNameContent,
  preferenceContent,
  setPreferenceContent,
  difficultyContent,
  setDifficultyContent,
  Search,
  page,
  allergy,
  setAllergy,
  setUserData,
  useUserData
}: SearchProps) {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    setError,
    setValue,
    getValues,
  } = useForm<IRecipeSearchFrom>({
    resolver: zodResolver(searchRecipeSchema),
    reValidateMode: "onSubmit",
    defaultValues: {
      name: undefined,
      cookingTime: undefined,
      ingredients: undefined,
      preferredMealTime: undefined,
      preparationDifficulty: undefined,
      rating: undefined,
      medical_condition: {
        allergies: undefined,
        chronicDiseases: undefined,
        dietary_preferences: undefined,
      },
    },
  });

  const { data: ingredientsQuery, isLoading } = useGetIngredientsQuery({
    skip: 0,
    limit: 10,
  });

  const onSubmit = async (data: IRecipeSearchFrom) => {
    console.log({ data });
    Search({
      form: data,
      page,
    });
  };

  console.log({ errors });
  console.log({ getValues: getValues() });

  useEffect(() => {
    if (mealTime?.length == 0) setValue("preferredMealTime", undefined);
    else setValue("preferredMealTime", mealTime);
  }, [mealTime]);

  useEffect(() => {
    if (ingredient?.length == 0) setValue("ingredients", undefined);
    else setValue("ingredients", ingredient);
  }, [ingredient]);

  useEffect(() => {
    if (difficulty == "") setValue("preparationDifficulty", undefined);
    else setValue("preparationDifficulty", difficulty);
  }, [difficulty]);

  useEffect(() => {
    if (name == "") setValue("name", undefined);
    else setValue("name", name);
  }, [name]);

  useEffect(() => {
    console.log({ ingredient });
    if (ingredient?.length == 0)
      setValue("medical_condition.chronicDiseases", undefined);
    else setValue("ingredients", ingredient as any);
  }, [ingredient]);

  useEffect(() => {
    if (healthCondition?.length == 0)
      setValue("medical_condition.chronicDiseases", undefined);
    else setValue("medical_condition.chronicDiseases", healthCondition as any);
  }, [healthCondition]);

  useEffect(() => {
    if (mealPreference?.length == 0)
      setValue("medical_condition.dietary_preferences", undefined);
    else
      setValue("medical_condition.dietary_preferences", mealPreference as any);
  }, [mealPreference]);

  useEffect(() => {
    if (allergy?.length == 0)
      setValue("medical_condition.allergies", undefined);
    else setValue("medical_condition.allergies", allergy);
  }, [allergy]);

  const onSort = (field: string, Content: number) => {
    const sort = getValues("sort");
    // if (sort?.findIndex((s) => s.field == field) != -1) {
    if (Content == 3) {
      setValue("sort", sort?.filter((s) => s.field != field));
    } else {
      console.log("add", [...(sort?.filter((s) => s.field != field) ?? []), { field: field, order: Content == 1 ? "asc" : "desc" }]);
      setValue("sort", [...(sort?.filter((s) => s.field != field) ?? []), { field: field, order: Content == 1 ? "asc" : "desc" }]);
      // }
    }
  }

  useEffect(() => { onSort("name", nameContent) }, [nameContent]);
  useEffect(() => { onSort("preferredMealTime", preferenceContent) }, [preferenceContent]);
  useEffect(() => { onSort("ingredients", ingredientContent) }, [ingredientContent]);
  useEffect(() => { onSort("cookingTime", timeContent) }, [timeContent]);
  useEffect(() => { onSort("difficultyContent", difficultyContent) }, [difficultyContent]);

  const onTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const time = e.target.value;
    if (time == undefined) setValue("cookingTime", undefined);
    else if (time == "") setValue("cookingTime", undefined);
    else if (Number.parseInt(time as any) <= 0)
      setValue("cookingTime", undefined);
    else if (Number.parseInt(time as any) == Number.NaN)
      setValue("cookingTime", undefined);
    else
      setValue("cookingTime", Number.parseInt(time as any), {
        shouldValidate: false,
      });
  };

  const [isVisible, setIsVisible] = React.useState(false);
  const openDrawer = React.useCallback(() => setIsVisible(true), []);
  const closeDrawer = React.useCallback(() => setIsVisible(false), []);
  const [isVisibleTwo, setIsVisibleTwo] = React.useState(false);
  const openDrawerTwo = React.useCallback(() => setIsVisibleTwo(true), []);
  const closeDrawerTwo = React.useCallback(() => setIsVisibleTwo(false), []);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full px-5 flex justify-center items-center gap-2 mt-4"
    >
      <div className="flex justify-center items-center flex-grow py-2 bg-[#F9FAFB] leading-none text-[1rem] px-5 border outline-none rounded-lg border-[#D1D5DB] gap-1 min-w-0">
        <IoSearchOutline className="text-slate-500 text-[1.2rem] flex-shrink-0" />
        <input
          className="border-none outline-none leading-6 bg-transparent flex-grow min-w-0"
          placeholder="Search"
          {...register("name")}
        />
        <IoCloseOutline onClick={() => setName("")} className="text-slate-500 text-[1.2rem] flex-shrink-0" />
      </div>

      <div
        className="flex justify-center items-center w-[42px] h-[42px] bg-content-color leading-none text-[1rem] px-2 border outline-none rounded-lg border-content-color"
        onClick={openDrawer}
      >
        <MdOutlineFilterAlt className="text-white text-[1.6rem]" />
      </div>

      <Drawer
        duration={250}
        hideScrollbars={true}
        onClose={closeDrawer}
        isVisible={isVisible}
      >
        <div
          className="w-full overflow-y-auto max-h-[70vh] flex flex-col justify-start items-start mt-8"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          <ChipsBox
            control={control}
            loading={isLoading}
            name="ingredients"
            label="Ingredients"
            options={ingredientsQuery?.map((i) => i.name) || []}
            selectedConditions={ingredient}
            setSelectedConditions={setIngredient}
            register={register}
            errors={
              errors &&
              errors.ingredients
            }
          />

          <Controller
            control={control}
            name="cookingTime"
            defaultValue={undefined}
            render={({ field }) => (
              <Input
                type="number"
                label="Cooking Time"
                placeholder="cookingTime"
                value={field.value}
                onChange={(e) => {
                  if (e.target.value == "")
                    field.onChange({ target: { value: undefined } });
                  field.onChange(e);
                  onTimeChange(e);
                }}
                instruction="In minutes."
                noPad={true}
                errors={errors.cookingTime}
              />
            )}
          />
          <Choice
            label="Preferred Meal Time"
            data={Object.values(EPreferredMealTime)}
            value={mealTime}
            setValues={setMealTime}
            multiSelect={true}
            noPad={true}
          />
          <Choice
            label="Preparation Difficulty"
            data={Object.values(EPreparationDifficulty)}
            value={difficulty}
            setValues={setDifficulty}
            multiSelect={false}
            noPad={true}
          />

          <div className="flex justify-start items-center leading-none gap-3 w-full mb-4">
            {/* <Checkbox
              checked={useUserData}
              onChange={(e) => setUserData(!useUserData)}
              color="primary"
            /> */}


            <Switch
              id="airplane-mode"
              style={{
                display: setUserData == undefined ? "none" : "block",
              }}
              checked={useUserData}
              disabled={setUserData == undefined}
              onCheckedChange={(checked) => setUserData(checked)}
            />

            <label style={{
              display: setUserData == undefined ? "none" : "block",
            }} htmlFor="airplane-mode" className="text-[1rem] text-content-color">
              Use your medical condition
            </label>
          </div>


          <div style={{
            display: useUserData ? "none" : "block"
          }}>
            <ChipsBox
              control={control}
              name="medical_condition.chronicDiseases"
              label="Chronic Diseases"
              options={Object.values(EChronicDisease)}
              detail="Select all the condition(s) you have"
              selectedConditions={healthCondition}
              setSelectedConditions={setHealthCondition}
              register={register}
              errors={
                errors &&
                errors.medical_condition &&
                errors.medical_condition?.chronicDiseases
              }
            />

            <ChipsBox
              control={control}
              name="medical_condition.dietary_preferences"
              label="Dietary Preferences"
              options={Object.values(EDietaryPreferences)}
              detail="This is here to make sure you end up loving the recipes we suggest."
              selectedConditions={mealPreference}
              setSelectedConditions={setMealPreference}
              register={register}
              errors={
                errors &&
                errors.medical_condition &&
                errors.medical_condition?.dietary_preferences
              }
            />

            <ChipsBox
              control={control}
              name="medical_condition.allergies"
              label="Allergies"
              options={Object.values(EAllergies)}
              detail="This is here to make sure you end up loving the recipes we suggest."
              selectedConditions={allergy}
              setSelectedConditions={setAllergy}
              register={register}
              errors={
                errors &&
                errors.medical_condition &&
                errors.medical_condition?.dietary_preferences
              }
            />
          </div>


          <Button
            variant="outline"
            className="absolute top-4 left-2 border-none shadow-none"
            onClick={(e) => {
              e.preventDefault();
              closeDrawer();
            }}
          >
            <RiCloseLargeLine className="text-[1rem] text-content-color" />
          </Button>
          <button
            type="submit"
            onClick={() => {
              closeDrawer()
            }}
            className="bg-content-color absolute top-5 right-6 text-white px-4 rounded-full"
          >
            Done
          </button>
        </div>
      </Drawer>

      <div
        className="flex justify-center items-center w-[42px] h-[42px] bg-content-color leading-none text-[1rem] px-2 border outline-none rounded-lg border-content-color"
        onClick={openDrawerTwo}
      >
        <HiArrowsUpDown className="text-white text-[1.6rem]" />
      </div>
      <Drawer
        duration={250}
        hideScrollbars={true}
        onClose={closeDrawerTwo}
        isVisible={isVisibleTwo}
      >
        <div
          className="w-full overflow-y-auto max-h-[70vh] flex flex-col justify-start items-start py-3 gap-2 mt-8"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          <FilterButton
            content={ingredientContent}
            setContent={setIngredientContent}
            text="Ingredients"
          />
          <FilterButton
            content={timeContent}
            setContent={setTimeContent}
            text="Cooking Time"
          />
          <FilterButton
            content={nameContent}
            setContent={setNameContent}
            text="Name"
          />
          <FilterButton
            content={preferenceContent}
            setContent={setPreferenceContent}
            text="Preferred Meal Time"
          />
          <FilterButton
            content={difficultyContent}
            setContent={setDifficultyContent}
            text="Preparation Difficulty"
          />
          <Button
            variant="outline"
            className="absolute top-4 left-2 border-none shadow-none"
            onClick={(e) => {
              e.preventDefault();
              closeDrawerTwo();
            }}
          >
            <RiCloseLargeLine className="text-[1rem] text-content-color" />
          </Button>
          <button
            type="submit"
            onClick={() => {
              closeDrawerTwo()
            }}
            className="bg-content-color absolute top-5 right-6 text-white px-4 rounded-full"
          >
            Done
          </button>
        </div>
      </Drawer>

      <button
        type="submit"
        className="flex justify-center items-center w-[42px] h-[42px] bg-white border border-content-color leading-none text-[1rem] px-2 outline-none rounded-lg"
      >
        <IoSearchOutline className="text-content-color text-[1.6rem]" />
      </button>
    </form>
  );
}

export default SearchC;
