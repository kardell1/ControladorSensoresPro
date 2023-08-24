import Cookies from "js-cookie"

/**si la llave existe en las cookies devolver la llave*/
export const FillCookies = (e)=>{
    /**para poner un valor de dias Cookies.set('ValueCookies' , e , {expires : 7} ); 
     * le decimos que expira en 7 dias
     * o tambien podria ponerse '1 week'
    */
    console.log("valor de la cookie : " + JSON.stringify(e));
    Cookies.set('ValueCookies' , e);
    /**si el valor de expiracion no se explica las cookies solo se interpretan como cookies de sesion y esto quiere decir que solo se mantendran hasta el cierre de sesion 
     * esto significa que solo se mantendra las cookies hasta que se cierre el navegador . 
     * una vez cerrado el navegador procede a borrarse las cookies 
     */
}

export const Key =()=>{
    return Cookies.get('ValueCookies');
} 

export const ClearCookies= ()=>{
    return Cookies.remove('ValueCookies');
}
