import { Link } from "react-router";
import {Check ,CircleCheck} from "lucide-react"
export function Feature({children} : {children: React.ReactNode}) {

    return (
        <div className="flex items-center space-x-3">
            <CircleCheck  className="h-5 w-5 stroke-2 dark:text-black text-white fill-green-600" />
            <div>{children}</div>
        </div>
    )
}