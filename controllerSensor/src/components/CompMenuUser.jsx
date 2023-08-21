import { useNavigate } from "react-router-dom";
import { useDataContext } from "../context/ContextUser";
import ButtonControllConfig from "./CompButton";
import {BsRobot ,BsPerson ,BsReplyFill} from "react-icons/bs";
import {FiSlack , FiWind} from "react-icons/fi";
import { desconectSocket } from "./CompConexionSocket";
function MenuUser() {
  const navegate = useNavigate();
  /**para usar el contexto primero debemos acceder a su valor y lo hacemos declarando el hook personalizado */
  const { value } = useDataContext();
  //esto ya contiene los datos pero hay que desestructurarlo de la siguiente manera :
  console.log("datos desde el componente MenuUser page :" + value.usuario.username);
  const handleCloseSession=()=>{
    console.log("presionado boton de cerrar sesion");
    desconectSocket();
    navegate("/");
  }
  return (
    <>
      <div className="contendor h-screen bg-white px-3 static text-base">
        <div className=" py-4 border-b border-slate-300">
          <h1 className="text-2xl font-semibold">CONTROLADOR</h1>
        </div>
        <div className="flex py-3 font-semibold border-b border-slate-300">
          <div className="">imagen</div>
          <p className="px-3" >{value.usuario.username}</p>
        </div>

        <div className="contenedorOpciones py-3 font-semibold border-b border-slate-300  ">
          <p className="py-2 text-slate-600">CONFIGURACION SENSORES </p>
          <div className="py-2 flex hover:text-green-600 ">
            {" "}
            <div className="text-2xl flex items-center" ><BsPerson/></div>
            <ButtonControllConfig name="MANUAL" value="manual" />{" "}
          </div>
          <div className="py-2 flex hover:text-green-600">
            <div className="text-xl flex items-center" ><BsRobot/></div>
            <ButtonControllConfig name="AUTOMATICO" value="automatico" />{" "}
          </div>
        </div>

        <div className=" border-b border-slate-300 py-3 font-semibold">
          <p className="py-2 text-slate-600">CONTROLADOR SENSORES </p>
          <div className="py-2 hover:text-green-600 group  ">
            <div className="py-2 flex">
              <div className="text-xl flex items-center" ><FiSlack/></div>
              <p className="px-2" >BOMBA AGUA</p>
            </div>
            <div className="hidden group-hover:block py-2 hover:text-blue-700 ">
              <ButtonControllConfig name="Encender" value="on1" />
            </div>
            <div className="hidden group-hover:block py-2 hover:text-blue-700">
              <ButtonControllConfig name="Apagar" value="off1" />
            </div>
          </div>
          <div className="py-2 hover:text-green-600 group  ">
          <div className="py-2 flex">
              <div className="text-xl flex items-center" ><FiWind/></div>
              <p className="px-2" >VENTILADOR</p>
            </div>
            <div className="hidden group-hover:block py-2 hover:text-blue-700 ">
              <ButtonControllConfig name="Encender" value="on1" />
            </div>
            <div className="hidden group-hover:block py-2 hover:text-blue-700">
              <ButtonControllConfig name="Apagar" value="off1" />
            </div>
          </div>          
        </div>
        <div className="py-3 flex font-semibold absolute bottom-0  hover:text-green-600 ">
          <div className="text-xl flex items-center" ><BsReplyFill/></div>
          <button onClick={handleCloseSession} className="px-2" ><p>CERRAR SESION</p></button>
        </div>
      </div>
    </>
  );
}
export default MenuUser;
