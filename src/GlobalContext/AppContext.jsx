import React, { createContext, useContext, useState } from "react";

const AppContext = createContext();

const AppFieldsProvider = ({ children }) => {
  const [bloodSpo2, setSpo2] = useState([
    10, 20, 30, 20, 100, 10, 20, 30, 40, 60, 77, 80, 90,
  ]);
  const [bioImpendence, setBioImpedence] = useState([
    10, 20, 30, 20, 100, 10, 20, 30, 40, 60, 77, 80, 90,
  ]);
  const [pulseRate, setPulseRate] = useState([
    10, 20, 30, 20, 100, 10, 20, 30, 40, 60, 77, 80, 90,
  ]);
  const [bodyTemperature, setBodyTemp] = useState([
    10, 20, 30, 20, 100, 10, 20, 30, 40, 60, 77, 80, 90,
  ]);
  return (
    <AppContext.Provider
      value={{
        bloodSpo2,
        setSpo2,
        bioImpendence,
        setBioImpedence,
        pulseRate,
        setPulseRate,
        bodyTemperature,
        setBodyTemp,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppState = () => {
  return useContext(AppContext);
};

export default AppFieldsProvider;
