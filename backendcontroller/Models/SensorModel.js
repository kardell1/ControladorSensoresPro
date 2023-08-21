import sequelize from "../sequelizeConfig.js";
import { DataTypes } from "sequelize";
import { CreateSensors } from "./SensorSeed.js";
export const Sensor = sequelize.define('sensors' , {
    id_sensor: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement:true
    },
    name_sensor : {
        type: DataTypes.STRING , 
        length : 20
    },
    description : {
        type : DataTypes.STRING
    }
})
//  // Función para eliminar todos los registros de la tabla
// Sensor.deleteAllRecords = async function () {
//     try {
//         await this.destroy({ where: {} }); // Eliminar todos los registros
//         console.log("Registros eliminados correctamente.");
//     } catch (error) {
//         console.error("Error al eliminar registros:", error);
//     }
// };



CreateSensors();
