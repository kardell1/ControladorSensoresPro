import { useEffect, useState } from "react";
import { getSocket } from "./CompConexionSocket";
import { BsThermometerHigh } from "react-icons/bs";

/**al conectarnos signifca que ya estamos escuchando el socket */
function SensorTemp() {
  const socket = getSocket();
  const [list, setList] = useState([]);
  const [data, setData] = useState("");

  useEffect(() => {
    const messageRecibed = (message) => {
      setList((prevLista) => [...prevLista, message]);
      setData(message);
    };
    socket.on("esp32/ResTemperatura", messageRecibed);
    return () => {
      socket.off("esp32/ResTemperatura", messageRecibed);
    };
  }, []);

  return (
    <>
      <div>
        <div className="bg-slate-100 flex rounded-md p-3 text-xl font-semibold shadow-slate-600 shadow-lg ">
          <div className="px-3">
            <h1 className=" text-slate-400">Temperatura </h1>
            <p> {data} </p>
          </div>
          <div className="flex bg-orange-500 rounded-full p-2  items-center text-4xl text-white shadow-slate-500 shadow-sm">
            <BsThermometerHigh />
          </div>
        </div>
        <div className="mt-9 bg-slate-100 rounded-lg p-3  shadow-slate-600 shadow-lg font-semibold ">
          <ul>
            {list.length > 10 ? (
              //si la list es mayor a 10 entonces quitamos un elemento a la list y copiamos la list a setLista() , asi cuando la copiemos esta list sera 9 y pasara por falso
              <>{setList(list.slice(1))}</>
            ) : (
              //si el tamaño de la list no es mayor a 10(por falso)
              <>
                {list.map((lista, index) => {
                  //esto es para pintar el borde el ultimo elemento
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
                  // para el mapeo de la list se necesita declarar el return para devolver algo en la funcion
                })}
              </>
            )}
          </ul>
        </div>
      </div>
    </>
  );
}
export default SensorTemp;
