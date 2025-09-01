import { Link } from "react-router";
import {Check} from "lucide-react"
export function Feature({children} : {children: React.ReactNode}) {

    return (
        <div className="flex items-center space-x-2">
            <Check className="h-4 w-4 text-green-500" />
            <div>{children}</div>
        </div>
    )
}