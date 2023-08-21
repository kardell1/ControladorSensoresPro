
import sequelize from "../sequelizeConfig.js";
import { DataTypes } from "sequelize";
export const User = sequelize.define('users' , {
    
    username : {
        type: DataTypes.STRING
    },
    password : {
        type : DataTypes.STRING
    }
})
