const useLoadingModal = (setOpenModal, setDataGrafica) => {
  const fetchData = async (sensor, text) => {
    try {
      const response = await fetch(
        `http://200.122.207.134:8311/${sensor}?data=${text}`
      );
      const dataApi = await response.json();
      const transformedData = dataApi.map((item) => [
        new Date(item.fecha).getTime(),
        parseData(item, text),
      ]);
      const endDate = new Date(dataApi[dataApi.length - 1].fecha).getTime();
      const initDate = new Date(dataApi[0].fecha).getTime();
      setDataGrafica((prevDataGrafica) => ({
        ...prevDataGrafica,
        transformedData,
        endDate,
        initDate,
      }));
      setOpenModal((prevOpenModal) => ({
        ...prevOpenModal,
        loading: false,
        grafica: true,
      }));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const parseData = (item, text) => {
    switch (text) {
      case "temperatura":
      case "humedad":
      case "co2":
      case "VPD":
      case "ph":
      case "ec":
        return parseFloat(item[text].toFixed(2));
      default:
        return 0;
    }
  };

  return { fetchData };
};

export { useLoadingModal };
