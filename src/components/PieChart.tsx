import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, Tooltip, Legend, ArcElement } from "chart.js";

ChartJS.register(Tooltip, Legend, ArcElement);

interface PieChartProps {
  pieChartData: any;
}

function PieChart({ pieChartData }: PieChartProps) {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    layout: {
      padding: {
        top: 20,
        bottom: 20,
      },
    },
    plugins: {
      legend: {
        display: true,
        position: "bottom" as const,
        labels: {
          boxWidth: 10,
          boxHeight: 12,
          padding: 15,
          font: {
            size: 12,
            family: "Arial",
            style: "italic" as const,
            weight: "500",
          } as any,
          color: "#333",
          usePointStyle: true,
        },
      },
      tooltip: {
        backgroundColor: "rgba(0,0,0,0.8)",
        titleFont: {
          size: 16,
          family: "Arial",
        },
        bodyFont: {
          size: 14,
          family: "Arial",
        },
        padding: 10,
        borderWidth: 1,
        borderColor: "#ddd",
        cornerRadius: 5,
      },
    },
  };

  return (
    <div className="w-full h-[280px] xxs:h-[350px] flex flex-col justify-center items-center">
      <Doughnut options={options} data={pieChartData} />
    </div>
  );
}

export default PieChart;