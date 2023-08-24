import { Sequelize } from 'sequelize';

// Configuración de la base de datos
//new sequelize('nombre de la base de dats' , 'nombre de usuario' , 'contraseña' {host:'' , dialect:'mysql' o otro lenguaje de base de datos relacional})
const sequelize = new Sequelize('data_sensor', 'root','', {
  host: 'localhost',
  dialect: 'mysql', // Cambia esto según tu base de datos
});
// Verifica la conexión a la base de datos
//una conexion a alguna base de datos o api , es mejor envolverlo dentro de un try para el manejo de errores
try {
  await sequelize.authenticate();
  console.log('Conexión a la base de datos establecida correctamente.');
} catch (error) {
  console.error('Error al conectar a la base de datos:', error);
}

export default sequelize;