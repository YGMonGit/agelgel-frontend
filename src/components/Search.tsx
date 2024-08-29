import React from "react";
import { IoSearchOutline, IoCloseOutline } from "react-icons/io5";
import { MdOutlineFilterAlt } from "react-icons/md";
import { HiArrowsUpDown } from "react-icons/hi2";
import {
  EAllergies,
  EChronicDisease,
  EDietaryPreferences,
} from "../api/types/user.type";
import {
  EPreferredMealTime,
  EPreparationDifficulty,
} from "../api/types/recipe.type";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./ui/drawer";
import { Button } from "./ui/button";

import { RiCloseLargeLine } from "react-icons/ri";
import { useGetIngredientsQuery } from "../api/slices/ingredient.slices";
import ChipsBox from "./ChipsBoxTwo";
import { Input } from "./Input";
import Choice from "./Choice";
import FilterButton from "./FilterButton";

interface SearchProps {
  ingredient: string[];
  setIngredient: any;
  time: number;
  setTime: React.Dispatch<React.SetStateAction<number>>;
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
  mealTime: EPreferredMealTime[];
  setMealTime: any;
  difficulty: any;
  setDifficulty: any;
  healthCondition: string[];
  setHealthCondition: any;
  mealPreference: string[];
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
}: SearchProps) {
  const { data: ingredientsQuery } = useGetIngredientsQuery({
    skip: 0,
    limit: 10,
  });

  const onTimeChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setTime(Number.parseInt(e.target.value));
  const onNameChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setName(e.target.value);

  return (
    <div className="w-full px-5 flex justify-center items-center gap-2 mt-4">
      <div className="flex justify-center items-center flex-grow py-2 bg-[#F9FAFB] leading-none text-[1rem] px-5 border outline-none rounded-lg border-[#D1D5DB] gap-1 min-w-0">
        <IoSearchOutline className="text-slate-500 text-[1.2rem] flex-shrink-0" />
        <input
          className="border-none outline-none leading-6 bg-transparent flex-grow min-w-0"
          placeholder="Search"
        />
        <IoCloseOutline className="text-slate-500 text-[1.2rem] flex-shrink-0" />
      </div>

      <Drawer>
        <DrawerTrigger>
          <button className="flex justify-center items-center w-[42px] h-[42px] bg-content-color leading-none text-[1rem] px-2 border outline-none rounded-lg border-content-color">
            <MdOutlineFilterAlt className="text-white text-[1.6rem]" />
          </button>
        </DrawerTrigger>
        <DrawerContent className="rounded-t-[30px]">
          <DrawerHeader>
            <div className="bg-content-color absolute top-5 right-6 text-white px-4 rounded-full">
              Done
            </div>
          </DrawerHeader>
          <DrawerFooter>
            <div
              className="w-full overflow-y-auto max-h-[70vh] flex flex-col justify-start items-start"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              <ChipsBox
                name="medical_condition.chronicDisease"
                label="Ingredients"
                options={Object.values(EChronicDisease)}
                selectedConditions={ingredient}
                setSelectedConditions={setIngredient}
                // register={register}
                // errors={errors && errors.medical_condition && errors.medical_condition?.chronicDiseases}
              />
              <Input
                type="number"
                label="Cooking Time"
                placeholder="cookingTime"
                value={time}
                onChange={onTimeChange}
                instruction="In minutes."
                noPad={true}
                // register={register}
                // errors={errors.cookingTime}
              />
              <Input
                type="text"
                label="Name"
                placeholder="name"
                value={name}
                onChange={onNameChange}
                // instruction="In minutes."
                noPad={true}
                // register={register}
                // errors={errors.cookingTime}
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
              <ChipsBox
                name="medical_condition.chronicDisease"
                label="Chronic Diseases"
                options={Object.values(EChronicDisease)}
                // detail="Select all the condition(s) you have"
                selectedConditions={healthCondition}
                setSelectedConditions={setHealthCondition}
                // register={register}
                // errors={errors && errors.medical_condition && errors.medical_condition?.chronicDiseases}
              />

              <ChipsBox
                name="medical_condition.dietaryPreferences"
                label="Dietary Preferences"
                options={Object.values(EDietaryPreferences)}
                // detail="This is here to make sure you end up loving the recipes we suggest."
                selectedConditions={mealPreference}
                setSelectedConditions={setMealPreference}
                // register={register}
                // errors={errors && errors.medical_condition && errors.medical_condition?.dietary_preferences}
              />
            </div>
            <DrawerClose>
              <Button
                variant="outline"
                className="absolute top-4 left-2 border-none shadow-none"
              >
                <RiCloseLargeLine className="text-[1rem] text-content-color" />
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
      <Drawer>
        <DrawerTrigger>
          <button className="flex justify-center items-center w-[42px] h-[42px] bg-content-color leading-none text-[1rem] px-2 border outline-none rounded-lg border-content-color">
            <HiArrowsUpDown className="text-white text-[1.6rem]" />
          </button>
        </DrawerTrigger>
        <DrawerContent className="rounded-t-[30px]">
          <DrawerHeader>
            <div className="bg-content-color absolute top-5 right-6 text-white px-4 rounded-full">
              Done
            </div>
          </DrawerHeader>
          <DrawerFooter>
            <div
              className="w-full overflow-y-auto max-h-[70vh] flex flex-col justify-start items-start py-3 gap-2"
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
              {/* <FilterButton content={content} setContent={setContent} text="Ingredients" /> */}
            </div>
            <DrawerClose>
              <Button
                variant="outline"
                className="absolute top-4 left-2 border-none shadow-none"
              >
                <RiCloseLargeLine className="text-[1rem] text-content-color" />
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
      <button className="flex justify-center items-center w-[42px] h-[42px] bg-white border border-content-color leading-none text-[1rem] px-2 outline-none rounded-lg">
        <IoSearchOutline className="text-content-color text-[1.6rem]" />
      </button>
    </div>
  );
}

export default SearchC;
