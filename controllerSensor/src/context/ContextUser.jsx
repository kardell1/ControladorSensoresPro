//aca creamos la recuperacion de datos para el context
// primero necesitamos importar las librerias correspondientes
import { useState , useContext , createContext, useEffect } from "react";
import { Key } from "./ContextCookies";
// import { Key } from "./ContextCookies";
/**
 * 1.-useState : necesario para cambiar el estado del state ya que iniciara con un estado vacio 
 * 2.- useContext : para crear el contexto que le pasaremos a los demas componentes
 * 3.- createContext : esto es necesario para que creemos el contexto o lo instanciemos en alguna variable
 * */
export const DataContext = createContext();
/**el dataProvider es el proveedor del contexto ,
 * es decir el que pasa los datos al conexto
 */

export const DataProvider = ({children})=>{
    //explicacion del codigo----
    /**declaramos el useState en aca porque el proveedor comienza con un estado vacio y este se actualizara cuando le pasemos un dato , este dato se obtendra dentro de algun componente hijo */
    const[value , setValue]=useState([]);
    const ValueCookies = Key();
    /**el dataprovider ademas de pasar el contexto tambien tiene una funcion que actualiza el dato del state , de esta manera podemos actualizar el dato desde algun componente interno */
    const UpdateValue=(newvalue)=>{
        setValue(newvalue);
    }
    useEffect(()=>{
        if (ValueCookies === undefined){
            console.log("valor de cookies es undefined en el comp context")
        }else{
            fetch("http://localhost:4000/recoverData", {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                "authorization": `${ValueCookies}`,
              },
            })
            .then((response) => response.json())
            .then((data) => {  
                console.log("respuesta del servidor en el componente verify : " + JSON.stringify(data.data)); 
                setValue(data.data);
              })
              .catch((error) => {
                console.log(error);
              });
        }
        
    },[])
    /**en el componente de retorno que seria lo que se renderiza podemos notar que le estamos pasando entre llaves el valor de un objeto desestructurado
     * esto significa que el objeto ya esta declarado en la funcion flecha de arriba pero lo estamos desestructurando 
     */
    return<>
        <DataContext.Provider value={{value,UpdateValue}}>
            {children}
        </DataContext.Provider>
    </>
}
/**el useDataContext es un hook personalizado , x eso se usa la palabra use al inicio de la funcion siguiendo la convencion de hooks , este hook es necesario para no usar el DataContext.consumer
 * 
 * En pocas palabras este hook personalizado lo que hace es actualizar los valores del contexto de una manera mas sencilla
 */
export const useDataContext = () => {
    return useContext(DataContext);
};






