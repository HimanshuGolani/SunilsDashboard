import React, { createContext, useContext, useState } from "react";

const AppContext = createContext();

const AppFieldsProvider = ({ children }) => {
  const [bloodSpo2, setSpo2] = useState([]);
  const [bioImpendence, setBioImpedence] = useState([]);
  const [pulseRate, setPulseRate] = useState([]);
  const [bodyTemperature, setBodyTemp] = useState([]);
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
