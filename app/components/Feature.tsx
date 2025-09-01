import { Link } from "react-router";
import { Check, CircleCheck } from "lucide-react"

export function Feature({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 mt-0.5">
                <CircleCheck className="h-5 w-5 stroke-2 text-green-600 dark:text-green-400 fill-green-100 dark:fill-green-900" />
            </div>
            <div className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {children}
            </div>
        </div>
    )
}