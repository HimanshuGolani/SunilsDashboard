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
    labels: Array.from({ length: 10 }, (_, i) => i + 1),
    datasets: [
      {
        data: chartData,
        fill: true,
        backgroundColor: "#1a1a1a", // Vibrant Orange background color for the line
        borderColor: "rgba(255, 140, 0, 0.8)", // Orange border color for the line
        borderWidth: 4,
        tension: 0.3, // Slightly jagged line
      },
    ],
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const newData = generateHeartRateData();
      setData((prevState) => ({
        ...prevState,
        datasets: [
          {
            ...prevState.datasets[0],
            data: newData,
          },
        ],
      }));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        width: "30dvw",
        backgroundColor: "#1a1a1a", // Dark Gray card background
        padding: "20px",
        borderRadius: "15px",
        boxShadow: "0 6px 12px rgba(255, 140, 0, 0.3)", // Orange Glow
        transition: "transform 0.4s, box-shadow 0.4s", // Match the global transition duration
      }}
      className="visualizer-card"
    >
      <h2
        style={{
          color: "#f5f5f5", // Light Gray text color
        }}
      >
        {`${title} `}
      </h2>
      <Line
        data={data}
        options={{
          responsive: true,
          scales: {
            x: {
              display: false,
            },
            y: {
              display: true,
              ticks: {
                color: "#f5f5f5", // Light Gray Y-axis labels color for contrast
              },
              min: 0,
              max: 120,
            },
          },
          plugins: {
            legend: {
              display: false,
            },
            tooltip: {
              backgroundColor: "rgba(255, 140, 0, 0.8)", // Matching tooltip background
              titleColor: "#fff", // White text in tooltip for clarity
              bodyColor: "#fff", // White text in tooltip body
              borderColor: "#fff", // Border to distinguish tooltip
              borderWidth: 1,
            },
          },
        }}
        style={{ width: "100%", height: "400px" }}
      />
    </div>
  );
}

function generateHeartRateData() {
  const data = [];
  for (let i = 0; i < 50; i++) {
    const value = i % 10 === 0 ? 120 : 60 + Math.random() * 40; // Sharp peaks every 10th value
    data.push(value);
  }
  return data;
}

export default RealTimeVisualizer;
