import React, { useContext, useEffect } from "react";
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
      const response = await axios.get(`http://localhost:8000/data`);
      const data = response.data;
      console.log(data);

      // Extracting values from the response and updating the global state
      setSpo2(parseFloat(data.SpO2.N));
      setBioImpedence(parseFloat(data.boiImpendence.N));
      setPulseRate(parseFloat(data.beatsPerMinute.N));
      setBodyTemp(parseFloat(data.bodyTemperature.N));
    } catch (error) {
      console.error("Error fetching sensor data:", error);
    }
  };

  useEffect(() => {
    // Call fetchSensorData every 2 seconds
    const intervalId = setInterval(fetchSensorData, 2000);

    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);
  // const {
  //   bloodSpo2,
  //   bioImpendence,
  //   pulseRate,
  //   bodyTemperature,
  //   setSpo2,
  //   setBioImpedence,
  //   setPulseRate,
  //   setBodyTemp,
  //   DATA_URL,
  // } = useAppState();

  // const VisualizerData = [
  //   {
  //     title: "Blood SpO2 Levels :",
  //     data: bloodSpo2,
  //   },
  //   {
  //     title: "Bio-Impedence Levels :",
  //     data: bioImpendence,
  //   },
  //   {
  //     title: "Pulse Rate :",
  //     data: pulseRate,
  //   },
  //   {
  //     title: "Body Temperature :",
  //     data: bodyTemperature,
  //   },
  // ];

  // const fetchSensorData = () => {
  //   const socket = new WebSocket("ws://54.83.118.12:8000/ws");

  //   socket.onopen = () => {
  //     console.log("WebSocket connection established.");
  //   };

  //   socket.onmessage = (event) => {
  //     const message = JSON.parse(event.data);
  //     console.log("Received WebSocket message:", message);

  //     if (message.SensorData) {
  //       const data = message.SensorData;
  //       console.log("SensorData:", data);

  //       setPulseRate((prevData) => [...prevData, data.beatsPerMinute]);
  //       setBeatsAvg((prevData) => [...prevData, data.beatAvg]);
  //       setSpo2((prevData) => [...prevData, data.SpO2]);
  //       setBodyTemp((prevData) => [...prevData, data.bodyTemperature]);

  //       // Update the global state using the setters from the context
  //       setSpo2(data.SpO2);
  //       setBioImpedence(data.beatAvg); // Assuming beatAvg corresponds to bioImpedence
  //       setPulseRate(data.beatsPerMinute);
  //       setBodyTemp(data.bodyTemperature);
  //     } else {
  //       console.warn("Received unrecognized message format:", message);
  //     }
  //   };

  //   socket.onclose = () => {
  //     console.log("WebSocket connection closed.");
  //   };

  //   socket.onerror = (error) => {
  //     console.error("WebSocket error:", error);
  //   };
  // };

  // const fetchSensorData = async () => {
  //   const response = await axios.get(`http://localhost:8000/data`);
  //   console.log(response.data);

  //   // Update the global state using the setters from the context
  //   setSpo2(response.SpO2);
  //   setBioImpedence(response.beatAvg); // Assuming beatAvg corresponds to bioImpedence
  //   setPulseRate(response.beatsPerMinute);
  //   setBodyTemp(response.bodyTemperature);
  // };

  // useEffect(() => {
  //   // Call fetchSensorData every 2 seconds
  //   const intervalId = setInterval(fetchSensorData, 2000);

  //   // Clean up the interval when the component unmounts
  //   return () => clearInterval(intervalId);
  // }, []);

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
