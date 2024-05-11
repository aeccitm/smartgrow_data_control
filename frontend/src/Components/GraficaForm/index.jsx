import { useState, useEffect, useContext } from "react";
import { SmartgrowContext } from "../../SmartgrowContext";

import GraficaFormUI from "./GraficaFormUI";
import { useUtilsGraficaForm } from "./useUtilsGraficaForm";

const GraficaForm = ({ text, sensor }) => {
  const { setOpenModal, openModal, dataGrafica, setDataGrafica } =
    useContext(SmartgrowContext);
  const [timeRange, setTimeRange] = useState("ALL");
  const [chartData, setChartData] = useState({
    series: [
      {
        data: dataGrafica.transformedData,
      },
    ],
    options: {
      chart: {
        type: "line",
        stacked: false,
        height: 350,
        zoom: {
          type: "x",
          enabled: true,
          autoScaleYaxis: true,
        },
        toolbar: {
          autoSelected: "zoom",
        },
      },
      stroke: {
        width: 3,
      },
      colors: ["#6A994E"],
      dataLabels: {
        enabled: false,
      },
      markers: {
        size: 0,
      },
      xaxis: {
        type: "datetime",
        min: dataGrafica.initDate,
        tickAmount: 6,
        labels: {
          style: {
            fontSize: "12px",
          },
        },
      },
      // yaxis: {
      //   labels: {
      //     style: {
      //       fontSize: "12px",
      //     },
      //   },
      // },
      tooltip: {
        x: {
          format: "dd MMM yyyy HH:mm",
        },

        style: {
          fontSize: "12px",
        },
      },
      fill: {
        type: "gradient",
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.7,
          opacityTo: 0.9,
          stops: [0, 100],
        },
      },
      title: {
        text: `Gráfica de ${text}`,
        align: "left",
      },
    },
  });
  const [showComponent, setShowComponent] = useState(false);
  const { getTimeRangeMiliseconds } = useUtilsGraficaForm(dataGrafica.endDate);

  const handleTimeRangeChange = (timeRange) => {
    setTimeRange(timeRange);
    const filteredData = dataGrafica.transformedData.filter(
      (item) =>
        dataGrafica.endDate - item[0] <= getTimeRangeMiliseconds(timeRange)
    );

    setChartData((prevChartData) => ({
      ...prevChartData,
      series: [
        {
          data: filteredData,
        },
      ],
      options: {
        ...prevChartData.options,
        xaxis: {
          ...prevChartData.options.xaxis,
          min: new Date(filteredData[0][0]).getTime(),
        },
      },
    }));
  };

  useEffect(() => {
    setShowComponent(true);
  }, []);

  return (
    <div>
      {showComponent && (
        <GraficaFormUI
          timeRange={timeRange}
          chartData={chartData}
          handleTimeRangeChange={handleTimeRangeChange}
          setOpenModal={setOpenModal}
          openModal={openModal}
          setDataGrafica={setDataGrafica}
        />
      )}
    </div>
  );
};

export default GraficaForm;
