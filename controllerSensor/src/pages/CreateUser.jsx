import { useState } from "react";
import { useNavigate } from "react-router-dom";
function CreateUser() {
  const navegate = useNavigate();
  const [data, setData] = useState({
    name: "",
    pass: ""
  });
  const handleSubmitForm = (event) => {
    event.preventDefault();
    console.log( "datos desde el componente createUser :" + JSON.stringify(data));
    fetch("http://localhost:4000/createUser", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        if(data.status === "1"){  
          console.log("datos de respuesta status : " + data.status)
          console.log("datos de respuesta messaje :"  + data.messaje );
          console.log("datos de respuesta user :"  + data.user );
          navegate('/');
        }else{
          console.log("datos de logueo erroneos");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleReturn=()=>{
    navegate('/');
  };
  return (
    <>
      <div className="h-screen w-screen bg-slate-100 flex justify-center items-center">
        <div className="w-2/6 h-auto bg-slate-200 p-8 rounded-2xl ">
          <div className="flex justify-center">
            <h1 className="text-4xl font-bold py-6 ">Crear Usuario</h1>
          </div>
          <div className="flex flex-col">
            <form onSubmit={handleSubmitForm}>
              <p className="text-xl py-3 ">Nombre de usuario</p>
              <input
                className="p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-cyan-600 "
                type="text"
                placeholder="Escribe tu usuario"
                value={data.name}
                onChange={(e) => setData({ ...data, name: e.target.value })}
              />
              <p className="text-xl py-3 ">Escribe tu contraseña</p>
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
                Crear usuario
              </button>
            </form>
            <div className="flex justify-center ">
              <button
                className="px-2 text-xl text-cyan-600 font-semibold hover:text-cyan-400"
                onClick={handleReturn}
              >
                {" "}
                regresar
              </button>
            </div>
          </div>
          
        </div>
      </div>
    </>
  );
}
export default CreateUser;
