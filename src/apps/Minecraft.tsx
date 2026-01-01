import { img } from "../ui/util/files";
import type { AppComponent, AppContext } from "./registry";

export const Minecraft: AppComponent = ({ctx} : {ctx: AppContext}) => {
    return (
        <iframe 
        style={{width:"100%", height: "100%", pointerEvents: ctx.focused ? undefined : 'none'}}
        
        src="https://classic.minecraft.net" />
    );
}

Minecraft.app = {
    id: "minecraft",
    title: "Minecraft",
    defaultSize: { width: 854, height: 480 },
    showTab: true,
    showInStart: 'games',
    icon32: img("apps/minecraft/icon32.png"),
    icon16: img("apps/minecraft/icon16.png")
}