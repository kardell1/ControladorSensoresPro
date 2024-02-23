/**archivo principal de servidor
 * definir rutas de corrs por aparte
 * definir midlawere para controlar los accesos
 * definir las conexiones
 */
import express from "express";
import cors from "cors";
import { ServerPort } from "./Config/Conexion.js";
import { router } from "./authRoutes.js";
import sequelize from "./Services/sequelizeConfig.js";
import { User } from "./Models/UserModel.js";
import { Sensor } from "./Models/SensorModel.js";
import { client } from "./Services/mqttConfig.js";
import { Server as SocketServer } from "socket.io";
import { DataPoints } from "./Models/DataPoints.js";
import { authenticateMiddleware } from "./Middleware/authMiddleware.js";
import http from "http";
const app = express();
app.use(
  cors({
    // origin: "http://localhost:5173",
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
);
//-----------------------------------------------------
app.use(express.static('dist'))
const serve = http.createServer(app);
app.use(express.text());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const io = new SocketServer(serve, {
  cors: {
    // origin: "http://localhost:5173",
  },
});

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Conexión a la base de datos establecida correctamente.");
    try {
      await User.sync({ alter: true });
      console.log("modelo User sincronizado con la base de datos");
    } catch (syncError) {
      console.log("error al sincronizar el model User");
    }
    //_---------------------------------------------

    try {
      await Sensor.sync({ alter: true });
      console.log("modelo Sensor sincronizado con la base de datos");
    } catch (syncError) {
      console.log("error al sincronizar el model User");
    }
    try {
      await DataPoints.sync();
      console.log("modelo DataPoints sincronizado con la base de datos");
    } catch (syncError) {
      console.log("error al sincronizar el model User");
    }
    //------------------------------------------------
    try {
      await client.subscribe("esp32/actuadores", function (err) {
        if (!err) {
          client.publish(
            "esp32/actuadores",
            "conexion al topico -esp32/actuadores- establecida"
          );
        }
      });
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
      await client.subscribe("esp32/ResAguaTurbia", function (err) {
        if (!err) {
          console.log(
            "esp32/ResAguaTurnia conexion al topico --ResAguaTurbia-- establecida"
          );
        }
      });
      await client.subscribe("esp32/ResCantidadAgua", function (err) {
        if (!err) {
          console.log(
            "esp32/ResCantidadAgua conexion al topico --ResCantidadAgua-- establecida"
          );
        }
      });
      await client.subscribe("esp32/ResLluvia", function (err) {
        if (!err) {
          console.log(
            "esp32/ResLluvia conexion al topico --ResLluvia-- establecida"
          );
        }
      });
      await client.subscribe("esp32/ResLuz", function (err) {
        if (!err) {
          console.log(
            "esp32/ResLuz conexion al topico --ResLuz-- establecida"
          );
        }
      });
    } catch (mqttError) {
      console.log("error en conexion mqtt desde index");
    }
  } catch (error) {
    console.error("Error al conectar a la base de datos:", error);
  }
})();
io.on("connection", (socket) => {
  socket.on("onoff", (message) => {
    client.publish("esp32/actuadores", message);
  });
});
async function MensajeMqtt(topic, message) {
  //-----------------------------------------------------
  if (topic === "esp32/ResTemperatura" && message != null) {
    console.log(
      "mensaje del topico : esp32/ResTemperatura ___ mensaje :" + message
    );
    console.log(typeof message);
    try {
      await DataPoints.create({ data: message, sensorId: 1 });
      console.log("Dato creado en DataPoints");
    } catch (error) {
      console.error("Error al crear el dato en DataPoints:", error);
    }
    io.emit("esp32/ResTemperatura", message.toString());
    //------------------------------------------------------
  } else if (topic === "esp32/ResHumedad" && message != null) {
    console.log(
      "mensaje del topico : esp32/ResHumedad ___ mensaje :" + message
    );
    console.log(typeof message);
    try {
      await DataPoints.create({ data: message, sensorId: 2 });
      console.log("Dato creado en DataPoints");
    } catch (error) {
      console.error("Error al crear el dato en DataPoints:", error);
    }

    io.emit("esp32/ResHumedad", message.toString());
    //-------------------------------------------------------------
  } else if (topic === "esp32/ResHumedadSuelo" && message != null) {
    console.log(
      "mensaje del topico : esp32/ResHumedadSuelo ___ mensaje :" + message
    );
    console.log(typeof message);
    try {
      await DataPoints.create({ data: message, sensorId: 3 });
      console.log("Dato creado en DataPoints");
    } catch (error) {
      console.error("Error al crear el dato en DataPoints:", error);
    }

    io.emit("esp32/ResHumedadSuelo", message.toString());
    //----------------------------------------------------------
  }else if (topic === "esp32/ResAguaTurbia" && message != null) {
    console.log(
      "mensaje del topico : esp32/ResAguaTurbia ___ mensaje :" + message
    );
    console.log(typeof message);
    try {
      await DataPoints.create({ data: message, sensorId: 4 });
      console.log("Dato creado en DataPoints");
    } catch (error) {
      console.error("Error al crear el dato en DataPoints:", error);
    }
    io.emit("esp32/ResAguaTurbia", message.toString());
//---------------------------------------------------------------
  }else if (topic === "esp32/ResCantidadAgua" && message != null) {
    console.log(
      "mensaje del topico : esp32/ResCantidadAgua ___ mensaje :" + message
    );
    console.log(typeof message);
    try {
      await DataPoints.create({ data: message, sensorId: 5 });
      console.log("Dato creado en DataPoints");
    } catch (error) {
      console.error("Error al crear el dato en DataPoints:", error);
    }

    io.emit("esp32/ResCantidadAgua", message.toString());
  }
  //---------------------------------------------------------------
  else if (topic === "esp32/ResLluvia" && message != null) {
    console.log(
      "mensaje del topico : esp32/ResLluvia ___ mensaje :" + message
    );
    console.log(typeof message);
    try {
      await DataPoints.create({ data: message, sensorId: 6 });
      console.log("Dato creado en DataPoints");
    } catch (error) {
      console.error("Error al crear el dato en DataPoints:", error);
    }

    io.emit("esp32/ResLluvia", message.toString());
  }
  //------------------------------------------------------- 
  else if (topic === "esp32/ResLuz" && message != null) {
    console.log(
      "mensaje del topico : esp32/ResLuz ___ mensaje :" + message
    );
    console.log(typeof message);
    try {
      await DataPoints.create({ data: message, sensorId: 7 });
      console.log("Dato creado en DataPoints");
    } catch (error) {
      console.error("Error al crear el dato en DataPoints:", error);
    }

    io.emit("esp32/ResLuz", message.toString());
  }
  else {
    console.log("topico no encontrado");
  }
}
client.on("message", MensajeMqtt);
app.use(authenticateMiddleware);
app.use(router);
serve.listen(ServerPort);
console.log("servidor montado en el puerto : " + ServerPort);
