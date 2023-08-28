import { KeyValue } from "../Config/CookiesKey.js";
import { DecodedTokken } from "../Services/jwt.js";

/**este middleware es el verificara los tipos de solicitudes entrantes y verificara que el usuario tiene una llave de acceso para devolverles sus datos */
export function authenticateMiddleware (req , res , next){
    console.log("middleware funcionando");
    console.log("intercepatando datos del body en el middleware : "+ JSON.stringify(req.body));
    let header = req.headers.authorization;
    console.log("el valor de header es  : " +JSON.stringify(header))
    console.log("el tipo de dato header es  : " +typeof(header));
    if(header === undefined){
        console.log("es undefined");
        next();
    }else{
        console.log("no es undefined");
        /* aca hacer el llamado a la funcion de decodificar si tiene un tokken  */
        res.json(DecodedTokken(header , KeyValue));
    }
}
/**usamos el next para dejarlo pasar a la ruta que quiere ingresar */
/* comportamiento del fronted y el recibo de datos , notar que al inicar el fronted se envia una solicitud get que es para comprobar si el usuario esta logueado , si no se loguea bien entonces se envian los datos , si los datos son erroneos  la pagina cargara de nuevo y hara que se ejecute el effect de nuevo , por lo tanto se recibira un objeto sin datos  */