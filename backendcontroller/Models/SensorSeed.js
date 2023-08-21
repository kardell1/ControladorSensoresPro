import { Sensor } from "./SensorModel.js";
import sequelize from "../sequelizeConfig.js";
import { Op } from "sequelize";
export async function CreateSensors(){
    try {
        /**el force true lo que hace es eliminar todos los 
         * registros y los re creara de nuevo , 
         * a la hora de entregar el programa puedo que no sea nada recomendable tener esa opcion
         * 
         */
        const Elementos = ["Temperatura" , "Humedad" , "Humedad_suelo"];
        const elementosExistentes = await Sensor.findAll({
            where: {
                name_sensor: {
                    [Op.in]: Elementos
                }
            }
        });
        if (elementosExistentes.length > 0) {
            console.log("Al menos un elemento existe en la base de datos.");
        
        } else {
            console.log("Ningún elemento existe en la base de datos.");
            await sequelize.sync();
            /**definimos los valores que queremos crear en la base de datos */
            const initialSensors = [
                { name_sensor: "Temperatura", description: "sensor de temperatura, add descripcion" },
                { name_sensor: "Humedad", description: "sensor de humedad, add descripcion" },
                { name_sensor: "Humedad_suelo", description: "sensor de humedad suelo, add descripcion" }
            ];
            /**luego creamos los sensores con el bulkCreate */
            const createdSensors = await Sensor.bulkCreate(initialSensors);
    
            console.log("Sensores iniciales creados:", createdSensors);
        }
    } catch (error) {
        console.error("Error al crear sensores iniciales:", error);
    }
};





