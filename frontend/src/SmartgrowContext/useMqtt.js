import { useState, useEffect } from "react";
import mqtt from "mqtt";

const useMqtt = (initialTopic) => {
  const [client, setClient] = useState(null);
  const [message, setMessage] = useState(null);
  const [connectStatus, setConnectStatus] = useState(false);
  const [subscribedTopics, setSubscribedTopics] = useState([]);

  const mqttBrokerUrl = import.meta.env.VITE_BROKER_MQTT;

  const mqttConnect = () => {
    setConnectStatus(true);
    const newClient = mqtt.connect(mqttBrokerUrl);

    newClient.on("connect", () => {
      setConnectStatus(true);
      newClient.subscribe(initialTopic);
    });

    newClient.on("error", (err) => {
      console.error("Connection error: ", err);
      newClient.end();
      setConnectStatus(false);
    });

    newClient.on("reconnect", () => {
      setConnectStatus(false);
    });

    newClient.on("message", (topic, message) => {
      const data = { topic, message: message.toString() };
      setMessage(data);
    });

    setClient(newClient);
  };

  const mqttSubscribe = (newTopic) => {
    if (client) {
      client.subscribe(newTopic);
      setSubscribedTopics([...subscribedTopics, newTopic]);
    }
  };

  const mqttDisconnect = () => {
    if (client) {
      try {
        client.end(false, () => {
          setConnectStatus(false);
        });
      } catch (error) {
        console.log("Disconnect error:", error);
      }
    }
  };

  const mqttPublish = (context) => {
    if (client) {
      const { topic, qos, payload } = context;
      client.publish(topic, payload, qos, (error) => {
        if (error) {
          console.log("Publish error: ", error);
        }
      });
    }
  };

  useEffect(() => {
    return () => {
      if (client) {
        client.end();
      }
    };
  }, [client]);

  return {
    message,
    connectStatus,
    subscribedTopics,
    mqttConnect,
    mqttSubscribe,
    mqttDisconnect,
    mqttPublish,
  };
};

export { useMqtt };
