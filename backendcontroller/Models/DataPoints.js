import sequelize from "../Services/sequelizeConfig.js";
import { DataTypes } from "sequelize";
import { Sensor } from "./SensorModel.js";
export const DataPoints = sequelize.define('data_points' , {
    
    data : {
        type: DataTypes.INTEGER
    },
    sensorId: {
        type: DataTypes.INTEGER,
        references: {
            model: Sensor,
            key: 'id_sensor'
        }
    }

})
