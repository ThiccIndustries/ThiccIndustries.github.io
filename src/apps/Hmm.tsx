import { useState } from "react";
import { img } from "../ui/util/files";
import type { AppComponent, AppContext} from "./registry";
import { ScrollPane } from "../ui/winform/ScrollPane";

export const Hmm: AppComponent = ({ctx} : {ctx: AppContext}) => {
    const hmmLinks = [
        'https://friendlydads.net/',
        'https://hooooooooo.com/',
        'https://pointerpointer.com/',
        'https://crouton.net/',
        'https://html5zombo.com/',
        'https://tunnelsnakes.com/',
        'https://bonzi.link/'
    ];

    const [index] = useState<string>(hmmLinks[Math.floor(Math.random() * hmmLinks.length)]);

    return (
        <ScrollPane style={{border: "none", height: "100%"}}>
            <iframe 
            style={{border: "none", width: 1024, height: 768, pointerEvents: ctx.focused ? undefined : 'none'}}
            src={index} />
        </ScrollPane>
    );
}

Hmm.app = {
    id: "hmm",
    title: "Hmm?",
    defaultSize: { width: 1024, height: 768 },
    showTab: true,
    showInStart: 'programs',
    icon16: img("apps/hmm/icon16.png"),
    icon32: img("apps/hmm/icon32.png")
}