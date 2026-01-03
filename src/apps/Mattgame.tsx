import { img } from "../ui/util/files";
import type { AppComponent, AppContext } from "./registry";

export const MattGame: AppComponent = ({ctx} : {ctx: AppContext}) => {
    return (
        <iframe 
        style={{width:"100%", height: "100%", pointerEvents: ctx.focused ? undefined : 'none'}}
        
        src="https://thearst3rd.com/games/clickpond-hexaflexagon/" />
    );
}

MattGame.app = {
    id: "mattgame",
    title: "Hexaflexagon",
    defaultSize: { width: 800, height: 600 },
    showTab: true,
    showInStart: 'games',
    icon16: img("apps/mattgame/icon16.png")
}