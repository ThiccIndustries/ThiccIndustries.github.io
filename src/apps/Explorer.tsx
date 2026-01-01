import { useEffect } from "react";
import { img } from "../ui/util/files";
import type { AppComponent, AppContext } from "./registry";
import { useWindowManager } from "../architexture/context/WindowManager";

export const Explorer: AppComponent = ({ctx}: {ctx : AppContext}) => {
    const wm = useWindowManager();

    useEffect(() => {
        if(ctx.command === ""){
            wm.open("error", "Specify folder name.");
            ctx.close();
        }
    },[]);
    
    return (
        <>
        </>
    );
}

Explorer.app = {
    id: "explorer",
    title: "Explorer",
    defaultSize: { width: 541, height: 334 },
    showTab: true,
    icon32: img("apps/minecraft/icon32.png"),
    icon16: img("apps/minecraft/icon16.png")
}