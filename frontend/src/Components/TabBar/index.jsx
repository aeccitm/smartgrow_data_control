import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { HiHome } from "react-icons/hi";
import { RiPlantFill } from "react-icons/ri";
import { FaPowerOff } from "react-icons/fa6";
import { GrPowerCycle } from "react-icons/gr";

import { SmartgrowContext } from "../../SmartgrowContext";

const TabBar = () => {
  const { openModal, setOpenModal } = useContext(SmartgrowContext);

  const handleNavigationClick = () => {
    setOpenModal({
      ...openModal,
      actuadores: false,
      control: false,
    });
  };

  const handleModalClick = (modalType) => {
    setOpenModal({
      ...openModal,
      actuadores: modalType === "actuadores",
      control: modalType === "control",
    });
  };

  const activeStyle = "text-primary flex flex-col items-center";
  const deactiveStyle = "text-primary/50 flex flex-col items-center";

  return (
    <div className="w-full h-16 bg-white fixed left-0 bottom-0 shadow-md flex items-center justify-around z-20 lg:hidden">
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive && !openModal.actuadores && !openModal.control
            ? activeStyle
            : deactiveStyle
        }
        onClick={handleNavigationClick}
      >
        <HiHome className="w-6 h-6" />
        <p className="text-base">Cultivo</p>
      </NavLink>
      <NavLink
        to="/hidroponico"
        className={({ isActive }) =>
          isActive && !openModal.actuadores && !openModal.control
            ? activeStyle
            : deactiveStyle
        }
        onClick={handleNavigationClick}
      >
        <RiPlantFill className="w-6 h-6" />
        <p className="text-base">Hidroponico</p>
      </NavLink>
      <div
        className={openModal.actuadores ? activeStyle : deactiveStyle}
        onClick={() => handleModalClick("actuadores")}
      >
        <FaPowerOff className="w-6 h-6" />
        <p className="text-base">Actuadores</p>
      </div>
      <div
        className={openModal.control ? activeStyle : deactiveStyle}
        onClick={() => handleModalClick("control")}
      >
        <GrPowerCycle className="w-6 h-6" />
        <p className="text-base">Control</p>
      </div>
    </div>
  );
};

export default TabBar;
