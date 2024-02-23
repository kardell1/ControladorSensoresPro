import { useEffect, useState } from "react";
import { getSocket } from "./CompConexionSocket";
import { MdOutlineGrain } from "react-icons/md";
// import { PiRainbowBold } from "react-icons/pi";
/**al conectarnos signifca que ya estamos escuchando el socket */
function SensorDeLluvia({dataChange}) {
  const socket = getSocket();
  // const [list, setList] = useState([]);
  // const [data, setData] = useState(false);

  useEffect(() => {
    const messageRecibed = (message) => {
      if (message == "0") {
        // console.log("por 0");
        dataChange(false)
        // setData(false);
      } else {
        // console.log("por 1");
        dataChange(true)
        // setData(true);
      }

      // setList((prevLista) => [...prevLista, message]);
    };
    socket.on("esp32/ResLluvia", messageRecibed);
    return () => {
      socket.off("esp32/ResLluvia", messageRecibed);
    };
  }, []);
}
export default SensorDeLluvia;
