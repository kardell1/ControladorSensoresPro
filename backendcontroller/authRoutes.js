import express from "express";
import { userController } from "./Controllers/userController.js";
export const router = express.Router();
/*el controladoe es la logica interna que se va manejar una vez accedan a esa ruta */ 
router.post('/userData' ,userController);
router.post('/createUser' , userController);
/**en el archivo router verificamos las rutas y le decimos que controlador usar  */
router.get('/recoverData' , userController);

