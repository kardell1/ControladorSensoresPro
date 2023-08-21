import { useDataContext } from "../context/ContextUser";
import ErrorPage from "./ErrorPage";
import DashboardUser from "../components/CompDashboard";
import MenuUser from "../components/CompMenuUser";
function ControllerPage() {
  /**para usar el contexto primero debemos acceder a su valor y lo hacemos declarando el hook personalizado */
  const { value } = useDataContext();
  //esto ya contiene los datos pero hay que desestructurarlo de la siguiente manera :
  console.log("datooooos desde el componente controller page :" + value.status);
  return (
    <>
      {value.status === "1" ? (
        <div className="flex">
          {" "}
          <div className="w-2/12">
            <MenuUser />
          </div>{" "}
          <div className="w-10/12">
            <DashboardUser />
          </div>{" "}
        </div>
      ) : (
        <ErrorPage />
      )}
    </>
  );
}
export default ControllerPage;
