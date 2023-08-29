
// import { Key } from "../context/ContextCookies";
import SensorHumedad from "./CompSensorHumedad";
import SensorHumedadSuelo from "./CompSensorHumedadSuelo";
import SensorTemp from "./CompSensorTemp";

function DashboardUser() {
  // const valueCookie =Key();
  // console.log( "desde componente dashboard las cookies son  :" + JSON.stringify(valueCookie));
  
  return (
    <>
      <div className="h-screen relative shadow-md shadow-slate-400 ">
        <div className="h-2/5 bg-emerald-700">
          <p className="p-2 text-white font-semibold text-lg">Dashboard</p>
        </div>
        <div className="h-3/5 bg-slate-200">
          
        </div>
        <div className="absolute top-24 flex w-full justify-center" >
            <div className="flex w-4/5 justify-around " >
                <SensorTemp/>
                <SensorHumedad/>
                <SensorHumedadSuelo/>
               
            </div>
            
        </div>
      </div>
    </>
  );
}
export default DashboardUser;
