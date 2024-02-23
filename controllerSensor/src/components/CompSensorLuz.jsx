import { useEffect, useState } from "react";
import { getSocket } from "./CompConexionSocket";
import { IoMdCloudy } from "react-icons/io";
import { BsSunFill } from "react-icons/bs";
import SensorDeLluvia from "./CompSensorLluvia";
import { MdCloudySnowing } from "react-icons/md";
import { WiDayCloudyGusts } from "react-icons/wi";
/**al conectarnos signifca que ya estamos escuchando el socket */
function SensorDeLuz() {
  const socket = getSocket();
  // const [list, setList] = useState([]);
  const [rain, setRain] = useState(false);
  const [data, setData] = useState(false);
  // const [climate , setClimate] = useState("nublado");
  useEffect(() => {
    const messageRecibed = (message) => {
      if (message == "0") {
        // setClimate("nublado");
        setData(false);
      } else {
        // setClimate("despejado");
        setData(true);
      }

      // setList((prevLista) => [...prevLista, message]);
    };
    socket.on("esp32/ResLuz", messageRecibed);
    return () => {
      socket.off("esp32/ResLuz", messageRecibed);
    };
  }, []);
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000); // Actualizar cada segundo

    // Limpia el intervalo al desmontar el componente
    return () => clearInterval(intervalId);
  }, []); // El segundo argumento [] asegura que el efecto se ejecute solo una vez al montar el componente

  const formattedTime = currentDate.toLocaleTimeString();

  const handleRain = (dato) => {
    console.log(dato);
    setRain(dato);
  };
  return (
    <>
      <div className="flex  gap-2 h-full">
        <div className="bg-slate-100 text-slate-400 flex  rounded-md w-full text-xl font-semibold p-4 gap-3 justify-between shadow-md shadow-slate-400/30 ">
          <div className="flex flex-col justify-between gap-3 ">
            <div>
              <h1>Clima</h1>
              <p className="text-base">
                {" "}
                {data ? (
                  <span className="text-yellow-500">despejado</span>
                ) : (
                  "nublado"
                )}{" "}
              </p>
              <p className="text-base">
                {" "}
                {rain ? (
                  <span className="text-sky-500">con lluvia</span>
                ) : (
                  "sin lluvia"
                )}{" "}
              </p>
            </div>
            <p className="text-sm">
              {" "}
              Hora : <span>{formattedTime}</span>{" "}
            </p>
          </div>
          <div className="  flex flex-col ">
            <div className=" clima-icon">
              {data ? (
                rain ? (
                  <span className="bg-gradient-to-r from-blue-300 to-yellow-300 ">
                    <WiDayCloudyGusts />
                  </span>
                ) : (
                  <span className="text-yellow-400 ">
                    <BsSunFill />
                  </span>
                )
              ) : rain ? (
                <span >
                  <MdCloudySnowing />
                </span>
              ) : (
                <span>
                  <IoMdCloudy />
                </span>
              )}
            </div>
            <SensorDeLluvia dataChange={handleRain} />
          </div>
        </div>
      </div>
    </>
  );
}
export default SensorDeLuz;
