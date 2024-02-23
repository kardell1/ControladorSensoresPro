import {  useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDataContext } from "../context/ContextUser";
// import { conectSocket } from "../components/CompConexionSocket";
import { FillCookies } from "../context/ContextCookies";
// import { VerifyUser } from "../context/AuthVerify";

function Login() {
  //-----------------------------------------------------
  //para usar el contexto primero debemos declararlo y asi podremos acceder a sus funciones
  // const prueba = Key();
  /**el tipo de dato es undefined */
  const navegate = useNavigate();
  const { UpdateValue } = useDataContext();
  const [data, setData] = useState({
    name: "",
    pass: "",
  });

  /**un fetch para que cargue y pida los datos en el get*/
  // useEffect(()=>{
  //   console.log("el cookies no es nullo");
    
  //   fetch("http://localhost:4000/recoverData", {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json",
  //       "authorization": `${prueba}`,
  //     },
  //   })
  //   /**en el encabezado estoy enviando el key */
  //   .then((response) => response.json())
  //   .then((data) => {
  //   console.log("---------------------------------------");
  //   console.log("en el componente loguin datos de respuesta son : ");
  //   console.log(JSON.stringify(data));
  //   console.log("---------------------------------------");
  //   console.log("solo datos de usuario :" +JSON.stringify(data.data.status));
  //     if (data.data.status === "1") {
  //       console.log("entrando x verdad en el get");
  //         /* la respuesta del servidor es {data : {objeto}} por eso se entra dentro de data */        
  //         UpdateValue(data.data);
  //         conectSocket();
  //         navegate("/ControllerPage");
  //        } else {
  //          console.log("datos de logueo erroneos");
  //        }
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
    
  // },[]);
  const handleSubmitForm = async(event) => {
    //event preventdefault es necesario para no recargar la pagina al enviar el formulario
    event.preventDefault();
    console.log("datos desde el componente login :" + JSON.stringify(data));
    await fetch("/userData", {
      method: "POST",
      headers: { 
      //---------------------------------------------------
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(
          "respuesta del servidor es , se ve en componente loguin  : " +
            JSON.stringify(data)
        );
        console.log("respuesta del servidor mensaje  :");
        if (data.data.status === "1") {
          // console.log(
          //   "valor desde el componente login de las cookies es : " + data.key
          // );
          // FillCookies(data.key);
          UpdateValue(data.data);
          console.log("datos que se suben al context, desde comp login")
          console.log(JSON.stringify(data.data));
          console.log("-------------------------------------------")
          
          navegate("/ControllerPage");
        } else {
          console.log("datos de logueo erroneos");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleCreateUser = () => {
    console.log("boton crear usuario presionado");
    navegate("/CreateUser");
  };

  return (
    <>
      <div className="h-screen w-screen bg-slate-100 flex justify-center items-center fondo">
        <div className="w-2/6 h-auto bg-slate-200/30 p-8 rounded-2xl shadow-md shadow-slate-300 max-md:w-auto">
          <div className="flex justify-center">
            <h1 className="text-4xl font-bold py-6 ">Ingresa a tu cuenta</h1>
          </div>
          <div className="flex flex-col">
            <form onSubmit={handleSubmitForm}>
              <p className="text-xl py-3 ">Usuario</p>
              <input
                className="p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-cyan-600 "
                type="text"
                placeholder="Escribe tu usuario"
                value={data.name}
                onChange={(e) => setData({ ...data, name: e.target.value })}
              />
              <p className="text-xl py-3 ">Contraseña</p>
              <input
                className="p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-cyan-600 "
                type="password"
                placeholder="Escribe tu contraseña"
                value={data.pass}
                onChange={(e) => setData({ ...data, pass: e.target.value })}
              />
              <button
                type="submit"
                className="bg-cyan-600 rounded w-full my-7 py-2 hover:bg-cyan-400  font-semibold text-slate-100 "
              >
                ingresar
              </button>
            </form>
            
          </div>
        </div>
      </div>
    </>
  );
}
export default Login;
