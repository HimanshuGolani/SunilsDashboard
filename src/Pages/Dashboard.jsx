import React, { useContext } from "react";
import Header from "../Component/Header";
import RealTimeVisualizer from "../Component/RealTimeVisualizer";
import Metrics from "../Component/Metrics";
import Prediction from "../Component/Prediction";
import { useAppState } from "../GlobalContext/AppContext";

function Dashboard() {
  const VisualizerData = [
    {
      title: "Blood SpO2 Levels :",
      data: useAppState().bloodSpo2,
    },
    {
      title: "Bio-Impedence Levels :",
      data: useAppState().bioImpendence,
    },
    {
      title: "Pulse Rate :",
      data: useAppState().pulseRate,
    },
    {
      title: "Body Temperature :",
      data: useAppState().bodyTemperature,
    },
  ];

  return (
    <div className="dashboard">
      <Header />

      <div className="gaps">
        {VisualizerData.map((item, index) => (
          <RealTimeVisualizer
            key={index}
            title={item.title}
            chartData={item.data}
          />
        ))}
      </div>

      <div className="metrics-prediction">
        <Metrics />
        <Prediction />
      </div>
    </div>
  );
}

export default Dashboard;
