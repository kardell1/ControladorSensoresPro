import { useNavigate } from "react-router-dom";
import { useDataContext } from "../context/ContextUser";
import ButtonControllConfig from "./CompButton";
import { BsRobot, BsPerson } from "react-icons/bs";
import { FiSlack, FiWind } from "react-icons/fi";
import DashboardUser from "./CompDashboard";
// import { desconectSocket } from "./CompConexionSocket";
// import { ClearCookies } from "../context/ContextCookies";
function MenuUser() {
  const navegate = useNavigate();
  /**para usar el contexto primero debemos acceder a su valor y lo hacemos declarando el hook personalizado */
  const { value } = useDataContext();
  //esto ya contiene los datos pero hay que desestructurarlo de la siguiente manera :
  console.log(
    "datos desde el componente MenuUser page :" + value.usuario.username
  );

  return (
    <>
      <div className="flex h-full relative ">
        <div className=" w-min max-h-screen sticky top-0 px-3  text-base text-slate-100 max-lg:w-min bg-gradient-to-b from-sky-700 to-green-300">
          <div className="">
            <div className=" py-4 border-b border-slate-300">
              <h1 className="text-xl font-semibold ">CONTROLADOR</h1>
            </div>
            <div className="flex py-3 font-semibold border-b border-slate-300 items-center">
              <p>Bienvenido</p>
              <p className="px-3 text-slate-100 text-lg">
                {value.usuario.username}
              </p>
            </div>

            <div className="contenedorOpciones py-3 font-semibold border-b border-slate-300  ">
              <p className="py-2">CONFIGURACION SENSORES </p>
              <div className="py-2 flex hover:text-slate-600 ">
                {" "}
                <div className="text-2xl flex items-center">
                  <BsPerson />
                </div>
                <ButtonControllConfig name="MANUAL" value="manual" />{" "}
              </div>
              <div className="py-2 flex hover:text-slate-600">
                <div className="text-xl flex items-center">
                  <BsRobot />
                </div>
                <ButtonControllConfig name="AUTOMATICO" value="automatico" />{" "}
              </div>
            </div>

            <div className=" border-b border-slate-300 py-3 font-semibold">
              <p className="py-2 ">CONTROLADOR SENSORES </p>
              <div className="py-2 hover:text-slate-600 group  ">
                <div className="py-2 flex">
                  <div className="text-xl flex items-center">
                    <FiSlack />
                  </div>
                  <p className="px-2">BOMBA AGUA</p>
                </div>
                <div className="hidden group-hover:block py-2 hover:text-blue-700 ">
                  <ButtonControllConfig name="Encender" value="on1" />
                </div>
                <div className="hidden group-hover:block py-2 hover:text-blue-700">
                  <ButtonControllConfig name="Apagar" value="off1" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full">
          <DashboardUser />
        </div>
      </div>
    </>
  );
}
export default MenuUser;
