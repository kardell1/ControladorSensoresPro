import express from "express";
// import sequelize from "../sequelizeConfig";
import { User } from "../Models/UserModel.js";
import { Op } from "sequelize";
// import { Op } from "sequelize";
export const userController = express.Router();
/**aca manejamos la logica del programa cuando accedan a la ruta userData , convertimos la funcion flecha en una asincrona  */
userController.post("/userData", async (req, res) => {
  //desestructurar la informacion recibida en variables
  const { name, pass } = req.body;
  /**en caso de no encontrar registro el UsuarioEncontrado = null */
  const UsuarioEncontrado = await User.findOne({
    where: {
      [Op.and]: [{ username: name }, { password: pass }],
    },
  });
  /**el Op = where nos sirve para las consultas y el and es para realizar una doble comparacion */
  if (UsuarioEncontrado!=null){
    /**el valor que se guarda dentro de
     * UsuarioEncontrado son todos los datos del usuario 
     */
    res.json({usuario: UsuarioEncontrado , status :"1"})
  }else{
    res.json({usuario: " no se ha encontrado"})
  }
});
/**NOTA.- para crear un usuario debemos traer el modelo del usuario y hacer la query para crearlo */
userController.post("/createUser", async (req, res) => {
  try {
    const newUser = await User.create({
      username: req.body.name,
      password: req.body.pass,
    });
    console.log("usuario creado :" + newUser);
    res.json({ messaje: "usuario creado correctamente", user: newUser });
  } catch (err) {
    console.log("no se pudo crear el usuario" + err);
    res.json({ messaje: "no se creo el usuario" });
  }
});
