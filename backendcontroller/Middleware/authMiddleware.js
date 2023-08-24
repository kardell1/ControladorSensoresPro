/**este middleware es el verificara los tipos de solicitudes entrantes y verificara que el usuario tiene una llave de acceso para devolverles sus datos */
export function authenticateMiddleware (req , res , next){
    /**aca deberiamos verificar si cuenta con una llave de acceso  y si cuenta con la llave hacer as verificaciones correspondientes*/
    console.log("middleware funcionando");
    // console.log(req.body)
    // console.log( "la llave es : " +  req.headers['key']);
    // res.json({messaje:"estamos en el middleware"})
    if ( req.headers['Key'] != undefined){
        console.log("key tiene un valor y no es undefined");
    }else{
        console.log("key es undefined , viene del componente middleware");
        next();
    }
}
/**usamos el next para dejarlo pasar a la ruta que quiere ingresar */