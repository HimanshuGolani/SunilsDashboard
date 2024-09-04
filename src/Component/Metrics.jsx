import React from "react";
import { FaHeartbeat, FaThermometerHalf, FaTint, FaWind } from "react-icons/fa";
import { useAppState } from "../GlobalContext/AppContext";

export default function Metrics() {
  const { bloodSpo2, bioImpendence, pulseRate, bodyTemperature } =
    useAppState();

  return (
    <div className="metrics center">
      <div className="metric-item">
        <FaWind className="metric-icon" />
        <span className="metric-label">Bio-Impedance Levels:</span>
        <span className="metric-value">{bioImpendence} Ohms of Resistance</span>
      </div>
      <div className="metric-item">
        <FaTint className="metric-icon" />
        <span className="metric-label">Blood SpO2 Levels:</span>
        <span className="metric-value">{bloodSpo2}% Oxygen Adsorption</span>
      </div>
      <div className="metric-item">
        <FaHeartbeat className="metric-icon" />
        <span className="metric-label">Pulse Rate:</span>
        <span className="metric-value">{pulseRate} beats/minute</span>
      </div>
      <div className="metric-item">
        <FaThermometerHalf className="metric-icon" />
        <span className="metric-label">Body Temperature:</span>
        <span className="metric-value">{bodyTemperature}°C</span>
      </div>
    </div>
  );
}
