import { useEffect } from "react";
import { img } from "../ui/util/files";
import type { AppComponent, AppContext } from "./registry";
import { useWindowManager } from "../architexture/context/WindowManager";

export const Explorer: AppComponent = ({ctx}: {ctx : AppContext}) => {
    const wm = useWindowManager();

    useEffect(() => {
        if(ctx.command === ""){
            wm.error("Specify folder name.");
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
    icon16: img("apps/explorer/icon16.png")
}