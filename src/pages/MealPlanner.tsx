import React, { useEffect, useRef, useState } from "react";
import FilterBarActive from "../components/FilterBarActive";
import {
  EPreferredMealTime,
  EPreferredMealTimeFilter,
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
} from "chart.js";
import {
  useGetMealPlanQuery,
  useGetNutritionGoalQuery,
  useGetShoppingListQuery,
  useGetSimilarRecipesQuery,
} from "../api/slices/mealPlanner.slices";
import DisplayCard from "../components/DisplayCard";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
import IngredientDefaultImage from "../assets/images/default_image_1.png";

import { Button } from "../components/ui/button"
// import { Input } from "../components/ui/input"
// import { Label } from "../components/ui/label"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../components/ui/sheet"
import IngredientCard from "../components/IngredientCard";
import SpoonacularClient from "../api/SpoonacularClient";
import { GoDotFill } from "react-icons/go";

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

  const { data: goals, isLoading } = useGetMealPlanQuery({
    mealTime: EPreferredMealTime.breakfast,
    page: 1,
  });
  const { data: similarRecipes, isLoading: similarRecipesLoading, isFetching } = useGetSimilarRecipesQuery({
    mealTime: EPreferredMealTime.breakfast,
    page: page,
  });


  const pageSize = 10
  const [pagination, setPagination] = useState({
    skip: 0,
    limit: 10,
  });

  const [ingredientImages, setIngredientImages] = useState<string[]>([]);


  const {
    data: ingredientList,
    refetch,
    isFetching: ingredientFetching,
    isUninitialized,
  } = useGetShoppingListQuery({
    mealTime: EPreferredMealTime.breakfast,
  });

  const { data: nutritionGoal } = useGetNutritionGoalQuery();

  const scrollableDivRef = useRef(null);

  const handleWheel = (event: any) => {
    const wheelDelta = Math.max(-1, Math.min(1, event.deltaY || -event.detail));
    if (scrollableDivRef.current) {
      (scrollableDivRef.current as any).scrollLeft += wheelDelta * 30;
    }
  };

  const skeletonCount = isLoading ? 10 : goals?.recipe.length || 0;

  const normalizeData = (data: any) => {
    if (!data) return {};
    const values: any = Object.values(data);
    const min = Math.min(...values);
    const max = Math.max(...values);

    return Object.fromEntries(
      Object.entries(data).map(([key, value]) => [
        key,
        ((value as any) - min) / (max - min),
      ])
    );
  };

  const options = {
    // responsive: true,
    // scales: {
    //   x: {
    //     stacked: true,
    //   },
    //   y: {
    //     stacked: true,
    //   },
    // },
  };

  const [filter, setFilter] = useState(EPreferredMealTimeFilter.all);

  const chartData = {
    labels: ["Calories", "Protein", "Carbs", "Fat"],
    datasets: [
      {
        label: "Current",
        data: [
          // normalizeData(goals?.nutrition)?.calories || 0,
          // normalizeData(goals?.nutrition)?.protein_g || 0,
          // normalizeData(goals?.nutrition)?.carbohydrates_total_g || 0,
          // normalizeData(goals?.nutrition)?.fat_total_g || 0,
          goals?.nutrition?.calories || 0,
          goals?.nutrition?.protein_g || 0,
          goals?.nutrition?.carbohydrates_total_g || 0,
          goals?.nutrition?.fat_total_g || 0,
          
        ],
        backgroundColor: "rgba(255, 0, 0, 0.2)",
        borderColor: "rgba(255, 0, 0, 1)",
        borderWidth: 1,
      },
      {
        label: "Ideal",
        data: [
          nutritionGoal?.calories || 0,
          nutritionGoal?.protein || 0,
          nutritionGoal?.carbs || 0,
          nutritionGoal?.fat || 0,
          // normalizeData(nutritionGoal)?.calories || 0,
          // normalizeData(nutritionGoal)?.protein || 0,
          // normalizeData(nutritionGoal)?.carbs || 0,
          // normalizeData(nutritionGoal)?.fat || 0,
        ],
        backgroundColor: "rgba(0, 0, 255, 0.2)",
        borderColor: "rgba(0, 0, 255, 1)",
        borderWidth: 1,
      },
    ],
  };

  const pageChange = ({ direction }: { direction: string }) => {

    if (direction === "back") {
      setPage((prev) => {
        if (prev > 0) {
          return prev - 1;
        }
        else
          return 0;
      });
    } else {
      setPage((prev) => (
        prev + 1
      ));
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

  const skeletonCounts = isLoading
    ? pagination.limit
    : ingredientList?.length || 0;

  const pageChangeShopList = ({ direction }: { direction: string }) => {

    if (direction === "back") {
      setPagination((prev) => {
        if (prev.skip - pageSize < 0) {
          return ({
            skip: 0,
            limit: pageSize,
          });
        }
        else
          return ({
            skip: prev.skip - pageSize,
            limit: prev.limit - pageSize,
          });
      });
    } else {
      setPagination((prev) => ({
        skip: prev.skip + pageSize,
        limit: prev.limit + pageSize,
      }));
    }
  };
  

  return (
    <div className="w-full flex flex-grow flex-col justify-start items-center pt-4 min-h-[100%-56px]">
      <div className="w-full px-5">
        <FilterBarActive
          data={["all", ...Object.values(EPreferredMealTime)]}
          selectedChip={filter}
          setSelectedChip={(filter) => {
            setFilter(filter);
          }}
        />
      </div>
      <div className="w-full max-w-md mt-3">
        {!isLoading && nutritionGoal && (
          <Bar data={chartData} options={options} />
        )}
      </div>
      <div className="w-full flex flex-col justify-start items-start mt-5 px-5">
        <div className="w-full flex justify-between items-center text-[1.4rem]">
          <h3 className="font-semibold mb-1">Recipes</h3>
          <Sheet>
      <SheetTrigger asChild>
        {/* <Button variant="outline">Open</Button> */}
        <FaShoppingCart className="text-content-color text-[1.4rem]" />
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Shopping List</SheetTitle>
          {/* <SheetDescription>
            Your shoping 
          </SheetDescription> */}
        </SheetHeader>
        {/* <div className="flex flex-col h-full justify-start items-center w-full pt-3">
      {ingredientList?.length !== 0 ? (
        <div className="w-full flex flex-col justify-start items-center">
          <div className="flex flex-col h-full justify-start items-center w-full pt-3 gap-2">
            {isLoading
              ? Array.from({ length: skeletonCounts }).map((_, index) => (
                <IngredientCard ingredient={null} key={`skeleton-${index}`} />
              ))
              : ingredientList?.map((ingredient, index) => (
                <IngredientCard ingredientImage={ingredientImages[index]} ingredient={ingredient} key={index} />
              ))}
          </div>
          {!isFetching && (
            <div className="w-full p-5 flex justify-center items-center gap-3 mb-5 text-[1rem] select-none z-20">
              <button
                className="flex justify-center items-center border border-content-color rounded-lg p-2 px-5 shadow-md bg-slate-50 text-slate-500 text-[.9rem]"
                onClick={() => pageChangeShopList({ direction: "back" })}
              >
                <FaChevronLeft className="text-content-color text-[1.2rem]" />{" "}
                Back
              </button>
              <button
                className="flex justify-center items-center border border-content-color rounded-lg p-2 px-5 shadow-md bg-slate-50 text-slate-500 text-[.9rem]"
                onClick={() => pageChangeShopList({ direction: "forward" })}
              >
                Next{" "}
                <FaChevronRight className="text-content-color text-[1.2rem]" />
              </button>
            </div>
          )}
        </div>
      ) : (
        // <div className="w-full flex justify-center items-center flex-grow">
        //   <img src={EmptyListIcon} alt="pic" className="w-[75%] sm:w-[50%]" />
        // </div>
        <div className="w-full flex flex-col justify-center items-center flex-grow">
          <img src={EmptyListIcon} alt="pic" className="w-[75%] sm:w-[50%]" />
          <div className="w-full px-5 flex justify-center items-center gap-3 mb-5 text-[1rem] select-none z-20">
            <button
              className="flex justify-center items-center border border-content-color rounded-lg p-2 px-5 shadow-md bg-slate-50 text-slate-500 text-[.9rem]"
              onClick={() => pageChangeShopList({ direction: "back" })}
            >
              <FaChevronLeft className="text-content-color text-[1.2rem]" />{" "}
              Back
            </button>
            
          </div>
        </div>
      )}
        </div> */}
        {ingredientList?.map((ingredient, index) => {
            return (
              <div
                key={index}
                className="flex justify-start items-center leading-none gap-1 text-slate-400"
              >
                <img
                  src={
                    ingredientImages[index] !== undefined
                      ? ingredientImages[index]
                      : IngredientDefaultImage
                  }
                  alt="pic"
                  className={`min-w-8 w-8 ${ingredientImages[index] === undefined &&
                    "rounded-full p-[5px] shadow-md bg-neutral-200"
                    }`}
                />
                <GoDotFill className="text-[.7rem] ml-[6px] mr-1 text-slate-500" />
                {ingredient.name}({" "}
                {ingredient.localName} )-{" "}
                {ingredient.amount}{" "}
                {ingredient.unit}
              </div>
            );
          })}
        <SheetFooter>
          <SheetClose asChild>
            <Button type="submit">Save changes</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
        </div>
        {goals?.recipe.length !== 0 ? (
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
              : goals?.recipe.map((post, index) => (
                  <DisplayCard post={post} key={index} />
                ))}
          </div>
        ) : (
          <div className="w-full flex justify-center">
            <img src={EmptyListIcon} alt="pic" className="w-[75%] sm:w-[50%]" />
          </div>
        )}
      </div>
      <div className="">
      {similarRecipes?.length !== 0 ? (
        <div className="w-full flex flex-col justify-start items-center">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 w-full px-5 mb-5">
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
                className="flex justify-center items-center border border-content-color rounded-lg p-2 px-5 shadow-md bg-slate-50 text-slate-500 text-[.9rem]"
                onClick={() => pageChange({ direction: "back" })}
              >
                <FaChevronLeft className="text-content-color text-[1.2rem]" />{" "}
                Back
              </button>
              <button
                className="flex justify-center items-center border border-content-color rounded-lg p-2 px-5 shadow-md bg-slate-50 text-slate-500 text-[.9rem]"
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
              className="flex justify-center items-center border border-content-color rounded-lg p-2 px-5 shadow-md bg-slate-50 text-slate-500 text-[.9rem]"
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