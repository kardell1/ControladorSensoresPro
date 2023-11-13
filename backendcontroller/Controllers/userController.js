import express from "express";
import { User } from "../Models/UserModel.js";
import { Op } from "sequelize";
export const userController = express.Router();
// import { CreateTokken  } from "../Services/jwt.js";
/**aca manejamos la logica del programa cuando accedan a la ruta userData , convertimos la funcion flecha en una asincrona  */
userController.post("/userData", async (req, res) => {
  console.log("datos recibidos " + req.body);
  //desestructurar la informacion recibida en variables
  const { name, pass } = req.body;
  /**en caso de no encontrar registro el UsuarioEncontrado = null */
  const UsuarioEncontrado = await User.findOne({
    where: {
      [Op.and]: [{ username: name }, { password: pass }],
    },
  });
  /**el Op = where nos sirve para las consultas y el and es para realizar una doble comparacion */
  if (UsuarioEncontrado != null) {
    /**el valor que se guarda dentro de
     * UsuarioEncontrado son todos los datos del usuario
     */
    // try {
      /**se usa el try para ver algun posible error al momento de devolver los datos */
      // const tokken = await CreateTokken({ data :{usuario:UsuarioEncontrado , status:"1"} });
      // console.log("Token obtenido:", tokken);
    
      res.json({
        data : {
          usuario: UsuarioEncontrado,
          status: "1"} ,
        // key: tokken,
      });
    // } catch (error) {
    //   console.error("Error al obtener el token:", error);
    // }

  } else {
    res.json({ usuario: " no se ha encontrado" });
  }
});
/**NOTA.- para crear un usuario debemos traer el modelo del usuario y hacer la query para crearlo */
userController.post("/createUser", async (req, res) => {
  const { name, pass } = req.body;
  /**en caso de no encontrar registro el UsuarioEncontrado = null */
  const UsuarioEncontrado = await User.findOne({
    where: {
      [Op.and]: [{ username: name }, { password: pass }],
    },
  });
  try {
    if (UsuarioEncontrado != null) {
      //si existe el usuario
      console.log("usuario ya existe en la base de datos");
      res.json({ messaje: "ya existe el usuario" });
    } else {
      //sino existe se crea el usuario
      const newUser = await User.create({
        username: req.body.name,
        password: req.body.pass,
      });
      console.log("usuario creado :" + newUser);
      res.json({
        messaje: "usuario creado correctamente",
        user: newUser,
        status: "1",
      });
    }
  } catch (err) {
    console.log("no se pudo crear el usuario" + err);
    res.json({ messaje: "no se creo el usuario" });
  }
});

userController.get("/recoverData" , async (req ,res)=>{
  /**verificar si la llave es correcta */
  res.json({data:"el dato esta siendo redirigido el get del controllador......."});
  /* parece que nunca llega a esta ruta porque el controllador verifica si existe el tokken, si existe decodifica el tokken y devuelve el usuario logueado */
})
