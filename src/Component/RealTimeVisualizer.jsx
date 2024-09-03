import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register the components you need
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function RealTimeVisualizer({ title, chartData }) {
  const [data, setData] = useState({
    labels: Array.from({ length: 50 }, (_, i) => i + 1),
    datasets: [
      {
        data: chartData,
        fill: true,
        backgroundColor: "rgba(255, 0, 0, 0.8)", // Red background color for the line
        borderColor: "rgba(255, 0, 0, 0.8)", // Red border color for the line
        borderWidth: 2,
        tension: 0.1, // Slightly jagged line
      },
    ],
  });

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     const newData = fill on the method that withh fill the data in the chart continuesly;
  //     setData((prevState) => ({
  //       ...prevState,
  //       datasets: [
  //         {
  //           ...prevState.datasets[0],
  //           data: newData,
  //         },
  //       ],
  //     }));
  //   }, 1000); // Update data every second

  //   return () => clearInterval(interval);
  // }, []);

  return (
    <div
      style={{
        width: "55dvw",
        backgroundColor: "#0f3460", // Deep blue card background
        padding: "20px",
        borderRadius: "15px",
        boxShadow: "0 6px 12px rgba(0, 229, 255, 0.3)", // Neon Cyan Glow
        transition: "transform 0.4s, box-shadow 0.4s", // Match the global transition duration
      }}
      className="visualizer-card" // Add class name for potential further styling
    >
      <h2
        style={{
          color: "#e0e0e0", // Light gray text color
          textShadow: "0 0 5px #00e5ff, 0 0 10px #00e5ff", // Glowing text effect
        }}
      >
        {title}
      </h2>
      <Line
        data={data}
        options={{
          responsive: true,
          scales: {
            x: {
              display: false, // Hide x-axis labels
            },
            y: {
              display: true,
              ticks: {
                color: "#e0e0e0", // Light gray Y-axis labels color for contrast
              },
              min: 0,
              max: 120,
            },
          },
          plugins: {
            legend: {
              display: false, // Hide legend
            },
          },
        }}
      />
    </div>
  );
}

// Function to generate random heart rate data with sharp peaks and valleys
function generateHeartRateData() {
  const data = [];
  for (let i = 0; i < 50; i++) {
    const value = i % 10 === 0 ? 120 : 60 + Math.random() * 40; // Sharp peaks every 10th value
    data.push(value);
  }
  return data;
}

export default RealTimeVisualizer;
