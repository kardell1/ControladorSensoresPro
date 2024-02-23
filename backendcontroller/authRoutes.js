import express from "express";
import { userController } from "./Controllers/userController.js";
export const router = express.Router();
router.post('/userData' ,userController);
router.post('/createUser' , userController);
router.get('/recoverData' , userController);

