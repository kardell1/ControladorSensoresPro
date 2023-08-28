import Jwt from "jsonwebtoken";
import { KeyValue } from "../Config/CookiesKey.js";

/**el jwt esta compuesto de 3 partes , 
 * headers .- el encabezado contiene informacion del tipo de cifrado
 * payload .- informacion que devolvemos junto al jwt , es como el cuerpo de la respuesta
 * assignament .- datos adicionales a la encriptacion de la informacion :
 *          tiempo de duracion.- expiresIn : 1h
 *          tipo de algoritmo de encriptacion.-algoritm : (consultar en la documentacion)
 *          
 * callback
 */
/**creamos el tokken cuando la informacion es verificada */
export const CreateTokken =async(payload)=>{
    console.log("payload es : "+ payload);
    console.log( "tipo de dato es : " +typeof(payload));
    console.log("contenido es : " +  JSON.stringify(payload));
    console.log("la llave es : " + KeyValue);
    /**parece que el crear el tokken es un proceso que requiere timepo en resolverse , x eso se lo envuelve en una promesa */
    return new Promise((resolve, reject) => {
        Jwt.sign(payload, KeyValue, { expiresIn: '1h' }, (err, token) => {
          if (err) {
            console.log("Error al crear el token:", err);
            reject(err);
          } else {
            console.log("Token creado correctamente:", token);
            resolve(token);
          }
        });          
      });
}

export function DecodedTokken(token , key){
    try{
        const decode =Jwt.verify(token , key)
        console.log("---------------------------------------");
        console.log("usando funcion de decodificar tokken");
        console.log(JSON.stringify(decode));
        console.log("---------------------------------------");
        return decode;
    }catch(err){
        return null;
    }
}