import { Link } from "react-router";
import { Feature } from "./Feature";
import { useTheme } from "./ThemeContext";
import { FeatureBlock, type FeatureProps } from "./features/FeatureBlock";
import { FeatureSmall } from "./features/FeatureSmall";

export function Features() {
  const theme = useTheme();

  const orders: FeatureProps = {
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

  const offers: FeatureProps = {
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

  const auto: FeatureProps = {
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

  const stats: FeatureProps = {
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

  const products: FeatureProps = {
    header: "Product Management",
    subheader: "Upload and manage products with ease. AI-powered content tools for global markets.",
    features: [
      "Upload and manage products with ease",
      "Publish Pigu products in one click",
      "Full product specifications",
      "AI integration for content translation.",
    ]
  }

  const invoices: FeatureProps = {
    header: "Invoice Processing",
    subheader: "No more manual invoices and accounting. Full invoice integration with automatic upload to your accounting software.",
    features: [
      "Download all invoices in PDF",
      "All invoices parsed to structured data",
      "API for invoice upload to your CRM/ERP",
    ]
  }

  const fees: FeatureProps = {
    header: "Fees Control",
    subheader: "Never sell an item with loss. See full fees calculation and profit margins for every price for every region.",
    features: [
      "Automatic profit margin calculations",
      "Factual profit reports",
      "See your margin in every offer and product",
    ]
  }

  const ai: FeatureProps = {
    header: "AI-Powered Insights",
    subheader: "Leverage the power of AI to gain insights and optimize your pricing strategy.",
    features: [
      "Smart 1-click product description AI-translation",
      "Analyze competition and price change patterns with our AI-analytics agent",
      "Fill required product specifications from description with AI auto-detect feature.",
    ]
  }

  const customization: FeatureProps = {
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
    <div className="min-h-screen">
      {/* Header Section */}
      <div className="py-20 flex justify-center bg-gradient-to-br from-[#1B45B4] to-[#1C2792] px-4 md:px-0">
        <div className="text-center flex flex-col space-y-4 text-white max-w-4xl">
          <div className="text-5xl font-bold mb-4">Platform Features</div>
          <div className="text-xl opacity-90 leading-relaxed">
            Complete Pigu seller management platform. From orders to delivery to product management - all in one place.
          </div>
        </div>
      </div>

      {/* Main Features Section */}
      <div className="bg-gray-50 dark:bg-gray-900/50 py-16">
        <div className="max-w-screen-xl mx-auto">
          <div className="text-center mb-16 px-4">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Core Features
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Everything you need to automate and scale your Pigu marketplace business
            </p>
          </div>

          <div className="space-y-24">
            <FeatureBlock {...orders} />
            <FeatureBlock {...offers} />
            <FeatureBlock {...auto} />
            <FeatureBlock {...stats} />
          </div>
        </div>
      </div>

      {/* Additional Features Section */}
      <div className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-screen-xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Advanced Capabilities
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-8">
              Professional tools and AI-powered features to give you the competitive edge
            </p>
            <div className="inline-flex items-center px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full text-sm font-medium">
              <span className="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse" />
              100+ Features Available
            </div>
          </div>

          <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8">
            <FeatureSmall {...products} />
            <FeatureSmall {...invoices} />
            <FeatureSmall {...fees} />
            <FeatureSmall {...ai} />
            <FeatureSmall {...customization} />
            
            {/* Call to Action Card */}
            <div className="lg:col-span-1 md:col-span-2 lg:md:col-span-1">
              <div className="h-full bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-8 text-white flex flex-col justify-center items-center text-center">
                <div className="text-2xl font-bold mb-4">Ready to Get Started?</div>
                <div className="text-blue-100 mb-6 leading-relaxed">
                  Experience the full power of automated Pigu management
                </div>
                <Link 
                  to="/contact" 
                  className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
                >
                  Request Demo
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
