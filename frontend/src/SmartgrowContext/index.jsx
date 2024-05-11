import { createContext, useState, useEffect } from "react";
import { useMqtt } from "./useMqtt";
import { useUtilsContext } from "./useUtilsContext";

const SmartgrowContext = createContext();

function SmartgrowProvider({ children }) {
  const { message, connectStatus, mqttConnect, mqttPublish } =
    useMqtt("smartgrow/#");

  const [sensorData, setSensorData] = useState({
    temperatura: null,
    humedad: null,
    co2: null,
    vpd: null,
    ph: null,
    ec: null,
    temperaturaAgua: null,
    ppf: null,
    ppfd: null,
    nivelAgua: null,
  });

  const [statusSystem, setStatusSystem] = useState({
    entrada: false,
    salida: false,
    recirculacion: false,
    mqtt: false,
  });

  const [openModal, setOpenModal] = useState({
    actuadores: false,
    control: false,
    grafica: false,
    loading: false,
  });

  const [valueModal, setValueModal] = useState("");
  const [dataGrafica, setDataGrafica] = useState({
    transformedData: [],
    endDate: new Date(),
    initDate: new Date(),
  });
  const [sensorModal, setSensorModal] = useState("");
  const [lastDates, setLastDates] = useState({
    scd40: new Date(),
    phEc: new Date(),
  });

  const { handleMqttMessage, FetchGetData, FetchGetActuadores } =
    useUtilsContext(
      setSensorData,
      sensorData,
      setLastDates,
      lastDates,
      setStatusSystem
    );

  useEffect(() => {
    mqttConnect();
    FetchGetActuadores();
    FetchGetData();
  }, []);

  useEffect(() => {
    if (message !== null) {
      handleMqttMessage(message);
    }
    setStatusSystem((prevState) => ({
      ...prevState,
      mqtt: connectStatus,
    }));
  }, [message, connectStatus]);

  return (
    <SmartgrowContext.Provider
      value={{
        sensorData,
        statusSystem,
        mqttPublish,
        openModal,
        setOpenModal,
        valueModal,
        setValueModal,
        sensorModal,
        setSensorModal,
        lastDates,
        dataGrafica,
        setDataGrafica,
      }}
    >
      {children}
    </SmartgrowContext.Provider>
  );
}

export { SmartgrowContext, SmartgrowProvider };
