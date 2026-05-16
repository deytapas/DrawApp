import { ReactNode } from "react";

export function IconButton({icon,onclick,activated}:{
    icon: ReactNode,
    onclick: () => void,
    activated: boolean
}) {
    return <div onClick={onclick} className={`cursor-pointer m2 border rounded-full p-2 bg-black hover:bg-gray ${activated ? "text-red-500" : "text-white"}`}>
        {icon}
    </div>
}