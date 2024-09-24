import React, { useEffect, useRef, useState } from "react";
import FilterBarActive from "../components/FilterBarActive";
import {
  EPreferredMealTime,
  EPreferredMealTimeFilter,
  EPreferredMealTimeForMealPlan,
  EPreferredMealTimeForMealPlanFilter,
} from "../api/types/recipe.type";

import EmptyListIcon from "../assets/images/empty-list.png";

import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";
import {
  useGetMealPlanQuery,
  useGetNutritionGoalQuery,
  useGetShoppingListQuery,
  useGetSimilarRecipesQuery,
  useMyMealPlanQuery,
} from "../api/slices/mealPlanner.slices";
import DisplayCard from "../components/DisplayCard";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
import AiPreImage from "../assets/icons/ai.png";
import AiAfterImage from "../assets/icons/ai2.png";
import IngredientIcon from "../assets/icons/apple-icon.png";

import { BarChart } from "@mui/x-charts/BarChart";
import { LineChart as LineCharts } from "@mui/x-charts/LineChart";
import {
  LineChart,
  AreaChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  ReferenceLine,
  Area,
} from "recharts";

import { Button } from "../components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../components/ui/sheet";
import IngredientCard from "../components/IngredientCard";
import SpoonacularClient from "../api/SpoonacularClient";
import { GoDotFill } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import PersonalData from "./PersonalData";
import { personalDataUrl } from "../assets/data";
import MyCharts from "../components/MyCharts";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function MealPlanner() {
  const [page, setPage] = useState(0);
  const [filter, setFilter] = useState(EPreferredMealTimeForMealPlanFilter.all);
  const navigate = useNavigate();

  const { data: goals, isLoading } = useGetMealPlanQuery({
    mealTime: filter,
    page: 1,
  });
  const {
    data: mealPlan,
    isLoading: mealPLanLoading,
    isError,
  } = useMyMealPlanQuery();

  useEffect(() => {
    if (!mealPlan && isError) {
      navigate(personalDataUrl);
    }
  }, [mealPlan, isError]);

  const {
    data: similarRecipes,
    isLoading: similarRecipesLoading,
    isFetching,
  } = useGetSimilarRecipesQuery({
    mealTime: EPreferredMealTime.breakfast,
    page: page,
  });

  console.log("similarRecipes", {
    mealTime: EPreferredMealTime.breakfast,
    page: page,
  });

  const [ingredientImages, setIngredientImages] = useState<string[]>([]);

  const {
    data: ingredientList,
  } = useGetShoppingListQuery();

  const scrollableDivRef = useRef(null);

  const handleWheel = (event: any) => {
    const wheelDelta = Math.max(-1, Math.min(1, event.deltaY || -event.detail));
    if (scrollableDivRef.current) {
      (scrollableDivRef.current as any).scrollLeft += wheelDelta * 30;
    }
  };

  const skeletonCount = isLoading ? 10 : goals?.length || 0;


  const pageChange = ({ direction }: { direction: string }) => {
    if (direction === "back") {
      setPage((prev) => {
        if (prev > 0) {
          return prev - 1;
        } else return 0;
      });
    } else {
      setPage((prev) => prev + 1);
    }
  };

  useEffect(() => {
    if (ingredientList) {
      const fetchIngredientImages = async () => {
        let images = await Promise.all(
          ingredientList.map(async (ingredient: any) => {
            const res = await new SpoonacularClient().getIngredientsImages([
              ingredient.name,
            ]);
            return res;
          })
        );
        if (images.every((arr) => arr.length === 1 && arr[0] === undefined)) {
          images = [];
        }
        setIngredientImages(images as any);
      };

      fetchIngredientImages();
    }
  }, [ingredientList]);

  return (
    <div className="w-full flex flex-grow flex-col justify-start items-center pt-4 min-h-[100%-56px]">
      <div className="w-full px-5">
        <FilterBarActive
          data={[...Object.values(EPreferredMealTimeForMealPlanFilter)]}
          selectedChip={filter}
          setSelectedChip={(filter) => {
            setFilter(filter);
          }}
          large={true}
        />
      </div>
      <MyCharts />
      <div className="w-full flex flex-col justify-start items-start mt-5 px-5">
        <div className="w-full flex justify-between items-center text-[1.4rem]">
          <h3 className="font-bold text-[1.2rem] italic text-slate-600 mb-1">Recipes</h3>
          <Sheet>
            <SheetTrigger asChild>
              <FaShoppingCart className="text-content-color text-[1.4rem]" />
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle className="pb-2">Shopping List</SheetTitle>
              </SheetHeader>

              {ingredientList?.length !== 0 ? (
                <div
                  className="flex flex-col h-full justify-start items-start w-full pt-3 gap-3 overflow-y-auto pb-8"
                  style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                >
                  {ingredientList?.map((ingredient, index) => {
                    return (
                      <div
                        key={index}
                        className="w-full flex bg-neutral-100 px-3 py-4 justify-start items-center leading-none gap-1 text-slate-500 rounded-xl"
                      >
                        <img
                          src={ingredientImages[index] ?? IngredientIcon}
                          className="w-[61px] p-3 aspect-square"
                        />
                        <div className="flex flex-col justify-center items-start">
                          <p className="text-black text-[1.1rem]">
                            {ingredient.name}( {ingredient.localName})
                          </p>
                          <p className="italic mt-1">
                            {ingredient.amount} {ingredient.unit}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="w-full flex justify-center">
                  <img src={EmptyListIcon} alt="pic" className="w-[75%] sm:w-[50%]" />
                </div>
              )}
              <SheetFooter>
                <SheetClose asChild>
                  <Button type="submit">Save changes</Button>
                </SheetClose>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>
        {goals?.length !== 0 ? (
          <div
            className="flex overflow-x-scroll justify-start items-center gap-4 w-full pb-8 px-3"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            ref={scrollableDivRef}
            onWheel={handleWheel}
          >
            {isLoading
              ? Array.from({ length: skeletonCount }).map((_, index) => (
                  <DisplayCard post={null} key={`skeleton-${index}`} />
                ))
              : goals?.map((post, index) => (
                  <DisplayCard post={post.recipe} key={index} HSlide={true} />
                ))}
          </div>
        ) : (
          <div className="w-full flex justify-center">
            <img src={EmptyListIcon} alt="pic" className="w-[75%] sm:w-[50%]" />
          </div>
        )}
      </div>
      <div className="w-full flex flex-col justify-start items-start">
        <div className="w-full px-5 flex justify-between items-center gap-1 mb-2">
          <div className="flex justify-start items-center gap-1">
            <img src={AiPreImage} alt="pic" className="w-5" />
            <p className="font-bold italic text-slate-600 text-[1.1rem]">AI Recipes</p>
          </div>
          <img src={AiAfterImage} alt="pic" className="w-6" />
        </div>
        {similarRecipes?.length !== 0 ? (
          <div className="w-full flex flex-col justify-start items-start">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 px-5 mb-5">
              {isFetching
                ? Array.from({ length: skeletonCount }).map((_, index) => (
                    <DisplayCard post={null} key={`skeleton-${index}`} />
                  ))
                : similarRecipes?.map((post, index) => (
                    <DisplayCard post={post} key={index} />
                  ))}
            </div>
            {!isFetching && (
              <div className="w-full px-5 flex justify-center items-center gap-3 mb-5 text-[1rem] select-none z-20">
                <button
                  className="flex justify-center items-center border border-content-color rounded-lg p-2 px-5 shadow-md bg-slate-50 dark:bg-neutral-800 dark:border-0 text-slate-500 text-[.9rem]"
                  onClick={() => pageChange({ direction: "back" })}
                >
                  <FaChevronLeft className="text-content-color text-[1.2rem]" />{" "}
                  Back
                </button>
                <button
                  className="flex justify-center items-center border border-content-color rounded-lg p-2 px-5 shadow-md bg-slate-50 dark:bg-neutral-800 dark:border-0 text-slate-500 text-[.9rem]"
                  onClick={() => pageChange({ direction: "forward" })}
                >
                  Next{" "}
                  <FaChevronRight className="text-content-color text-[1.2rem]" />
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="w-full flex flex-col justify-center items-center flex-grow">
            <img src={EmptyListIcon} alt="pic" className="w-[75%] sm:w-[50%]" />
            <div className="w-full px-5 flex justify-center items-center gap-3 mb-5 text-[1rem] select-none z-20">
              <button
                className="flex justify-center items-center border border-content-color rounded-lg p-2 px-5 shadow-md bg-slate-50 dark:bg-neutral-800 dark:border-0 text-slate-500 text-[.9rem]"
                onClick={() => pageChange({ direction: "back" })}
              >
                <FaChevronLeft className="text-content-color text-[1.2rem]" />{" "}
                Back
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default MealPlanner;