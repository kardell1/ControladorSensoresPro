import { Route, Routes } from "react-router-dom";
import Login from "./Login";
import CreateUser from "./CreateUser";
import { DataProvider } from "../context/ContextUser";
import ControllerPage from "./ControllPage";
export function Rutas() {
  return (
    <>
        <DataProvider>
          <Routes>
            <Route path="/" element={<Login/>} />
            <Route path="/CreateUser" element={<CreateUser/>} />
            <Route path="/ControllerPage" element={<ControllerPage/>}/>
          </Routes>
        </DataProvider>  
    </>
  );
}
