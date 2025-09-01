import { Link } from "react-router";
import {Feature} from "../Feature";
import { useTheme } from "../ThemeContext";

export interface FeatureProps {
  header?: string;
  subheader?: string;
  features: string[];
  image?: string;
}

export function FeatureBlock({header, subheader, features, image}: FeatureProps) {

  const theme = useTheme();

  return (

    <div className="grow">
     
    <div className="px-4 mb-8">
    <div className=" mt-10 max-w-screen-lg mx-auto">              
 
    

      <div className="flex md:flex-row flex-col space-y-6 md:space-y-0 md:space-x-16 items-start">
       
   
      <div className="md:w-1/2 md:b-8 ">
        
         <div className=" flex space-y-2 flex-col mb-12">
          <div className="md:text-xl text-lg font-semibold ">{header} </div>
          <div>{subheader}</div>
        </div>

        <div className="flex flex-col space-y-2">
          {features.map((feature) => (
            <Feature key={feature}>{feature}</Feature>
          ))}
        </div>

      </div>
     {  image && (
       <div className="grow md:w-80 flex">
          <div className="p-2 dark:bg-neutral-800/50 rounded-lg border">

           <img className=" md:w-80 w-full rounded-md py-0 " src={`./features/${image}_${theme.theme}.png`} alt={`${image} screen`} />

          </div>    

      </div>
     )}


      </div>

      </div>

      </div>

      <hr/>

    </div>
  );
}
