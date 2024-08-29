import React, { useState } from "react";
import PageHeader from "../components/PageHeader";
import SearchC from "../components/Search";
import FilterBar from "../components/FilterBar";
import FilterBarActive from "../components/FilterBarActive";
import { filterData, postUrl, homeUrl } from "../assets/data";
import DisplayCard from "../components/DisplayCard";
import { IoAdd } from "react-icons/io5";
import { useGetRecipesQuery } from "../api/slices/recipe.slices";
import { useNavigate } from "react-router-dom";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../components/ui/drawer";
import { Button } from "../components/ui/button";
import { useGetUserQuery } from "../api/slices/user.slices";
import { EChronicDisease, EDietaryPreferences } from "../api/types/user.type";
import { EPreferredMealTime, EPreparationDifficulty } from "../api/types/recipe.type";

function Search() {
  const navigate = useNavigate();
  const [pagination, setPagination] = useState({
    skip: 0,
    limit: 10,
  });

  const { data: recommendedRecipes, isLoading } =
    useGetRecipesQuery(pagination);

  const skeletonCount = isLoading
    ? pagination.limit
    : recommendedRecipes?.length || 0;

  const { data: user } = useGetUserQuery();

  const [ingredient, setIngredient] = useState<EChronicDisease[]>([]);
  const [time, setTime] = useState<number>(0);
  const [name, setName] = useState<string>("");

  const [ingredientContent, setIngredientContent] = useState<number>(1);
  const [timeContent, setTimeContent] = useState<number>(1);
  const [nameContent, setNameContent] = useState<number>(1);
  const [preferenceContent, setPreferenceContent] = useState<number>(1);
  const [difficultyContent, setDifficultyContent] = useState<number>(1);

  const [mealTime, setMealTime] = useState<EPreferredMealTime[]>([EPreferredMealTime.breakfast]);
  const [difficulty, setDifficulty] = useState<EPreparationDifficulty>(EPreparationDifficulty.easy);
  const [healthCondition, setHealthCondition] = useState<EChronicDisease[]>([]);
  // const [allergy, setAllergy] = useState<EAllergies[]>([]);
  const [mealPreference, setMealPreference] = useState<EDietaryPreferences[]>([]);

  return (
    <div className="w-full flex-wrap flex flex-col justify-start items-center relative mb-5">
      <div className="text-[1.1rem] text-content-color font-semibold cursor-pointer select-none mt-5 flex justify-start items-center w-full px-5" onClick={() => navigate(homeUrl)}><MdOutlineKeyboardArrowLeft className="text-[1.9rem]"/> Home</div>
      <SearchC ingredient={ingredient} setIngredient={setIngredient} time={time} setTime={setTime} name={name} setName={setName} mealTime={mealTime} setMealTime={setMealTime} difficulty={difficulty} setDifficulty={setDifficulty} healthCondition={healthCondition} setHealthCondition={setHealthCondition} mealPreference={mealPreference} setMealPreference={setMealPreference} ingredientContent={ingredientContent} setIngredientContent={setIngredientContent} timeContent={timeContent} setTimeContent={setTimeContent} nameContent={nameContent} setNameContent={setNameContent} preferenceContent={preferenceContent} setPreferenceContent={setPreferenceContent} difficultyContent={difficultyContent} setDifficultyContent={setDifficultyContent}  />

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 w-full px-5 mt-4">
        {isLoading
          ? Array.from({ length: skeletonCount }).map((_, index) => (
            <DisplayCard post={null} key={`skeleton-${index}`} />
          ))
          : recommendedRecipes?.map((post, index) => (
            <DisplayCard post={post} key={index} />
          ))}
      </div>
    </div>
  );
}

export default Search;
