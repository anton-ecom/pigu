import { Link } from "react-router";
import { Feature } from "../Feature";
import { useTheme } from "../ThemeContext";

export interface FeatureProps {
  header?: string;
  subheader?: string;
  features: string[];
  image?: string;
}

export function FeatureBlock({ header, subheader, features, image }: FeatureProps) {
  const theme = useTheme();

  return (
    <div className="px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex lg:flex-row flex-col lg:space-y-0 space-y-8 lg:space-x-16 items-center">
          
          {/* Content Side */}
          <div className="lg:w-1/2 space-y-8">
            <div className="space-y-4">
              <h3 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                {header}
              </h3>
              <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                {subheader}
              </p>
            </div>

            <div className="grid gap-4">
              {features.map((feature) => (
                <div key={feature} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                  <Feature>{feature}</Feature>
                </div>
              ))}
            </div>

            <div className="pt-4">
              <Link 
                to="/contact" 
                className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-color"
              >
                Learn More
                <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <title>Arrow right</title>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Image Side */}
          {image && (
            <div className="lg:w-1/2 flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl transform rotate-1" />
                <div className="relative bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700">
                  <img 
                    className="w-full max-w-md rounded-lg" 
                    src={`./features/${image}_${theme.theme}.png`} 
                    alt={`${header} interface preview`}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
