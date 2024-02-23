import express from "express";
import { User } from "../Models/UserModel.js";
import { Op } from "sequelize";
export const userController = express.Router();
userController.post("/userData", async (req, res) => {
  const { name, pass } = req.body;
  const UsuarioEncontrado = await User.findOne({
    where: {
      [Op.and]: [{ username: name }, { password: pass }],
    },
  });
  if (UsuarioEncontrado != null) {
      res.json({
        data : {
          usuario: UsuarioEncontrado,
          status: "1"} ,
      });

  } else {
    res.json({ usuario: " no se ha encontrado" });
  }
});
userController.post("/createUser", async (req, res) => {
  const { name, pass } = req.body;
  const UsuarioEncontrado = await User.findOne({
    where: {
      [Op.and]: [{ username: name }, { password: pass }],
    },
  });
  try {
    if (UsuarioEncontrado != null) {
      res.json({ messaje: "ya existe el usuario" });
    } else {
      const newUser = await User.create({
        username: req.body.name,
        password: req.body.pass,
      });
      res.json({
        messaje: "usuario creado correctamente",
        user: newUser,
        status: "1",
      });
    }
  } catch (err) {
    res.json({ messaje: "no se creo el usuario" });
  }
});

userController.get("/recoverData" , async (req ,res)=>{
  res.json({data:"el dato esta siendo redirigido el get del controllador......."});
})
