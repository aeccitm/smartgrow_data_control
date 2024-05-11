import { useContext } from "react";
import CardSmartgrow from "../../Components/CardSmartgrow";
import LayaoutCards from "../../Components/LayaoutCards";
import { formatDateTime } from "../../Utils";

import { SmartgrowContext } from "../../SmartgrowContext";

const Hidroponico = () => {
  const { sensorData, lastDates } = useContext(SmartgrowContext);
  const { formattedDate, formattedHour } = formatDateTime(lastDates.phEc);

  return (
    <LayaoutCards>
      <div className="w-full h-1/2 flex flex-col justify-center items-center gap-4 lg:flex lg:flex-row lg:gap-6 lg:pb-6">
        <CardSmartgrow
          text="Water Temperature"
          date={formattedDate}
          hour={formattedHour}
          // value={sensorData.temperaturaAgua}
          value={21}
          units="°C"
          dataApi="temperatura"
          sensor="phec"
          image={"./img/med_hidro.png"}
        />
        <CardSmartgrow
          text="PH"
          date={formattedDate}
          hour={formattedHour}
          // value={sensorData.ph}
          value={5.8}
          units=""
          dataApi="ph"
          sensor="phec"
          image={"./img/med_hidro.png"}
        />
        <CardSmartgrow
          text="Electrical Conductivity"
          date={formattedDate}
          hour={formattedHour}
          // value={sensorData.ec}
          value={932}
          units="mS/cm"
          dataApi="ec"
          sensor="phec"
          image={"./img/min_hidro.png"}
        />
      </div>
      <div className="w-full h-1/2 flex flex-col justify-center items-center gap-4 lg:flex lg:flex-row lg:gap-6 lg:pb-6">
        <CardSmartgrow
          text="Water Temperature"
          date="18 Mar 2024"
          hour="23:41"
          value="250"
          units="L"
          dataApi=""
          sensor="phec"
          image={"./img/max_hidro.png"}
        />
      </div>
    </LayaoutCards>
  );
};

export default Hidroponico;
