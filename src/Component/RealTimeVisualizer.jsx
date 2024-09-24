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
  Filler, // Import the Filler plugin
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler // Register the Filler plugin
);

function RealTimeVisualizer({ title, chartData }) {
  const [data, setData] = useState({
    labels: Array.from({ length: 10 }, (_, i) => i + 1), // Initial labels
    datasets: [
      {
        label: title,
        data: [], // Start with an empty data array
        fill: true,
        backgroundColor: "#1a1a1a", // Dark Gray background color for the line
        borderColor: "rgba(255, 140, 0, 0.8)", // Orange border color for the line
        borderWidth: 4,
        tension: 0.3, // Slightly jagged line
      },
    ],
  });

  useEffect(() => {
    if (typeof chartData === "number") {
      // Check if chartData is a number
      setData((prevState) => {
        const newData = [...prevState.datasets[0].data, chartData];

        // Keep only the last 10 entries for the data
        const last10Data = newData.slice(-10);

        // Update the labels accordingly
        const newLabels = last10Data.map((_, index) => index + 1);

        return {
          ...prevState,
          labels: newLabels, // Update labels dynamically
          datasets: [
            {
              ...prevState.datasets[0],
              data: last10Data, // Update the dataset with the last 10 entries
            },
          ],
        };
      });
    }
  }, [chartData]);

  return (
    <div
      style={{
        width: "90%",
        maxWidth: "600px",
        margin: "20px auto", // Ensure consistent margin in all screen sizes
        backgroundColor: "#1a1a1a", // Dark Gray card background
        padding: "20px",
        borderRadius: "15px",
        boxShadow: "0 6px 12px rgba(255, 140, 0, 0.3)", // Orange Glow
        transition: "transform 0.4s, box-shadow 0.4s", // Match the global transition duration
        overflow: "hidden",
      }}
      className="visualizer-card"
    >
      <h2
        style={{
          color: "#f5f5f5", // Light Gray text color
          textAlign: "center",
          marginBottom: "15px",
        }}
      >
        {`${title}`}
        {
          <span class="bg-blue-200 text-blue-700 px-2 py-1 rounded-md">
            {chartData}
          </span>
        }
      </h2>
      <div style={{ position: "relative", width: "100%", height: "100%" }}>
        <Line
          data={data}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              x: {
                display: true,
                ticks: {
                  color: "#f5f5f5", // Light Gray X-axis labels color for contrast
                },
              },
              y: {
                display: true,
                ticks: {
                  color: "#f5f5f5", // Light Gray Y-axis labels color for contrast
                },
                min: 0,
                max: 150, // Adjust as needed based on expected data range
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
          style={{ width: "100%", height: "100%" }}
        />
      </div>
    </div>
  );
}

export default RealTimeVisualizer;
