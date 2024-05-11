import { useContext } from "react";

import { HiArrowUpRight } from "react-icons/hi2";
import { CiCalendar } from "react-icons/ci";

import { SmartgrowContext } from "../../SmartgrowContext";

const CardSmartgrow = ({
  text,
  date,
  hour,
  value,
  units,
  dataApi,
  sensor,
  image,
}) => {
  const { setOpenModal, openModal, setValueModal, setSensorModal } =
    useContext(SmartgrowContext);

  return (
    <div className="lg:w-1/5 w-full h-96 lg:h-full bg-tertiary rounded-md lg:rounded-xl flex flex-col">
      <figure className="w-full h-4/5 relative rounded-t-md lg:rounded-t-xl">
        <span className="absolute bottom-0 left-0 bg-tertiary rounded-md text-primary font-bold m-4 px-2 py-0.5 lg:text-sm">
          {text}
        </span>
        <img
          className="w-full h-full rounded-t-md lg:rounded-t-xl"
          src={image}
          alt="temperatura"
        />
        <div
          className="hidden lg:flex absolute top-0 right-0 justify-center items-center bg-primary w-12 h-12 rounded-full m-4 cursor-pointer"
          onClick={() => {
            setOpenModal({
              ...openModal,
              loading: true,
            });
            setValueModal(dataApi);
            setSensorModal(sensor);
          }}
        >
          <HiArrowUpRight className="w-4 h-4" />
        </div>
      </figure>
      <div className="w-full h-1/5 px-4 lg:px-6 flex justify-between items-center rounded-b-md lg:rounded-b-xl">
        <div className="flex items-center w-full">
          <CiCalendar className="w-3 h-3 mr-2" />
          <p className="text-base lg:text-xs">
            {date} <span className="font-semibold">{hour}</span>
          </p>
        </div>
        <div className="flex">
          <p className="text-4xl font-semibold text-primary lg:text-2xl">
            {value}
          </p>
          <p className="text-base text-primary lg:text-xs">{units}</p>
        </div>
      </div>
    </div>
  );
};

export default CardSmartgrow;
