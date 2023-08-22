/**este archivo nos ayuda a manejar las conexiones con el socket , las conexiones en el fronted se manejan mediante la libreria socket.io-client , este fichero es necesario ara manejar de mejor manera las conexiones y que no estemos realizando conexiones por demas, en php esto es conocido como patron singletton */
import { io } from "socket.io-client";
let socket;

//con esta funcion conectamos al socket del backend y escucharemos los mensajes que nos envian 
export const conectSocket=()=>{
    console.log("funcion conexion socket ejecutandose");
    socket = io("http://localhost:4000");
    if (!socket) {
        throw new Error("La conexión de socket no pudo establecerse correctamente.");
    }
    
    return socket
}
/**tambien es necesario una funcion de desconexion del socket
 * porque cuando estamos conectados al socket y desconectamos 
 * el usuario ... no podremos desconectar sin apagar el socket 
 */
export const desconectSocket=()=>{
    if(socket){
        console.log("funcion de desconexion ejecutandose ")
        // socket.disconnect();
        socket.close();
        socket = null;
    }
    return socket;
}
/**una vez establecida la conexion del socket necesitamos una funcion que devuelva esa conexion a los demas componentes para que escuchen los mensajes  */
export const getSocket=()=>{
    return socket;
}