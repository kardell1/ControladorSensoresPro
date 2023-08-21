import  { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
//charts.js
const ChartWithMutableData = () => {
  const [dataList, setDataList] = useState([20, 35, 50, 25, 40]); // Lista de números mutable

  const updateData = () => {
    // Simulación de actualización de la lista de números
    const newDataList = dataList.map(number => number + Math.floor(Math.random() * 20) - 10);
    setDataList(newDataList);
  };

  return (
    <div>
      <button onClick={updateData}>Actualizar Datos</button>
      <LineChart width={600} height={400} data={dataList.map((value, index) => ({ name: index.toString(), value }))}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="value" stroke="#8884d8" />
      </LineChart>
    </div>
  );
};

export default ChartWithMutableData;