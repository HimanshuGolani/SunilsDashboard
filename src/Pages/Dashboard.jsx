import React, { useContext, useEffect } from "react";
import Header from "../Component/Header";
import RealTimeVisualizer from "../Component/RealTimeVisualizer";
import Metrics from "../Component/Metrics";
import Prediction from "../Component/Prediction";
import { useAppState } from "../GlobalContext/AppContext";

function Dashboard() {
  const {
    bloodSpo2,
    bioImpendence,
    pulseRate,
    bodyTemperature,
    setSpo2,
    setBioImpedence,
    setPulseRate,
    setBodyTemp,
  } = useAppState();

  useEffect(() => {
    const websocket = new WebSocket("ws://54.83.118.12/ws");

    websocket.onopen = () => {
      console.log("WebSocket connection opened");
    };

    websocket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);

        // Assuming the WebSocket data has the structure { bloodSpo2, bioImpendence, pulseRate, bodyTemperature }
        if (data.bloodSpo2) setSpo2(data.bloodSpo2);
        if (data.bioImpendence) setBioImpedence(data.bioImpendence);
        if (data.pulseRate) setPulseRate(data.pulseRate);
        if (data.bodyTemperature) setBodyTemp(data.bodyTemperature);
      } catch (error) {
        console.error("Error parsing WebSocket message:", error);
      }
    };

    websocket.onerror = (event) => {
      console.error("WebSocket error:", event);
      // Display or log the error to alert you of connection issues
    };

    websocket.onclose = (event) => {
      console.log("WebSocket connection closed:", event);
    };

    return () => {
      websocket.close(); // Clean up WebSocket connection on component unmount
    };
  }, []);

  return (
    <div className="dashboard">
      <Header />

      <div className="gaps">
        <RealTimeVisualizer title="Blood SpO2 Levels" chartData={bloodSpo2} />
        <RealTimeVisualizer
          title="Bio-Impedence Levels"
          chartData={bioImpendence}
        />
        <RealTimeVisualizer title="Pulse Rate" chartData={pulseRate} />
        <RealTimeVisualizer
          title="Body Temperature"
          chartData={bodyTemperature}
        />
      </div>

      <div className="metrics-prediction">
        <Metrics />
        <Prediction />
      </div>
    </div>
  );
}

export default Dashboard;
