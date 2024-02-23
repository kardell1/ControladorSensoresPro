import { useEffect } from "react";
import { getSocket } from "./CompConexionSocket";
function SensorDeLluvia({dataChange}) {
  const socket = getSocket();

  useEffect(() => {
    const messageRecibed = (message) => {
      if (message == "0") {
        dataChange(false)
      } else {
        dataChange(true)
      }
    };
    socket.on("esp32/ResLluvia", messageRecibed);
    return () => {
      socket.off("esp32/ResLluvia", messageRecibed);
    };
  }, []);
}
export default SensorDeLluvia;
