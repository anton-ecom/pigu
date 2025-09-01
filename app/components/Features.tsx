import { Link } from "react-router";
import {Feature} from "./Feature";
import { useTheme } from "./ThemeContext";
import {OrdersFeature} from "./features/OrdersFeature";

import {FeatureBlock, type FeatureProps} from "./features/FeatureBlock";
import {FeatureSmall } from "./features/FeatureSmall";

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

    const stats :FeatureProps = {
    header: "Sales Statistics",
    subheader: "Gain valuable insights into your sales performance.",
    features: [
      "Comprehensive sales reports",
      "Real-time performance tracking",
      "Customizable dashboards",
      "In-depth product analytics",
    ],
    image: "stats"
    }


    const products :FeatureProps = {
    header: "Product management",
    subheader: "Gain valuable insights into your sales performance.",
    features: [
      "Upload and manage products with ease",
      "Publish Pigu products in one click",
      "Full product specifications",
      "AI integration for content translation.",
    ]
    }


     const invoices :FeatureProps = {
    header: "Invoices processing",
    subheader: "No more manual invoices and accounting. Full invoice integration  with automatic upload to your accounting software.",
    features: [
      "Download all invoices in PDF",
      "All invoices parsed to structured data",
      "API for invoice upload to your CRM/ERP",

    ]
  }

    const fees :FeatureProps = {
    header: " Fees control",
    subheader: "Never sell an item with loss. See full fees calculation and profit margins for every price for every region.",
    features: [
      "Automatic profit margin calculationsF",
      "Factual profit reports",
      "See your margin in every offer and product",

    ]
   }

    const ai :FeatureProps = {
    header: "AI-Powered Insights",
    subheader: "Leverage the power of AI to gain insights and optimize your pricing strategy.",
    features: [
      "Smart 1-click product description AI-translation",
      "Analyze competition and price change patterns with our AI-analytics agent",
      "Fill required product specifications from description with AI auto-detect feature.",

    ]
   }

   const customization :FeatureProps = {
    header: "Full Customization",
    subheader: "Each business is unique. We develop fully customized features, tailored to your needs",
    features: [
      "Individual approach",
      "Consultation and strategy",
      "Deeper automation works",
      "New features delivered fast",
      "Customer and technical support contracts available."

    ]
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
      <FeatureBlock {...stats} />

      <div className="py-6 font-semibold text-center"> And more than 100+ features </div>

      <div className="grid md:grid-cols-2 grid-cols-1 gap-8">
      <FeatureSmall {...products} />
      <FeatureSmall {...invoices} />
      <FeatureSmall {...fees} />
      <FeatureSmall {...ai} />
      <FeatureSmall {...customization} />

      </div>

    </div>

  

    </div>
  );
}
