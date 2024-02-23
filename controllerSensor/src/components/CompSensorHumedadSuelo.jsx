import { useEffect, useState } from "react";
import { getSocket } from "./CompConexionSocket";
import { GiStoneSphere } from "react-icons/gi";

/**al conectarnos signifca que ya estamos escuchando el socket */
function SensorHumedadSuelo() {
  const socket = getSocket();
  // const [list, setList] = useState([]);
  const [data, setData] = useState("0");

  useEffect(() => {
    const messageRecibed = (message) => {
      setData(message);
      // setList((prevLista) => [...prevLista, message]);
    };
    socket.on("esp32/ResHumedadSuelo", messageRecibed);
    return () => {
      socket.off("esp32/ResHumedadSuelo", messageRecibed);
    };
  }, []);

  return (
    <>
      <div className="flex  gap-2 h-max">
        <div className="bg-slate-100 text-slate-400 flex flex-col rounded-md w-full text-xl font-semibold p-4 gap-3  shadow-md shadow-slate-400/30 ">
          <h1>Higrometro</h1>
          <div className="flex items-center gap-3">
            <div className="flex bg-sky-700 rounded-full p-2  items-center text-4xl text-white shadow-slate-500 shadow-sm w-fit ">
              <GiStoneSphere />
            </div>
            <p className="font-extrabold text-5xl text-slate-600">
              {data}<span className="font-medium">%</span>{" "}
            </p>
          </div>
          <p>Estado :</p>
          <div className="progress-bar-container ">
            <div className="progress-bar rounded-lg ">
              <div
                className="progress-bar-fill rounded-lg "
                style={{ width: `${data}%` }}
                
              ></div>
            </div>
            <div className="progress-label">{`${data}%`}</div>
          </div>
        </div>
      </div>
    </>
  );
}
export default SensorHumedadSuelo;

{
  /* <div className=" bg-slate-100 rounded-lg p-3  shadow-slate-600 shadow-lg font-semibold prue ">
          <ul className="flex">
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
        </div> */
}
