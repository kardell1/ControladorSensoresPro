import Jwt from "jsonwebtoken";
import { KeyValue } from "../Config/CookiesKey.js";

export const CreateTokken =async(payload)=>{
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
        return decode;
    }catch(err){
        return null;
    }
}