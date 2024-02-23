import Cookies from "js-cookie"
export const FillCookies = (e)=>{
    console.log("valor de la cookie : " + JSON.stringify(e));
    Cookies.set('ValueCookies' , e);
}

export const Key =()=>{
    return Cookies.get('ValueCookies');
} 

export const ClearCookies= ()=>{
    return Cookies.remove('ValueCookies');
}
