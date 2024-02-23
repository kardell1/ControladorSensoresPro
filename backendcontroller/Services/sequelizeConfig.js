import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('data_sensor', 'root','', {
  host: 'localhost',
  dialect: 'mysql', // Cambia esto según tu base de datos
});
try {
  await sequelize.authenticate();
  console.log('Conexión a la base de datos establecida correctamente.');
} catch (error) {
  console.error('Error al conectar a la base de datos:', error);
}

export default sequelize;