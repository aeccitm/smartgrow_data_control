import { DotLoader } from "react-spinners";
import { useLoadingModal } from "./useLoadingModal";
import { useContext, useEffect } from "react";

import { SmartgrowContext } from "../../SmartgrowContext";

const LoadingModal = ({ sensor, text }) => {
  const { setOpenModal, setDataGrafica } = useContext(SmartgrowContext);
  const { fetchData } = useLoadingModal(setOpenModal, setDataGrafica);

  useEffect(() => {
    fetchData(sensor, text);
  }, [sensor, text]);

  return (
    <div className="w-1/4 h-1/3 flex justify-center items-center rounded-xl bg-white">
      <DotLoader color="#36d7b7" className="" />
    </div>
  );
};

export default LoadingModal;
