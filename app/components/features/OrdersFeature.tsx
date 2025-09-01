import { Link } from "react-router";
import {Feature} from "../Feature";
import { useTheme } from "../ThemeContext";


export function OrdersFeature() {

  const theme = useTheme();


  return (

    <div className="grow">
     
    <div className="px-4 mb-8">
    <div className=" mt-10 max-w-screen-lg mx-auto">              
 
    

      <div className="flex md:flex-row flex-col space-y-6 md:space-y-0 md:space-x-16 items-start">
       
   
      <div className="md:w-1/2 md:b-8 ">
        
         <div className=" flex space-y-2 flex-col mb-12">
          <div className="md:text-xl text-lg font-semibold ">Orders in one click </div>
          <div>Enjoy full cycle order management. Process orders in just few clicks from your orders panel. </div>
        </div>

        <div className="flex flex-col space-y-2">
          <Feature>Effortlessly manage orders </Feature>
          <Feature>Full Pigu API integration with all use-cases covered.</Feature>
          <Feature>See new order instantly with Realtime Updates</Feature>
          <Feature>Comprehensive filtering</Feature>
          <Feature>Mass printing of labels</Feature>
        </div>

      </div>

       <div className="grow md:w-80 flex">     

          <div className="p-2 dark:bg-neutral-800/50 rounded-lg border">  
          <img className=" rounded-md py-0 hidden" src={`./screens/orders/screen_1_${theme.theme}.png`} alt="Orders Screen" />
           <img className=" md:w-80 w-full rounded-md py-0 " src={'./features/orders_light.png'} alt="Orders Screen" />

          </div>    

      </div>


      </div>

      </div>

      </div>

      <hr/>

    </div>
  );
}
