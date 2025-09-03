import { Link } from "react-router";
import { useTheme } from "./ThemeContext";
import type { PricingData, PricingPlan, PricingFeature } from "~/domain/types/pricing";
import { useState } from "react";

interface PricingProps {
  pricingData: PricingData;
}

function PricingCard({ plan }: { plan: PricingPlan }) {
  const { theme } = useTheme();
  
  return (
    <div className={`rounded-lg border p-6 ${
      plan.highlighted 
        ? 'border-blue-500 shadow-lg scale-105 relative' 
        : 'border-gray-200 dark:border-gray-700'
    }`}>
      {plan.highlighted && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
          <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium">
            Most Popular
          </span>
        </div>
      )}
      
      <div className="text-center mb-6">
        <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
        <p className="text-gray-600 dark:text-gray-400 mb-4">{plan.description}</p>
        <div className="mb-4">
          <span className="text-3xl font-bold">{plan.currency} {plan.price}</span>
          <span className="text-gray-600 dark:text-gray-400">/{plan.period}</span>
        </div>
      </div>
      
      <div className="space-y-3 mb-6">
        {plan.features.map((feature, index) => (
          <PricingFeatureItem key={`${plan.type}-${plan.level}-${feature.name}`} feature={feature} />
        ))}
      </div>
      
      <button 
        type="button"
        className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${
          plan.highlighted
            ? 'bg-blue-500 hover:bg-blue-600 text-white'
            : 'bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-900 dark:text-gray-100'
        }`}
      >
        {plan.cta}
      </button>
    </div>
  );
}

function PricingFeatureItem({ feature }: { feature: PricingFeature }) {
  return (
    <div className="flex items-center space-x-3">
      <div className={`w-4 h-4 rounded-full flex items-center justify-center ${
        feature.enabled
          ? 'bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-400'
          : 'bg-gray-100 text-gray-400 dark:bg-gray-800 dark:text-gray-600'
      }`}>
        {feature.enabled ? (
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20" aria-label="Included">
            <title>Feature included</title>
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        ) : (
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20" aria-label="Not included">
            <title>Feature not included</title>
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        )}
      </div>
      <span className={`${
        feature.enabled 
          ? 'text-gray-900 dark:text-gray-100' 
          : 'text-gray-500 dark:text-gray-500 line-through'
      }`}>
        {feature.name}
        {feature.value && (
          <span className="text-sm text-gray-600 dark:text-gray-400 ml-1">
            ({feature.value})
          </span>
        )}
      </span>
    </div>
  );
}

export function Pricing({ pricingData }: PricingProps) {
  const [activeTab, setActiveTab] = useState<'cloud' | 'onPremise'>('cloud');
  const { theme } = useTheme();

  return (
    <div className="">
      {/* Header */}
      <div className="py-20 flex justify-center bg-gradient-to-br from-[#1B45B4] to-[#1C2792] px-4 md:px-0">
        <div className="text-center flex flex-col space-y-4 text-white">
          <div className="text-4xl font-semibold">Pricing Plans</div>
          <div className="text-lg">
            Choose the perfect plan for your business. Start small, scale as you grow.
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="max-w-screen-xl mx-auto px-4 md:px-0 pt-12">
        <div className="flex justify-center mb-12">
          <div className="bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
            <button
              type="button"
              onClick={() => setActiveTab('cloud')}
              className={`px-6 py-2 rounded-md font-medium transition-colors ${
                activeTab === 'cloud'
                  ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'
              }`}
            >
              Cloud
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('onPremise')}
              className={`px-6 py-2 rounded-md font-medium transition-colors ${
                activeTab === 'onPremise'
                  ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'
              }`}
            >
              On-Premise
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 grid-cols-1 gap-8 max-w-6xl mx-auto">
          {(activeTab === 'cloud' ? pricingData.cloud : pricingData.onPremise).map((plan) => (
            <PricingCard key={`${plan.type}-${plan.level}`} plan={plan} />
          ))}
        </div>

        {/* Footer */}
        <div className="text-center mt-12 text-gray-600 dark:text-gray-400">
          <p>All plans include 30-day money-back guarantee</p>
          <p className="mt-2">Need a custom solution? <Link to="/contact" className="text-blue-500 hover:text-blue-600">Contact us</Link></p>
        </div>
      </div>
    </div>
  );
}
