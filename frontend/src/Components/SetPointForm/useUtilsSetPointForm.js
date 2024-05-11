import Swal from "sweetalert2";

const useUtilsSetPointForm = (
  setValue,
  setPointLabel,
  newValue,
  mqttPublish,
  setOpenModal,
  openModal
) => {
  const fetchData = async () => {
    try {
      const response = await fetch("http://200.122.207.134:8311/setpoints");
      const data = await response.json();
      if (setPointLabel === "ph") {
        setValue(data[0].ph);
      } else {
        setValue(data[0].ec);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const context = (payload) => {
    return {
      topic: "smartgrow/hidroponico/control",
      qos: 0,
      payload,
    };
  };

  const sendSetPoint = async () => {
    try {
      const response = await fetch(
        "http://200.122.207.134:8311/setpoints/659d94574bf0b60a1b465b89",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            [setPointLabel]: newValue,
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Error al realizar la solicitud PUT");
      }
      mqttPublish(context(`{${setPointLabel}:${newValue}}`));
    } catch (error) {
      console.error("Error al actualizar los datos:", error);
    }
  };

  const validateAndSend = async () => {
    if (newValue === "") {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "El valor del SetPoint esta vacio",
      });
    } else {
      await confirmAndSend(
        `¿Está seguro de que desea modificar el valor del SetPoint de ${setPointLabel}?`
      );
    }
  };

  const confirmAndSend = async (confirmationMessage) => {
    const result = await Swal.fire({
      title: "Confirmación",
      text: confirmationMessage,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#6A994E",
      cancelButtonColor: "#BC4749",
      confirmButtonText: "Sí, continuar",
    });

    if (result.isConfirmed) {
      await Swal.fire({
        title: "¡Listo!",
        text: `El valor del ${setPointLabel} fue enviado`,
        icon: "success",
        confirmButtonColor: "#6A994E",
      });
      await sendSetPoint();
      setOpenModal({
        ...openModal,
        control: false,
      });
    }
  };

  return { fetchData, validateAndSend };
};

export { useUtilsSetPointForm };
