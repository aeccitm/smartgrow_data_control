import ReactApexChart from "react-apexcharts";
import { HiOutlineX } from "react-icons/hi";

const GraficaFormUI = ({
  timeRange,
  handleTimeRangeChange,
  chartData,
  setOpenModal,
  openModal,
  setDataGrafica,
}) => {
  const styleActivate = "bg-secondary text-white";

  return (
    <div className="w-auto h-auto p-4 relative bg-white rounded-lg shadow-lg flex flex-col space-y-2 justify-center items-center">
      <div className="w-full text-sm pr-6 text-primary flex items-center justify-between">
        <div className=" text-primary flex gap-4">
          <button
            className={`p-2 rounded-xl ${
              timeRange === "1H" ? styleActivate : ""
            }`}
            onClick={() => handleTimeRangeChange("1H")}
          >
            1H
          </button>
          <button
            className={`p-2 rounded-xl ${
              timeRange === "6H" ? styleActivate : ""
            }`}
            onClick={() => handleTimeRangeChange("6H")}
          >
            6H
          </button>
          <button
            className={`p-2 rounded-xl ${
              timeRange === "1D" ? styleActivate : ""
            }`}
            onClick={() => handleTimeRangeChange("1D")}
          >
            1D
          </button>
          <button
            className={`p-2 rounded-xl ${
              timeRange === "1S" ? styleActivate : ""
            }`}
            onClick={() => handleTimeRangeChange("1S")}
          >
            1S
          </button>
          <button
            className={`p-2 rounded-xl ${
              timeRange === "1M" ? styleActivate : ""
            }`}
            onClick={() => handleTimeRangeChange("1M")}
          >
            1M
          </button>
          <button
            className={`p-2 rounded-xl ${
              timeRange === "ALL" ? styleActivate : ""
            }`}
            onClick={() => handleTimeRangeChange("ALL")}
          >
            ALL
          </button>
        </div>
      </div>
      <div id="chart-timeline">
        <ReactApexChart
          options={chartData.options}
          series={chartData.series}
          type="line"
          height={400}
          width={800}
        />
      </div>
      <HiOutlineX
        className="w-10 h-10 p-2 bg-red-500 text-white cursor-pointer rounded-full absolute -right-5 -top-5 "
        onClick={() => {
          setOpenModal({
            ...openModal,
            grafica: false,
          });
          setDataGrafica({
            transformedData: [],
            endDate: new Date(),
            initDate: new Date(),
          });
        }}
      />
    </div>
  );
};

export default GraficaFormUI;
