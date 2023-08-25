/**archivo principal de servidor 
 * definir rutas de corrs por aparte
 * definir midlawere para controlar los accesos
 * definir las conexiones 
 */
import express from "express";
import cors from "cors";
import {ServerPort} from "./Config/Conexion.js";
import {router} from "./authRoutes.js";
import sequelize from "./Services/sequelizeConfig.js";
import { User } from "./Models/UserModel.js";
import { Sensor } from "./Models/SensorModel.js";
import { client } from "./Services/mqttConfig.js";
import {Server as SocketServer} from "socket.io";
import { DataPoints } from "./Models/DataPoints.js";
import { authenticateMiddleware } from "./Middleware/authMiddleware.js";
// import http from "http";
import http from "http";

const app = express();
//cors debe declararse desde el inicio y la libreria se instala
 app.use(cors({
    origin: "http://localhost:5173",
  }));
//-----------------------------------------------------
const serve = http.createServer(app);
//el backend va entender text y json , si se necesitara otro tipo de mensaje tambien debe especificarse
app.use(express.text());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const io = new SocketServer(serve , {
  cors:{
      origin : "http://localhost:5173"
  }
});

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Conexión a la base de datos establecida correctamente.');
    //aqui podriamos poner algun tipo de logica luego de conectarnos a la base de datos
    try{
      /**si ya tenemos la tabla en la base de datos seguira ejecutando el console.log
       * no se realizara ningun cambio en la base de datos si ya existe la tabla que queremos crear
       */
      await User.sync({alter:true});
      console.log("modelo User sincronizado con la base de datos");
    }catch(syncError){
      console.log("error al sincronizar el model User");
    }
    //_---------------------------------------------
    
    try{
      await Sensor.sync({alter:true});
      console.log("modelo Sensor sincronizado con la base de datos");
      
    }catch(syncError){
      console.log("error al sincronizar el model User");
    }
    try{
      await DataPoints.sync();
      console.log("modelo DataPoints sincronizado con la base de datos");
    }catch(syncError){
      console.log("error al sincronizar el model User");
    }
    //------------------------------------------------
    try{
      await client.subscribe('esp32/actuadores' , function(err){
        if(!err){
          client.publish('esp32/actuadores' , 'conexion al topico -esp32/actuadores- establecida');
        }
      })
      await client.subscribe("esp32/ResTemperatura", function (err) {
        if (!err) {
          console.log(
            "esp32/ResTemperatura conexion al topico --ResTemperatura-- establecida"
          );
        }
      });
      // aca aumentar mas campos para los demas sensores 
      await client.subscribe("esp32/ResHumedad", function (err) {
        if (!err) {
          console.log(
            "esp32/ResHumedad conexion al topico --ResHumedad- establecida"
          );
        }
      });
      await client.subscribe("esp32/ResHumedadSuelo", function (err) {
        if (!err) {
          console.log(
            "esp32/ResHumedadSuelo conexion al topico --ResHumedadSuelo-- establecida"
          );
        }
      });
    }catch(mqttError){
      console.log("error en conexion mqtt desde index")
    }
  } catch (error) {
    console.error('Error al conectar a la base de datos:', error);
  }
  
})();
//los parentesis al final de la funcion significa que se ejecutara inmediatamente
io.on("connection", (socket) => {
  console.log("usuario conectado del fronted : " + socket.id);
  // con el id vemos las ventanas y us respectivos id
  
  socket.on("onoff", (message) => {
    client.publish("esp32/actuadores", message);
    console.log(message);
  });
});
//-----------------------------------------------------
//funcion para recibir el mensaje desde mqtt
async function MensajeMqtt(topic , message){
  if(topic ==='esp32/ResTemperatura' && message != null){
    console.log('mensaje del topico : esp32/ResTemperatura ___ mensaje :' + message);
    console.log(typeof(message));
    try {
      await DataPoints.create({ data: message, sensorId: 1 });
      console.log('Dato creado en DataPoints');
    } catch (error) {
      console.error('Error al crear el dato en DataPoints:', error);
    }
    io.emit('esp32/ResTemperatura' , message.toString() );
  }else if(topic ==='esp32/ResHumedad' && message != null){
    console.log('mensaje del topico : esp32/ResHumedad ___ mensaje :' + message);
    console.log(typeof(message));
    try {
      await DataPoints.create({ data: message, sensorId: 2 });
      console.log('Dato creado en DataPoints');
    } catch (error) {
      console.error('Error al crear el dato en DataPoints:', error);
    }

    io.emit('esp32/ResHumedad' , message.toString() )
  }else if (topic ==='esp32/ResHumedadSuelo' && message != null) {
    console.log('mensaje del topico : esp32/ResHumedadSuelo ___ mensaje :' + message);
    console.log(typeof(message));
    try {
      await DataPoints.create({ data: message, sensorId: 3 });
      console.log('Dato creado en DataPoints');
    } catch (error) {
      console.error('Error al crear el dato en DataPoints:', error);
    }

    io.emit('esp32/ResHumedadSuelo' , message.toString() )
  }else{
    console.log('topico no encontrado');
  }
}

//dentro va una funcion que recibira un mensaje 
client.on('message' , MensajeMqtt);
//-----------------------------------------------------
/**primero declaramos el middleware para que registre todoso los tipos de entrada */
app.use(authenticateMiddleware);

app.use(router);
/**el app.use(router) explicacion: router contiene las rutas que vamos a usar en l proyecto , entonces definimos ahi la logica de cada ruta que tengamos () */
//------------------------------------------------------
//significa desde que puerto va tomar los datos
serve.listen(ServerPort);
console.log("servidor montado en el puerto : " + ServerPort );
//---------------------------------------------

