import type { MetaFunction } from "react-router";
import { Link } from "react-router";
import IndexLayout from "~/components/IndexLayout";

export const meta: MetaFunction = () => {
  return [{ title: "Thank You - Message Sent" }];
};

export default function ContactThanks() {
  return (
    <IndexLayout>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center py-12">
        <div className="max-w-lg mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl text-center">
            
            {/* Success Icon */}
            <div className="mx-auto w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <title>Success</title>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>

            {/* Thank You Message */}
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Thank You!
            </h1>
            
            <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
              Your message has been sent successfully. We'll get back to you within 24 hours.
            </p>

            {/* Next Steps */}
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 mb-6">
              <h3 className="text-sm font-semibold text-blue-900 dark:text-blue-300 mb-2">
                What happens next?
              </h3>
              <ul className="text-sm text-blue-800 dark:text-blue-400 space-y-1 text-left">
                <li>• We'll review your message</li>
                <li>• Our team will respond within 24 hours</li>
                <li>• If you requested a demo, we'll schedule it</li>
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Link
                to="/"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors inline-block"
              >
                Return to Homepage
              </Link>
              
              <Link
                to="/features"
                className="w-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-white font-semibold py-3 px-6 rounded-lg transition-colors inline-block"
              >
                Explore Features
              </Link>
            </div>

            {/* Contact Info */}
            <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Need immediate assistance?
              </p>
              <a 
                href="mailto:hello@pigu-automation.com" 
                className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
              >
                hello@pigu.shop
              </a>
            </div>
          </div>
        </div>
      </div>
    </IndexLayout>
  );
}
