import { useContext } from "react";

import Layout from "../../Components/Layaout";
import SystemStatusBar from "../../Components/SystemStatusBar";
import { SmartgrowContext } from "../../SmartgrowContext";

const StatusBars = () => {
  const { statusSystem } = useContext(SmartgrowContext);
  return (
    <Layout>
      <div className="bg-tertiary rounded-md mb-4 h-8 w-full flex items-center justify-center">
        <h1 className="font-bold text-lg text-primary">Smartgrow</h1>
      </div>
      <section className="w-full mb-4">
        <SystemStatusBar text="Entrada de agua" status={statusSystem.entrada} />
        <SystemStatusBar text="Salida de agua" status={statusSystem.salida} />
        <SystemStatusBar
          text="Recirculacion"
          status={statusSystem.recirculacion}
        />
        <SystemStatusBar text="MQTT" status={statusSystem.mqtt} />
      </section>
    </Layout>
  );
};

export default StatusBars;
