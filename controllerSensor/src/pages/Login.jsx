import {  useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDataContext } from "../context/ContextUser";
import { FillCookies } from "../context/ContextCookies";

function Login() {
  const navegate = useNavigate();
  const { UpdateValue } = useDataContext();
  const [data, setData] = useState({
    name: "",
    pass: "",
  });
  const handleSubmitForm = async(event) => {
    event.preventDefault();
    console.log("datos desde el componente login :" + JSON.stringify(data));
    await fetch("/userData", {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.data.status === "1") {
          UpdateValue(data.data);          
          navegate("/ControllerPage");
        } else {
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
