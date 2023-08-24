import mqtt from "mqtt";

const brokerMqttOptions = {
    host :"mqtt://localhost:1883",
    client : "BackendEsuchando"
};
export let client;

try{
    client = mqtt.connect("mqtt://192.168.0.10:1883");
    client.on('connect' , ()=>{
        console.log("conexion con mqtt establecida");
    })
    client.on('error' , ()=>{
        console.log("fallo al conectar a mqtt");
    })
    
}catch(err){
    console.log(err);
}
