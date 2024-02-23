import { useDataContext } from "../context/ContextUser";
import ErrorPage from "./ErrorPage";
import MenuUser from "../components/CompMenuUser";
import { conectSocket } from "../components/CompConexionSocket";
function ControllerPage() {
  const { value } = useDataContext();
  conectSocket();
  return (
    <>
      {value.status === "1" ? (
        <div >
          <MenuUser />
        </div>
      ) : (
        <ErrorPage />
      )}
    </>
  );
}
export default ControllerPage;
