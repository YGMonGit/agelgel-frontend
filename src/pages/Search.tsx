import React, { useEffect, useState } from "react";
import PageHeader from "../components/PageHeader";
import SearchC from "../components/Search";
import { homeUrl } from "../assets/data";
import DisplayCard from "../components/DisplayCard";
import {
  useGetRecipesQuery,
  useUserSearchRecipesMutation,
} from "../api/slices/recipe.slices";
import { useNavigate } from "react-router-dom";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { useGetUserQuery } from "../api/slices/user.slices";
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
import { set } from "react-hook-form";

import EmptyListIcon from "../assets/images/empty-list.png";

function Search() {
  const navigate = useNavigate();

  const [page, setPage] = useState(1);
  const [Search, { data: searchedRecipes, isLoading: searchedLoading }] =
    useUserSearchRecipesMutation();
  useEffect(() => {
    Search({ page: page, form: {} });
  }, []);

  const skeletonCount = searchedLoading ? 10 : searchedRecipes?.length || 0;

  const { data: user } = useGetUserQuery();

  const [ingredient, setIngredient] = useState<string[] | undefined>(undefined);
  const [time, setTime] = useState<number | undefined>(undefined);
  const [name, setName] = useState<string>("");

  const [ingredientContent, setIngredientContent] = useState<number>(3);
  const [timeContent, setTimeContent] = useState<number>(3);
  const [nameContent, setNameContent] = useState<number>(3);
  const [preferenceContent, setPreferenceContent] = useState<number>(3);
  const [difficultyContent, setDifficultyContent] = useState<number>(3);

  const [mealTime, setMealTime] = useState<EPreferredMealTime[] | undefined>(
    undefined
  );
  const [difficulty, setDifficulty] = useState<EPreparationDifficulty>();
  const [healthCondition, setHealthCondition] = useState<
    EChronicDisease[] | undefined
  >(undefined);
  const [allergy, setAllergy] = useState<EAllergies[] | undefined>(undefined);
  const [mealPreference, setMealPreference] = useState<
    EDietaryPreferences[] | undefined
  >(undefined);

  const [useUserData, setUserData] = useState(true);

  useEffect(() => {
    if (user && useUserData) {
      const { chronicDiseases, allergies, dietary_preferences } =
        user.medical_condition;
      setHealthCondition(chronicDiseases);
      setAllergy(allergies);
      setMealPreference(dietary_preferences);
    }
  }, [user, useUserData]);

  return (
    <div className="w-full flex-wrap flex flex-col justify-start items-center relative mb-5">
      <div
        className="text-[1.1rem] text-content-color font-semibold cursor-pointer select-none mt-5 flex justify-start items-center w-full px-5"
        onClick={() => navigate(homeUrl)}
      >
        <MdOutlineKeyboardArrowLeft className="text-[1.9rem]" /> Home
      </div>
      <SearchC
        setUserData={setUserData}
        useUserData={useUserData}
        page={page}
        Search={Search}
        allergy={allergy}
        setAllergy={setAllergy}
        ingredient={ingredient}
        setIngredient={setIngredient}
        time={time}
        setTime={setTime}
        name={name}
        setName={setName}
        mealTime={mealTime}
        setMealTime={setMealTime}
        difficulty={difficulty}
        setDifficulty={setDifficulty}
        healthCondition={healthCondition}
        setHealthCondition={setHealthCondition}
        mealPreference={mealPreference}
        setMealPreference={setMealPreference}
        ingredientContent={ingredientContent}
        setIngredientContent={setIngredientContent}
        timeContent={timeContent}
        setTimeContent={setTimeContent}
        nameContent={nameContent}
        setNameContent={setNameContent}
        preferenceContent={preferenceContent}
        setPreferenceContent={setPreferenceContent}
        difficultyContent={difficultyContent}
        setDifficultyContent={setDifficultyContent}
      />
      <div
        className="text-[1.1rem] text-content-color font-semibold cursor-pointer select-none mt-5 flex justify-start items-center w-full px-5"
        onClick={() => navigate(homeUrl)}
      >
        <MdOutlineKeyboardArrowLeft className="text-[1.9rem]" /> Home
      </div>
      <SearchC
        setUserData={setUserData}
        useUserData={useUserData}
        page={page}
        Search={Search}
        allergy={allergy}
        setAllergy={setAllergy}
        ingredient={ingredient}
        setIngredient={setIngredient}
        time={time}
        setTime={setTime}
        name={name}
        setName={setName}
        mealTime={mealTime}
        setMealTime={setMealTime}
        difficulty={difficulty}
        setDifficulty={setDifficulty}
        healthCondition={healthCondition}
        setHealthCondition={setHealthCondition}
        mealPreference={mealPreference}
        setMealPreference={setMealPreference}
        ingredientContent={ingredientContent}
        setIngredientContent={setIngredientContent}
        timeContent={timeContent}
        setTimeContent={setTimeContent}
        nameContent={nameContent}
        setNameContent={setNameContent}
        preferenceContent={preferenceContent}
        setPreferenceContent={setPreferenceContent}
        difficultyContent={difficultyContent}
        setDifficultyContent={setDifficultyContent}
      />

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 w-full px-5 mt-4">
        {searchedRecipes?.length !== 0 ? (
          searchedLoading ? (
            Array.from({ length: skeletonCount }).map((_, index) => (
              <DisplayCard post={null} key={`skeleton-${index}`} />
            ))
          ) : (
            searchedRecipes?.map((post, index) => (
              <DisplayCard post={post} key={index} />
            ))
          )
        ) : (
          <div className="w-full flex justify-center items-center flex-grow">
            <img src={EmptyListIcon} alt="pic" className="w-[75%] sm:w-[50%]" />
          </div>
        )}
      </div>
    </div>
  );
}

export default Search;
