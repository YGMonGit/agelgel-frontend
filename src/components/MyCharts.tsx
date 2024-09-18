import { ChartOptions } from "chart.js";
import React, { useRef, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  AreaChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  ReferenceLine,
  Area,
} from "recharts";
import {
  useGetMealPlanQuery,
  useGetNutritionGoalQuery,
  useMyMealPlanQuery,
} from "../api/slices/mealPlanner.slices";
import { EPreferredMealTime } from "../api/types/recipe.type";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import { IoStatsChart } from "react-icons/io5";
import { BiStats } from "react-icons/bi";
import { Skeleton } from "./ui/skeleton";

interface CustomIndicatorProps {
  active: boolean;
  onClick: () => void;
}

const CustomIndicator: React.FC<CustomIndicatorProps> = ({
  active,
  onClick,
}) => (
  <div
    // onClick={onClick}
    style={{
      width: "10px",
      height: "10px",
      borderRadius: "50%",
      backgroundColor: active ? "#0E9F6E" : "#D1D5DB",
      display: "inline-block",
      margin: "0 5px",
      cursor: "pointer",
    }}
  />
);

function MyCharts() {
  const {
    data: mealPlan,
    isLoading
  } = useMyMealPlanQuery();

  const { data: nutritionGoal } = useGetNutritionGoalQuery();
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideRef = useRef<any>(null);

  const options: ChartOptions<"bar"> = {
    scales: {
      y: {
        beginAtZero: true,
        position: "left",
        ticks: {
          color: "#0E9F6E",
        },
        grid: {
          display: false,
        },
      },
      y1: {
        beginAtZero: true,
        position: "right",
        ticks: {
          color: "#3DDC84",
        },
        grid: {
          drawOnChartArea: false,
          display: false,
        },
      },
    },
  };

  const calculateFatPercentage = (weight: number): number => {
    const baseFatPercentage = 20;
    const factor = 0.1;
    return baseFatPercentage + (weight - 70) * factor;
  };

  const chartData = {
    labels: ["Calories", "Protein", "Carbs", "Fat"],
    datasets: [
      {
        label: "Current",
        data: [
          (mealPlan?.nutrition?.calories || 0) * 0.129598,
          mealPlan?.nutrition?.protein_g || 0,
          mealPlan?.nutrition?.carbohydrates_total_g || 0,
          mealPlan?.nutrition?.fat_total_g || 0,
        ],
        backgroundColor: "#0E9F6E",
        borderColor: "#0E9F6E",
        borderWidth: 0,
        yAxisID: "y",
      },
      {
        label: "Ideal",
        data: [
          nutritionGoal?.calories || 0,
          nutritionGoal?.protein || 0,
          nutritionGoal?.carbs || 0,
          nutritionGoal?.fat || 0,
        ],
        backgroundColor: "#3DDC84",
        borderColor: "#3DDC84",
        borderWidth: 0,
        yAxisID: "y1",
      },
    ],
  };

  return (
    <div className="w-full flex flex-col justify-start items-start mt-2 gap-3">
      <div className="w-full flex justify-between items-center px-5">
        <div className="flex justify-center items-center gap-2">
          <IoStatsChart className="text-content-color text-[1.3rem]" />
          <p className="text-[1.2rem] text-slate-600 font-bold italic">Statistics</p>
        </div>
      </div>
      <div className="w-full mt-3 px-5">
        <Slide
          ref={slideRef}
          transitionDuration={50}
          arrows={false}
          autoplay={false}
          pauseOnHover
          indicators={(index) => (
            <div
              className={`w-[15px] h-[15px] rounded-full ${
                index === currentSlide ? "bg-[#0E9F6E]" : "bg-[#D1D5DB]"
              } inline-block mx-1 cursor-pointer`}
            ></div>
          )}
          onChange={(oldIndex, newIndex) => setCurrentSlide(newIndex)}
        >
          <div className="w-full">
            {(!isLoading && nutritionGoal) ? (
              <Bar data={chartData} height={50} width="100%" className=" min-h-[300px]" options={options} />
            ) : (
              <div className="w-full flex justify-center items-end gap-2">
                <Skeleton className="h-[170px] w-[8%]" />
                <Skeleton className="h-[150px] w-[8%] mr-4" />
                <Skeleton className="h-[180px] w-[8%]" />
                <Skeleton className="h-[200px] w-[8%] mr-4" />
                <Skeleton className="h-[140px] w-[8%]" />
                <Skeleton className="h-[190px] w-[8%] mr-4" />
                <Skeleton className="h-[220px] w-[8%]" />
                <Skeleton className="h-[110px] w-[8%]" />
              </div>
            )}
          </div>

          <ResponsiveContainer width="105%" height="100%" className="-ml-7">
            <AreaChart
              data={mealPlan?.userStats?.weights.map((status: any) => ({
                date: status.date,
                value: status.value,
              }))}
            >
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#0E9F6E" stopOpacity={1} />
                  <stop offset="100%" stopColor="#97FFDC" stopOpacity={1} />
                </linearGradient>
              </defs>

              <text
                x="110"
                y="30"
                textAnchor="middle"
                dominantBaseline="middle"
                color="#999"
                style={{ fill: '#94a3b8' }}
                className="text-[1.1rem] text-slate-400 italic"
              >
                Weight
              </text>

              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="date"
                tickFormatter={(tick: string) =>
                  new Date(tick).toLocaleDateString(undefined, { day: 'numeric' })
                }
              />
              <YAxis />
              <RechartsTooltip
                labelFormatter={(label: string) =>
                  new Date(label).toLocaleDateString()
                }
              />
              <Area
                type="monotone"
                dataKey="value"
                stroke="#0E9F6E"
                fill="url(#colorValue)"
                strokeWidth={2}
              />
              <ReferenceLine y={70} stroke="red" strokeDasharray="3 3" />
              <ReferenceLine y={50} stroke="blue" strokeDasharray="3 3" />
            </AreaChart>
          </ResponsiveContainer>

          <ResponsiveContainer width="105%" height="100%" className="-ml-7">
            <AreaChart
              data={mealPlan?.userStats?.weights.map((status: any) => ({
                date: status.date,
                value: calculateFatPercentage(status.value),
              }))}
            >
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#0E9F6E" stopOpacity={1} />
                  <stop offset="100%" stopColor="#97FFDC" stopOpacity={1} />
                </linearGradient>
              </defs>

              <text
                x="110"
                y="30"
                textAnchor="middle"
                dominantBaseline="middle"
                color="#999"
                style={{ fill: '#94a3b8' }}
                className="text-[1.1rem] text-slate-400 italic"
              >
                Fat
              </text>

              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="date"
                tickFormatter={(tick: string) =>
                  new Date(tick).toLocaleDateString(undefined, { day: 'numeric' })
                }
              />
              <YAxis />
              <RechartsTooltip
                labelFormatter={(label: string) =>
                  new Date(label).toLocaleDateString()
                }
              />
              <Area
                type="monotone"
                dataKey="value"
                stroke="#0E9F6E"
                fill="url(#colorValue)"
                strokeWidth={2}
              />
              <ReferenceLine y={70} stroke="red" strokeDasharray="3 3" />
            </AreaChart>
          </ResponsiveContainer>
        </Slide>
      </div>
    </div>
  );
}

export default MyCharts;
