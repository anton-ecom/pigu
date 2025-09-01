import { Link } from "react-router";
import {Feature} from "./Feature";
import { useTheme } from "./ThemeContext";
import {OrdersFeature} from "./features/OrdersFeature";

import {FeatureBlock, type FeatureProps} from "./features/FeatureBlock";


export function Features() {

  const theme = useTheme();

  const orders :FeatureProps = {
    header: "Orders",
    subheader: "Enjoy full cycle order management all inside the platform. Process orders, print labels - all in just few clicks.",
    features: [
      "Effortlessly manage orders",
      "Full Pigu API integration with all use-cases covered.",
      "See new order instantly with Realtime Updates",
      "Comprehensive filtering",
      "Mass printing of labels"
    ],
    image: "orders"
  }


  const offers :FeatureProps = {
    header: "Offers",
    subheader: "Take full control of your pricing. Watch price updates in realtime, stay on top of competitors",
    features: [
      "Instant price changes",
      "Price history and analytics",
      "Buybox win/lose filters",
      "Instant notification of price change",
    ],
    image: "offers"
  }



  const auto :FeatureProps = {
    header: "Price Auto-Correction",
    subheader: "Streamline your workflow with powerful automation tools.",
    features: [
      "Beat any competitors price in seconds",
      "Full control of limits and profitability margins",
      "Real-time monitoring",
      "Instant notification of price change",
      "History of price changes"
    ],
    image: "auto"
  }



  return (

    <div>

    <div className="py-20 flex justify-center bg-gradient-to-br  from-[#1B45B4]  to-[#1C2792] px-4 md:px-0">
      
      <div className="text-center flex flex-col space-y-4 text-white"> 
         <div className="text-4xl font-semibold ">Features</div>

         <div className="text-lg">Platform for full cycle Pigu seller management. From orders to Delivery to product management - all in one place.</div>
      </div>



    </div>

    <div className="flex space-y-4 flex-col mx-auto max-w-screen-lg ">
      
      
      <FeatureBlock {...orders} />
      <FeatureBlock {...offers} />
      <FeatureBlock {...auto} />

    </div>

  

    </div>
  );
}
