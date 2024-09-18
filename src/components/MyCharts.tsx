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
import 'react-slideshow-image/dist/styles.css';

interface CustomIndicatorProps {
  active: boolean;
  onClick: () => void;
}

const CustomIndicator: React.FC<CustomIndicatorProps> = ({ active, onClick }) => (
  <div
    onClick={onClick}
    style={{
      width: '10px',
      height: '10px',
      borderRadius: '50%',
      backgroundColor: active ? '#0E9F6E' : '#D1D5DB',
      display: 'inline-block',
      margin: '0 5px',
      cursor: 'pointer',
    }}
  />
);

function MyCharts() {
  const {
    data: mealPlan,
    isLoading: mealPlanLoading,
    isError,
  } = useMyMealPlanQuery();

  const { data: nutritionGoal } = useGetNutritionGoalQuery();
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideRef = useRef<any>(null);

  const { data: goals, isLoading } = useGetMealPlanQuery({
    mealTime: EPreferredMealTime.breakfast,
    page: 1,
  });

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

  const goToSlide = (index: number) => {
    if (slideRef.current) {
      slideRef.current.goTo(index);
    }
  };

  const renderIndicator = (index: number): React.ReactNode => (
    <CustomIndicator
      active={index === currentSlide}
      onClick={() => goToSlide(index)}
    />
  );

  return (
    <div className="w-full mt-3 px-5">
      <Slide
        ref={slideRef}
        duration={9000}
        transitionDuration={100}
        arrows={false}
        autoplay
        pauseOnHover
        indicators={(index) => renderIndicator(index as number)}
        onChange={(oldIndex, newIndex) => setCurrentSlide(newIndex)}
      >
        <div className="w-full">
          {!isLoading && nutritionGoal && (
            <Bar data={chartData} height={50} width="100%" options={options} />
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

            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="date"
              tickFormatter={(tick: string) =>
                new Date(tick).toLocaleDateString()
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

            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="date"
              tickFormatter={(tick: string) =>
                new Date(tick).toLocaleDateString()
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
  );
}

export default MyCharts;