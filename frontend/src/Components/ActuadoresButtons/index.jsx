import { useContext } from "react";
import { CiPower } from "react-icons/ci";
import { HiXMark } from "react-icons/hi2";
import Swal from "sweetalert2";
import { SmartgrowContext } from "../../SmartgrowContext";

const ActuadoresButtons = () => {
  const { setOpenModal, openModal, mqttPublish, statusSystem } =
    useContext(SmartgrowContext);

  const styleActivate = "bg-primary hover:bg-primary/90";
  const deactivateActivate = "bg-quartiary hover:bg-quartiary/90";

  const showConfirmationModal = (action, payload) => {
    Swal.fire({
      title: "¿Estas seguro?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#6A994E",
      cancelButtonColor: "#BC4749",
      confirmButtonText: `Si, ${action}`,
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "¡Listo!",
          text: "El dato fue enviado",
          icon: "success",
          confirmButtonColor: "#6A994E",
        }).then(() => {
          setOpenModal({
            ...openModal,
            actuadores: false,
          });
        });
        mqttPublish({
          topic: "smartgrow/hidroponico/actuadores",
          qos: 0,
          payload,
        });
      }
    });
  };

  const renderActuatorButton = (text, status, payload) => (
    <div className={`w-2/5 h-4/5 flex flex-col gap-4`}>
      <h2 className="text-lg lg:text-base text-center">{text}</h2>
      <button
        className={`h-full flex justify-center items-center rounded-lg ${
          status ? styleActivate : deactivateActivate
        }`}
        onClick={() =>
          showConfirmationModal(status ? "desactivar" : "activar", payload)
        }
      >
        <CiPower className="w-12 h-12" />
      </button>
    </div>
  );

  return (
    <div className="w-full h-1/3 pb-8 lg:pb-0 bg-white fixed left-0 bottom-16 rounded-t-md lg:rounded-xl shadow-xl lg:relative lg:w-1/3 lg:h-1/3 flex justify-center items-center gap-6">
      {renderActuatorButton(
        "Entrada de agua",
        statusSystem.entrada,
        "entrada_de_agua_hidroponico"
      )}
      {renderActuatorButton(
        "Salida de agua",
        statusSystem.salida,
        "desague_hidroponico"
      )}
      <span
        className="hidden lg:flex absolute w-10 h-10 justify-center items-center -right-4 -top-4 bg-quartiary rounded-full p-1 cursor-pointer hover:bg-quartiary/90"
        onClick={() => {
          setOpenModal({
            ...openModal,
            actuadores: false,
          });
        }}
      >
        <HiXMark className="w-6 h-6" />
      </span>
    </div>
  );
};

export default ActuadoresButtons;
