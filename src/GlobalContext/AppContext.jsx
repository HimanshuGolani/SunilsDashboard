import React, { createContext, useContext, useEffect, useState } from "react";

const AppContext = createContext();

const AppFieldsProvider = ({ children }) => {
  const [bloodSpo2, setSpo2] = useState();
  const [bioImpendence, setBioImpedence] = useState();
  const [pulseRate, setPulseRate] = useState();
  const [bodyTemperature, setBodyTemp] = useState();
  const [fieldMessage, setFieldMessage] = useState("Loading...");
  const DATA_URL = "ws://54.83.118.12:5000";

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
        DATA_URL,
        fieldMessage,
        setFieldMessage,
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
