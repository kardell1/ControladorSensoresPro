/**este middleware es el verificara los tipos de solicitudes entrantes y verificara que el usuario tiene una llave de acceso para devolverles sus datos */
export function authenticateMiddleware (req , res , next){
    console.log("middleware funcionando");
    console.log("intercepatando datos del body en el middleware : "+ JSON.stringify(req.body));
    
    console.log("intercepatando datos del headers en el middleware : "+ JSON.stringify(req.headers.authorization));
}
/**usamos el next para dejarlo pasar a la ruta que quiere ingresar */