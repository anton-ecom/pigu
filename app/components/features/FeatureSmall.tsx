import { Link } from "react-router";
import {Feature} from "../Feature";
import { useTheme } from "../ThemeContext";

export interface FeatureProps {
  header?: string;
  subheader?: string;
  features: string[];
  image?: string;
}

export function FeatureSmall({header, subheader, features, image}: FeatureProps) {

  const theme = useTheme();

  return (

    <div className="flex grow flex-col h-full">
     
    <div className="px-4 mb-8">
    <div className=" max-w-screen-lg mx-auto">              
     
      <div className="flex  flex-col space-y-4   items-start">
          
      <div>
        
         <div className=" flex space-y-2 flex-col">
          <div className="md:text-xl text-lg font-semibold ">{header} </div>
          <div>{subheader}</div>
        </div>
       
      </div>
     
       <div className="grow  flex">
        <div className="flex flex-col space-y-2">
          {features.map((feature) => (
            <Feature key={feature}>{feature}</Feature>
          ))}
        </div>
      </div>
    


      </div>

      </div>

      </div>

    </div>
  );
}
