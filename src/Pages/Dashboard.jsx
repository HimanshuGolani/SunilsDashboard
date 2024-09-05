import React, { useEffect } from "react";
import Header from "../Component/Header";
import RealTimeVisualizer from "../Component/RealTimeVisualizer";
import Metrics from "../Component/Metrics";
import Prediction from "../Component/Prediction";
import { useAppState } from "../GlobalContext/AppContext";
import axios from "axios";

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

  const fetchSensorData = async () => {
    try {
      const response = await axios.get("aapna-url-dal-do");
      const data = response.data;
      console.log(data);

      // Extracting values from the response and updating the global state
      setSpo2(parseFloat(data.SpO2?.N) || 0); // If SpO2 exists, set the value, otherwise set to 0
      setBioImpedence(parseFloat(data.boiImpendence?.N) || 0); // Same for boiImpendence
      setPulseRate(parseFloat(data.beatsPerMinute?.N) || 0); // Same for beatsPerMinute
      setBodyTemp(parseFloat(data.bodyTemperature?.N) || 0); // Same for bodyTemperature
    } catch (error) {
      console.error("Error fetching sensor data:", error);

      // If there's an error, set all values to 0
      setSpo2(0);
      setBioImpedence(0);
      setPulseRate(0);
      setBodyTemp(0);
    }
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
