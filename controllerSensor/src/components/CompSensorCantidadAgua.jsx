import { useEffect, useState } from "react";
import { getSocket } from "./CompConexionSocket";
import { BsMoisture } from "react-icons/bs";

function SensorCantAgua() {
  const socket = getSocket();
  const [data, setData] = useState("0");

  useEffect(() => {
    const messageRecibed = (message) => {
      setData(message);
    };
    socket.on("esp32/ResCantidadAgua", messageRecibed);
    return () => {
      socket.off("esp32/ResCantidadAgua", messageRecibed);
    };
  }, []);

  return (
    <>
      <div className="flex  gap-2 h-max">
        <div className="bg-slate-100 text-slate-400 flex flex-col rounded-md w-full text-xl font-semibold p-4 gap-3  shadow-md shadow-slate-400/30 ">
          <h1>Caudalimetro</h1>
          <div className="flex items-center gap-3">
            <div className="flex bg-sky-700 rounded-full p-2  items-center text-4xl text-white shadow-slate-500 shadow-sm w-fit ">
              <BsMoisture />
            </div>
            <p className="font-extrabold text-5xl text-slate-600">
              {data}<span className="font-medium pl-1">Litros</span>{" "}
            </p>
          </div>
          <p>Estado : </p>
          <div className="progress-bar-container ">
            <div className="progress-bar rounded-lg ">
              <div
                className="progress-bar-fill rounded-lg "
                style={{ width: `${data}%` }}
                
              ></div>
            </div>
            <div className="progress-label">{`${data}L`}</div>
          </div>
        </div>
      </div>
    </>
  );
}
export default SensorCantAgua;
