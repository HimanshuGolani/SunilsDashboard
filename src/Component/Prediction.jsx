import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Prediction() {
  const percentage = 89;

  const data = {
    labels: ["Achieved", "Remaining"],
    datasets: [
      {
        label: "Prediction Results",
        data: [percentage, 100 - percentage],
        backgroundColor: ["#ff8c00", "#2e2e2e"], // Orange for the achieved part, dark gray for remaining
        borderColor: ["#ff8c00", "#2e2e2e"],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    cutout: "70%", // Makes the doughnut chart's inner radius bigger
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
      },
    },
  };

  return (
    <div className="prediction">
      <h2 style={{ color: "#f5f5f5" }}>
        Prediction Results: {`${percentage}%`}
      </h2>
      <div style={{ width: "200px", margin: "0 auto" }}>
        <Doughnut data={data} options={options} />
      </div>
      <ul style={{ color: "#f5f5f5" }}>
        <li>61-80%: Needs Immediate Medical Attention</li>
        <li>41-60%: Needs a Check-up</li>
        <li>0-40%: Safe Range, No Medical Attention Needed</li>
      </ul>
    </div>
  );
}
