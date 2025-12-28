import styled from "styled-components";
import { WindowFrame } from "../ui/WindowFrame";
import { useWindowManager } from "./WindowManager";

const Root = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
`;

export function WindowHost() {
    const wm = useWindowManager();

    return (
        <Root
            onMouseDown={() => {
                wm.focus("");
                wm.setShowStart(false);
            } }
        >
            {wm.windows
                .sort((a, b) => a.zIndex - b.zIndex)
                .map(w => (
                    <WindowFrame key={w.id} state={w} />
                ))}
        </Root>
    );
}