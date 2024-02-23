// import { Key } from "../context/ContextCookies";
import SensorHumedad from "./CompSensorHumedad";
import SensorHumedadSuelo from "./CompSensorHumedadSuelo";
import SensorTemp from "./CompSensorTemp";
import SensorCanAgua from "./CompSensorCantidadAgua";
import SensorDeLuz from "./CompSensorLuz";
// import SensorDeLluvia from "./CompSensorLluvia";
import SensorAguaTurbia from "./CompSensorAguaTurbia";
import {BsReplyFill} from "react-icons/bs"
import { desconectSocket } from "./CompConexionSocket";
import { useNavigate } from "react-router-dom";
function DashboardUser() {
  const navegate = useNavigate();
  // const valueCookie =Key();
  // console.log( "desde componente dashboard las cookies son  :" + JSON.stringify(valueCookie));
  const handleCloseSession=()=>{
    console.log("presionado boton de cerrar sesion");
    desconectSocket();
    // ClearCookies();
    navegate("/");
  }
  return (
    <>
      <section className="min-h-screen bg-slate-200 shadow-md shadow-slate-400 ">
        <div className=" h-full  flex flex-col gap-4">
          <div className="p-4 flex justify-between items-center  bg-slate-100">
            <p className=" text-slate-900 font-semibold text-xl">
              Datos Sensores
            </p>
            <div className=" font-semibold  hover:text-green-600 ">
              
              <button onClick={handleCloseSession} className="px-2 flex">
              <div className="text-xl flex items-center">
                <BsReplyFill />
              </div>
                <p>CERRAR SESION</p>
              </button>
            </div>
            {/* <SensorDeLluvia />  */}
          </div>
          <div className=" pl-8 pr-8 pt-4 pb-4 grid grid-cols-3  gap-5 max-lg:grid-cols-2 max-md:grid-cols-1  max-lg:h-max ">
            <div className=" flex flex-col gap-5">
              <SensorHumedadSuelo />
              <SensorCanAgua />
            </div>
            <div className="flex flex-col gap-5">
              <SensorTemp />
              <SensorHumedad />
            </div>
            <div className="flex flex-col gap-5">
              <SensorDeLuz />
              <SensorAguaTurbia />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
export default DashboardUser;
