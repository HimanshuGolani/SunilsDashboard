import React, { useEffect } from "react";
import Header from "../Component/Header";
import RealTimeVisualizer from "../Component/RealTimeVisualizer";
import Metrics from "../Component/Metrics";
import Prediction from "../Component/Prediction";
import { useAppState } from "../GlobalContext/AppContext";

export default function Dashboard() {
  const {
    bloodSpo2,
    bioImpendence,
    pulseRate,
    bodyTemperature,
    setSpo2,
    setBioImpedence,
    setPulseRate,
    setBodyTemp,
    fieldMessage,
    setFieldMessage,
  } = useAppState();

  const VisualizerData = [
    {
      title: "Blood SpO2 Levels:",
      data: bloodSpo2,
    },
    {
      title: "Bio-Impedance Levels:",
      data: bioImpendence,
    },
    {
      title: "Pulse Rate:",
      data: pulseRate,
    },
    {
      title: "Body Temperature:",
      data: bodyTemperature,
    },
  ];

  const fetchSensorData = () => {
    const socket = new WebSocket("ws://54.83.118.12:5000");

    socket.onopen = () => {
      console.log("WebSocket connection established.");
    };

    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      console.log("Received WebSocket message:", message);

      if (message) {
        const { SpO2, bioImpedence, beatsPerMinute, bodyTemperature } =
          message.SensorData;
        console.log(SpO2, bioImpedence, beatsPerMinute, bodyTemperature);

        console.log("SensorData:", message);

        // Update the global state using the setters from the context
        setSpo2(parseFloat(SpO2));
        setBioImpedence(parseFloat(bioImpedence));
        setPulseRate(parseFloat(beatsPerMinute));
        setBodyTemp(parseFloat(bodyTemperature));
      } else {
        setSpo2(0);
        setBioImpedence(0);
        setPulseRate(0);
        setBodyTemp(0);
      }
    };

    socket.onclose = () => {
      console.log("WebSocket connection closed.");
      setSpo2(0);
      setBioImpedence(0);
      setPulseRate(0);
      setBodyTemp(0);
    };

    socket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    // Clean up the WebSocket connection when the component unmounts
    return () => {
      if (socket.readyState === WebSocket.OPEN) {
        socket.close();
      }
    };
  };

  useEffect(() => {
    // Establish WebSocket connection and start receiving data
    const cleanup = fetchSensorData();

    // Clean up WebSocket when the component unmounts
    return cleanup;
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
        {/* New m iddle panel */}
        <div className="middle-panel">
          <h3 className="report-heading">Algorithmic Result</h3>
          <div className="field">
            <label>Real Time Result:</label>
            <span>{fieldMessage}</span>
          </div>
        </div>
        <Prediction />
      </div>
    </div>
  );
}
