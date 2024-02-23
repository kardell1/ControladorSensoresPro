import { KeyValue } from "../Config/CookiesKey.js";
import { DecodedTokken } from "../Services/jwt.js";
export function authenticateMiddleware (req , res , next){
    let header = req.headers.authorization;
    if(header === undefined){
        next();
    }else{
        res.json(DecodedTokken(header , KeyValue));
    }
}