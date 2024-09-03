import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// Register necessary components
ChartJS.register(ArcElement, Tooltip, Legend);

export default function Prediction({}) {
  // Define the percentage value
  const percentage = 89;

  // Define data for the Doughnut chart
  const data = {
    labels: ["Achieved", "Remaining"],
    datasets: [
      {
        label: "Prediction Results",
        data: [percentage, 100 - percentage],
        backgroundColor: ["#00e5ff", "#1a1a2e"], // Neon Cyan for the achieved part, background color for remaining
        borderColor: ["#00e5ff", "#1a1a2e"],
        borderWidth: 1,
      },
    ],
  };

  // Define options for the Doughnut chart
  const options = {
    cutout: "70%", // Makes the doughnut chart's inner radius bigger
    plugins: {
      legend: {
        display: false, // Hides the legend
      },
      tooltip: {
        enabled: false, // Disable tooltips to avoid clutter
      },
    },
  };

  return (
    <div className="prediction">
      <h2>Prediction Results: {`${percentage}%`}</h2>
      <div style={{ width: "200px", margin: "0 auto" }}>
        <Doughnut data={data} options={options} />
      </div>
      <ul>
        <li>61-80%: Needs Immediate Medical Attention</li>
        <li>41-60%: Needs a Check-up</li>
        <li>0-40%: Safe Range, No Medical Attention Needed</li>
      </ul>
    </div>
  );
}
