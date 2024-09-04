import React, { useContext, useEffect } from "react";
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

  const {
    bloodSpo2,
    bioImpendence,
    pulseRate,
    bodyTemperature,
    setSpo2,
    setBioImpedence,
    setPulseRate,
    setBodyTemp,
    DATA_URL,
    beatsAvg,
    setBeatsAvg,
  } = useAppState();

  const fetchSensorData = () => {
    const socket = new WebSocket("ws://54.83.118.12:8000/ws");

    socket.onopen = () => {
      console.log("WebSocket connection established.");
    };

    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      console.log("Received WebSocket message:", message);

      if (message.SensorData) {
        const data = message.SensorData;
        console.log("SensorData:", data);

        setPulseRate((prevData) => [...prevData, data.beatsPerMinute]);
        setBeatsAvg((prevData) => [...prevData, data.beatAvg]);
        setSpo2((prevData) => [...prevData, data.SpO2]);
        setBodyTemp((prevData) => [...prevData, data.bodyTemperature]);

        // Update the global state using the setters from the context
        setSpo2(data.SpO2);
        setBioImpedence(data.beatAvg); // Assuming beatAvg corresponds to bioImpedence
        setPulseRate(data.beatsPerMinute);
        setBodyTemp(data.bodyTemperature);
      } else {
        console.warn("Received unrecognized message format:", message);
      }
    };

    socket.onclose = () => {
      console.log("WebSocket connection closed.");
    };

    socket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };
  };

  useEffect(() => {
    // Call fetchSensorData every 2 seconds
    const intervalId = setInterval(fetchSensorData, 2000);

    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);

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

      <h2 className="report-heading">Plethysmography Report</h2>
      <div className="metrics-prediction">
        <Metrics />
        <Prediction />
      </div>
    </div>
  );
}

export default Dashboard;
