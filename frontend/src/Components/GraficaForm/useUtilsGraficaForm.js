const useUtilsGraficaForm = (endDate) => {
  const getTimeRangeMiliseconds = (timeRange) => {
    switch (timeRange) {
      case "1H":
        return 60 * 60 * 1000;
      case "6H":
        return 6 * 60 * 60 * 1000;
      case "1D":
        return 24 * 60 * 60 * 1000;
      case "1S":
        return 7 * 24 * 60 * 60 * 1000;
      case "1M":
        return 30 * 24 * 60 * 60 * 1000;
      case "ALL":
        return endDate;
    }
  };

  return { getTimeRangeMiliseconds };
};

export { useUtilsGraficaForm };
