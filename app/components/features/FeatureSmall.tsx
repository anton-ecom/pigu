import { Link } from "react-router";
import { Feature } from "../Feature";
import { useTheme } from "../ThemeContext";

export interface FeatureProps {
  header?: string;
  subheader?: string;
  features: string[];
  image?: string;
}

export function FeatureSmall({ header, subheader, features, image }: FeatureProps) {
  const theme = useTheme();

  return (
    <div className="group">
      <div className="h-full bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-300 hover:-translate-y-1">
        
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center mb-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mr-3">
              <div className="w-5 h-5 bg-white rounded-sm opacity-90" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              {header}
            </h3>
          </div>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            {subheader}
          </p>
        </div>

        {/* Features List */}
        <div className="space-y-3 mb-6">
          {features.map((feature) => (
            <div key={feature} className="text-sm">
              <Feature>{feature}</Feature>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-gray-100 dark:border-gray-700">
          <div className="flex items-center text-blue-600 dark:text-blue-400 text-sm font-medium group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors">
            <span>Explore feature</span>
            <svg className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <title>Arrow right</title>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
