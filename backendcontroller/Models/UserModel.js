
import sequelize from "../Services/sequelizeConfig.js";
import { DataTypes } from "sequelize";
export const User = sequelize.define('users' , {

    username : {
        type: DataTypes.STRING(15) ,
    },
    password : {
        type : DataTypes.STRING(20) ,
        
    }
})
