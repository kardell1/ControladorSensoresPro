import { useEffect, useState } from "react";
import { getSocket } from "./CompConexionSocket";
import { BsMoisture } from "react-icons/bs";

/**al conectarnos signifca que ya estamos escuchando el socket */
function SensorHumedadSuelo() {
  const socket = getSocket();
  const [list, setList] = useState([]);
  const [data, setData] = useState("");

  useEffect(() => {
    const messageRecibed = (message) => {
      setData(message);
      setList((prevLista) => [...prevLista, message]);
    };
    socket.on("esp32/ResHumedadSuelo", messageRecibed);
    return () => {
      socket.off("esp32/ResHumedadSuelo", messageRecibed);
    };
  }, []);

  return (
    <>
      <div>
        <div className="bg-slate-100 flex rounded-md p-3 text-xl font-semibold shadow-slate-600 shadow-lg ">
          <div className="px-2">
            <h1 className=" text-slate-400">Humedad suelo</h1>
            <p>{data} </p>
          </div>
          <div className="flex bg-orange-500 rounded-full p-2  items-center text-4xl text-white shadow-slate-500 shadow-sm">
            <BsMoisture />
          </div>
        </div>
        <div className="mt-9 bg-slate-100 rounded-lg p-3  shadow-slate-600 shadow-lg font-semibold ">
          <ul>
            {list.length > 10 ? (
              <>{setList(list.slice(1))}</>
            ) : (
              <>
                {list.map((lista, index) => {
                  if (index == list.length - 1) {
                    return (
                      <li
                        key={index}
                        className="bg-emerald-400 flex justify-center"
                      >
                        {lista}
                      </li>
                    );
                  } else {
                    return (
                      <li key={index} className="flex justify-center py-2">
                        {lista}
                      </li>
                    );
                  }
                })}
              </>
            )}
          </ul>
        </div>
      </div>
    </>
  );
}
export default SensorHumedadSuelo;
