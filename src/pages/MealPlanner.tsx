import React, { useEffect, useRef, useState } from "react";
import FilterBarActive from "../components/FilterBarActive";
import {
  EPreferredMealTime,
  EPreferredMealTimeFilter,
  EPreferredMealTimeForMealPlan,
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
  useMyMealPlanQuery,
} from "../api/slices/mealPlanner.slices";
import DisplayCard from "../components/DisplayCard";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
import AiPreImage from "../assets/icons/ai.png";
import AiAfterImage from "../assets/icons/ai2.png";
import IngredientIcon from "../assets/icons/apple-icon.png";

import { BarChart } from '@mui/x-charts/BarChart';
// import { LineChart } from '@mui/x-charts/LineChart';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer } from 'recharts';

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

  const pageSize = 10;
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
  } = useGetShoppingListQuery();

  const { data: nutritionGoal } = useGetNutritionGoalQuery();

  const scrollableDivRef = useRef(null);

  const handleWheel = (event: any) => {
    const wheelDelta = Math.max(-1, Math.min(1, event.deltaY || -event.detail));
    if (scrollableDivRef.current) {
      (scrollableDivRef.current as any).scrollLeft += wheelDelta * 30;
    }
  };

  const skeletonCount = isLoading ? 10 : goals?.length || 0;

  const { data: myMeal } = useMyMealPlanQuery();

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




  const cData = [(myMeal?.nutrition?.calories || 0) * 0.129598, myMeal?.nutrition?.protein_g || 0, myMeal?.nutrition?.carbohydrates_total_g || 0, myMeal?.nutrition?.fat_total_g || 0,];
  const iData = [nutritionGoal?.calories || 0, nutritionGoal?.protein || 0, nutritionGoal?.carbs || 0, nutritionGoal?.fat || 0,];
  const xLabels = [
    'Calories',
    'Protein',
    'Carbs',
    'Fat',
  ];


  // const chartData = {
  //   labels: ["Calories", "Protein", "Carbs", "Fat"],
  //   datasets: [
  //     {
  //       label: "Current",
  //       data: [
  //         (goals?.nutrition?.calories || 0) * 0.129598,
  //         goals?.nutrition?.protein_g || 0,
  //         goals?.nutrition?.carbohydrates_total_g || 0,
  //         goals?.nutrition?.fat_total_g || 0,

  //       ],
  //       backgroundColor: "rgba(255, 0, 0, 0.2)",
  //       borderColor: "rgba(255, 0, 0, 1)",
  //       borderWidth: 1,
  //     },
  //     {
  //       label: "Ideal",
  //       data: [
  //         nutritionGoal?.calories || 0,
  //         nutritionGoal?.protein || 0,
  //         nutritionGoal?.carbs || 0,
  //         nutritionGoal?.fat || 0,
  //       ],
  //       backgroundColor: "rgba(0, 0, 255, 0.2)",
  //       borderColor: "rgba(0, 0, 255, 1)",
  //       borderWidth: 1,
  //     },
  //   ],
  // };

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

  const skeletonCounts = isLoading
    ? pagination.limit
    : ingredientList?.length || 0;

    const weightData = [
      { date: '2024-09-12', value: 2 },
      { date: '2024-09-13', value: 5.5 },
      { date: '2024-09-14', value: 2 },
      { date: '2024-09-15', value: 8.5 },
      { date: '2024-09-16', value: 1.5 },
      { date: '2024-09-17', value: 5 },
    ];

  return (
    <div className="w-full flex flex-grow flex-col justify-start items-center pt-4 min-h-[100%-56px]">
      <div className="w-full px-5">
        <FilterBarActive
          data={["all", ...Object.values(EPreferredMealTimeForMealPlan)]}
          selectedChip={filter}
          setSelectedChip={(filter) => {
            setFilter(filter);
          }}
        />
      </div>
      <div className="w-full max-w-md mt-3 px-5">
        {!isLoading && nutritionGoal && (
          // <Bar data={chartData} options={options} />
          <BarChart
            width={500}
            height={300}
            series={[
              { data: cData, label: 'current nutrition', id: 'pvId', stack: 'total' },
              { data: iData, label: 'idle nutrition', id: 'uvId', stack: 'total' },
            ]}
            xAxis={[{ data: xLabels, scaleType: 'band' }]}
          />
        )}
        {/* <LineChart
          xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
          series={[
            {
              data: [2, 5.5, 2, 8.5, 1.5, 5],
              area: true,
              color: "#0E9F6E",
            },
          ]}
          width={500}
          height={300}
        /> */}2
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={weightData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="date" 
              tickFormatter={(tick: string) => new Date(tick).toLocaleDateString()}
            />
            <YAxis />
            <RechartsTooltip labelFormatter={(label: string) => new Date(label).toLocaleDateString()} />
            <Line type="monotone" dataKey="value" stroke="#0E9F6E" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="w-full flex flex-col justify-start items-start mt-5 px-5">
        <div className="w-full flex justify-between items-center text-[1.4rem]">
          <h3 className="font-semibold mb-1">Recipes</h3>
          <Sheet>
            <SheetTrigger asChild>
              <FaShoppingCart className="text-content-color text-[1.4rem]" />
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle className="pb-2">Shopping List</SheetTitle>
              </SheetHeader>
              <div className="flex flex-col h-full justify-start items-start w-full pt-3 gap-3 overflow-y-auto pb-8"
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
                <DisplayCard post={post.recipe} key={index} />
              ))}
          </div>
        ) : (
          <div className="w-full flex justify-center">
            <img src={EmptyListIcon} alt="pic" className="w-[75%] sm:w-[50%]" />
          </div>
        )}
      </div>
      <div className="flex flex-col justify-start items-start">
        <div className="w-full px-5 flex justify-between items-center gap-1 mb-2">
          <div className="flex justify-start items-center">
            <img src={AiPreImage} alt="pic" className="w-4" />
            <p className="font-bold">AI Recipes</p>
          </div>
          <img src={AiAfterImage} alt="pic" className="w-6" />
        </div>
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
