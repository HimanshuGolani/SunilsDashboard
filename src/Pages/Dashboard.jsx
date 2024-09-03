import React from "react";
import Header from "../Component/Header";
import RealTimeVisualizer from "../Component/RealTimeVisualizer";
import Metrics from "../Component/Metrics";
import Prediction from "../Component/Prediction";

function Dashboard() {
  const VisualizerType = [
    "Blood SpO2 Levels :",
    "Bio- Impedence Levels :",
    "Pulse Rate :",
    "Body Temperature",
  ];
  return (
    <div className="dashboard">
      <Header />

      <div className="gaps wide-card">
        {VisualizerType.map((item, index) => (
          <RealTimeVisualizer key={index} title={item} />
        ))}
      </div>

      <Metrics />
      <Prediction />
    </div>
  );
}

export default Dashboard;
