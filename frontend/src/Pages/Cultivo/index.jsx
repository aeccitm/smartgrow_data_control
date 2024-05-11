import { useContext } from "react";
import CardSmartgrow from "../../Components/CardSmartgrow";
import LayaoutCards from "../../Components/LayaoutCards";
import { formatDateTime } from "../../Utils";

import { SmartgrowContext } from "../../SmartgrowContext";

const Cultivo = () => {
  const { sensorData, lastDates } = useContext(SmartgrowContext);
  const { formattedDate, formattedHour } = formatDateTime(lastDates.scd40);
  

  return (
    <LayaoutCards>
      <div className="w-full h-1/2 flex flex-col justify-center items-center gap-4 lg:flex lg:flex-row lg:gap-6 lg:pb-6">
        <CardSmartgrow
          text="Temperature"
          date={formattedDate}
          hour={formattedHour}
          // value={sensorData.temperatura}
          value={22}
          units="°C"
          dataApi="temperatura"
          sensor="scd40"
          image="./img/med.png"
        />
        <CardSmartgrow
          text="Humidity"
          date={formattedDate}
          hour={formattedHour}
          // value={sensorData.humedad}
          value={65}
          units="%"
          dataApi="humedad"
          sensor="scd40"
          image="./img/med.png"
        />
        <CardSmartgrow
          text="Co2"
          date={formattedDate}
          hour={formattedHour}
          // value={sensorData.co2}
          value={486}
          units="ppm"
          dataApi="co2"
          sensor="scd40"
          image="./img/med.png"
        />
      </div>
      <div className="w-full h-1/2 flex flex-col justify-center items-center gap-4 lg:flex lg:flex-row lg:gap-6 lg:pb-6">
        <CardSmartgrow
          text="PPF"
          date="21 Mar 2024"
          hour="18:29"
          value="920"
          units="umol"
          image="./img/SPF.png"
        />
        <CardSmartgrow
          text="VPD"
          date={formattedDate}
          hour={formattedHour}
          // value={sensorData.vpd}
          value={0.8}
          units="Kpa"
          dataApi="VPD"
          sensor="scd40"
          image="./img/max.png"
        />
        <CardSmartgrow
          text="PPFD"
          date="921 Mar 2024"
          hour="18:29"
          value="1020"
          units="umol*m2"
          image="./img/SPF.png"
        />
      </div>
    </LayaoutCards>
  );
};

export default Cultivo;
