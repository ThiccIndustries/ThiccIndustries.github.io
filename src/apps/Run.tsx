import styled from "styled-components";
import { img } from "../ui/util/files";
import type { AppComponent, AppContext } from "./registry";
import { Button } from "../ui/winform/Button";
import { Textbox } from "../ui/winform/Textbox";
import { DetailImg } from "../ui/util/DetailImg";
import { DetailText } from "../ui/util/DetailText";
import { useState } from "react";
import { useEnterKey } from "../architexture/hooks/UseEnterKey";
import { useWindowManager } from "../architexture/context/WindowManager";

const Root = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    padding: 16px;
    box-sizing: border-box;
    gap: 16px;
`;

const Info = styled.div`
    display: flex;
    gap: 8px;
`;

const InputPane = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
`

const Buttons = styled.div`
    display: flex;
    flex: 1;
    gap: 4px;
    justify-content: flex-end;
    align-items: center;
    margin-top: 15px;
`;

export const Run: AppComponent = ({ ctx }: { ctx: AppContext }) => {
    const [input, setInput] = useState("");
    const wm = useWindowManager();

    useEnterKey(ctx.focused, () => launch());

    const launch = () => {
        const [app, ...rest] = input.trim().split(/\s+/);
        const command = rest.join(" ");

        try {
            wm.open(app, command);
        } catch (e: unknown) {
            wm.error(`Cannot find the file ' ${app} '. Make sure the filename is correct.`)
        } finally {
            ctx.close();
        }
    };

    return (
        <Root>
            <Info>
                <DetailImg src={ img("apps/run/icon.png") } />
                <DetailText>Type the name of a program, and ThiccIndustries will open it for you.</DetailText>
            </Info>
            <InputPane>
                <DetailText> Open: </DetailText>
                <Textbox autoFocus style={{ flex: 1 }} onChange={(e) => {
                    setInput(e.target.value)
                }} placeholder="" />
            </InputPane>
            <Buttons>
                <Button onClick={launch}>Ok</Button>
                <Button onClick={ctx.close}>Cancel</Button>
            </Buttons>
        </Root>
    );
}

Run.app = {
    id: "run",
    title: "Run...",
    defaultSize: { width: 341, height: 154 },
    icon24: img("apps/run/icon24.png"),
    positioning: {
        horizontal: 'left',
        vertical: 'bottom'
    }
}