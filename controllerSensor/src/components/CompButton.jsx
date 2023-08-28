import { getSocket } from "./CompConexionSocket";
/**la parte de conexion del socket ya la tenemos en un archivo por aparte , entonces solo tenemos que hacer un llamado a la funcion de conecion declarado en el archivo */
// const socket = conectSocket();
function ButtonControllConfig(props){
    const socket = getSocket();
    const handleValueButton=()=>{
        console.log("valor del botton presionado es :" + props.value)
        /**este es el topico en donde se envia el mensaje al socket del backend */
        socket.emit('onoff' , props.value);  
    }

    return<>
        <button onClick={handleValueButton} className="px-2"> {props.name} </button>
    </>
}
export default ButtonControllConfig