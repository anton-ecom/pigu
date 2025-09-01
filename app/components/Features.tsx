import { Link } from "react-router";
import {Feature} from "./Feature";
import { useTheme } from "./ThemeContext";


export function Features() {

  const theme = useTheme();


  return (

    <div>

    <div className="py-20 flex justify-center bg-gradient-to-br from-[#6CEFEF] via-[#4648FF]  to-[#712FFF]">
      
      <div> 
         <div className="text-4xl font-semibold text-white">Features</div>
      </div>



    </div>

     
    <div className="px-4">
    <div className="max-w-none mt-10">              

 

      <div className="flex md:space-x-16 items-center">
       
       <div className="w-1/2 ">     

          <div className="p-2 dark:bg-neutral-800/50 rounded-lg border">  
          <img className=" rounded-md py-0" src={`./screens/orders/screen_1_${theme.theme}.png`} alt="Orders Screen" />
          </div>    

      </div>

      <div className="w-1/2">
        
         <div className="mb-4 flex space-y-2 flex-col">
          <div className="md:text-3xl text-2xl font-semibold ">Orders</div>
          <div>Enjoy full cycle order management. Process orders in just few clicks from your orders panel. 
          </div>
        </div>

        <div className="flex flex-col space-y-2">
          <Feature>Process thousands of orders per day with just one manager</Feature>
          <Feature>Full Pigu API integration with all use-cases covered.</Feature>
          <Feature>See new order instantly with Realtime Updates</Feature>
          <Feature>Comprehensive filtering</Feature>
          <Feature>Mass printing of labels</Feature>
        </div>

      </div> 

      </div>

      </div>

      </div>

    </div>
  );
}
