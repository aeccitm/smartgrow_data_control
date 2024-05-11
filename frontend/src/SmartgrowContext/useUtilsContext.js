const useUtilsContext = (
  setSensorData,
  sensorData,
  setLastDates,
  lastDates,
  setStatusSystem
) => {
  const API_BASE_URL = import.meta.env.VITE_BACKED_URL;

  const handleMqttMessage = (data) => {
    const topic = data.topic;
    if (topic === "smartgrow/sensores/scd40") {
      handleScd40Message(JSON.parse(data.message));
    } else if (topic === "smartgrow/sensores/phec") {
      handlePhEcMessage(JSON.parse(data.message));
    } else if (topic === "smartgrow/hidroponico/actuadores/estado") {
      handleActuadoresMessage(JSON.parse(data.message));
    }
  };

  const formatDateInit = (date, number) => {
    date.setHours(date.getHours() + number);
    return date;
  };

  const handleScd40Message = (data) => {
    setSensorData({
      ...sensorData,
      temperatura: parseValue(data.temperatura, 2),
      humedad: parseValue(data.humedad, 2),
      co2: parseValue(data.co2, 0),
      vpd: parseValue(data.VPD, 2),
    });
    setLastDates({ ...lastDates, scd40: formatDateInit(new Date(), 0) });
  };

  const handlePhEcMessage = (data) => {
    setSensorData({
      ...sensorData,
      ph: parseValue(data.ph, 2),
      ec: parseValue(data.ec, 1),
      temperaturaAgua: parseValue(data.temperatura, 2),
    });
    setLastDates({ ...lastDates, phEc: formatDateInit(new Date(), 0) });
  };

  const handleActuadoresMessage = (data) => {
    setStatusSystem({
      entrada: !data.entrada_de_agua,
      salida: !data.salida_de_agua,
      recirculacion: !data.recirculacion,
    });
  };

  const FetchGet = async (endpoint) => {
    try {
      const response = await fetch(`${API_BASE_URL}/${endpoint}`);
      return await response.json();
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const FetchGetActuadores = async () => {
    const data = await FetchGet("actuadores");
    data.forEach(({ text, estado }) => updateActuadores(text, estado));
  };

  const FetchGetData = async () => {
    const dataScd40 = await FetchGet("scd40/last_data");
    const dataPhEc = await FetchGet("phec/last_data");
    try {
      setSensorData({
        ...sensorData,
        temperatura: parseValue(dataScd40[0].temperatura, 2),
        humedad: parseValue(dataScd40[0].humedad, 2),
        co2: parseValue(dataScd40[0].co2, 0),
        vpd: parseValue(dataScd40[0].VPD, 2),
        ph: parseValue(dataPhEc[0].ph, 2),
        ec: parseValue(dataPhEc[0].ec, 1),
        temperaturaAgua: parseValue(dataPhEc[0].temperatura, 2),
      });
      setLastDates({
        ...lastDates,
        scd40: formatDateInit(new Date(dataScd40[0].fecha), 5),
        phEc: formatDateInit(new Date(dataPhEc[0].fecha), 5),
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const parseValue = (value, decimalPlaces) =>
    parseFloat(value).toFixed(decimalPlaces);

  const updateActuadores = (item, status) => {
    switch (item) {
      case "salida de agua":
        setStatusSystem((prev) => ({ ...prev, entrada: status }));
        break;
      case "entrada de agua":
        setStatusSystem((prev) => ({ ...prev, salida: status }));
        break;
      case "recirculacion":
        setStatusSystem((prev) => ({ ...prev, recirculacion: status }));
        break;
      default:
        break;
    }
  };
  return { handleMqttMessage, FetchGetData, FetchGetActuadores };
};

export { useUtilsContext };
