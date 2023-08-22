import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDataContext } from "../context/ContextUser";
import { conectSocket } from "../components/CompConexionSocket";

function Login() {
  //para usar el contexto primero debemos declararlo y asi podremos acceder a sus funciones
  const { UpdateValue } = useDataContext();
  const navegate = useNavigate();
  const [data, setData] = useState({
    name: "",
    pass: ""
  });
  const handleSubmitForm = (event) => {
    //event preventdefault es necesario para no recargar la pagina al enviar el formulario
    event.preventDefault();
    console.log( "datos desde el componente login :" + JSON.stringify(data));
    fetch("http://localhost:4000/userData", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      //el response es como tratamos la respuesta y la volvemos a json
      .then((data) => {
        //esto deberia ser lo correcto , que el backend nos responda con los datos validados del usuario 
        // UpdateValue(data);
        //la data es la respuesta del servidor
        if(data.status === "1"){
            
          UpdateValue(data);
          console.log("datos desde el contexto : " + data.status)
          conectSocket();
          navegate('/ControllerPage');
        }else{
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
      <div className="h-screen w-screen bg-slate-100 flex justify-center items-center">
        <div className="w-2/6 h-auto bg-slate-200 p-8 rounded-2xl ">
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
            <div className="flex justify-center ">
              <p className="text-xl w-auto text-slate-500 ">
                no tienes cuenta?
              </p>
              <button
                className="px-2 text-xl text-cyan-600 font-semibold hover:text-cyan-400"
                onClick={handleCreateUser}
              >
                {" "}
                registrate
              </button>
            </div>
          </div>
          
        </div>
      </div>
    </>
  );
}
export default Login;
