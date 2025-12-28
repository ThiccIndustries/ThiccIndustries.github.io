import styled from "styled-components";
import { img } from "../ui/util/files";
import type { AppComponent, AppContext } from "./registry";
import { Button } from "../ui/winform/Button";
import { FlexSpacer } from "../ui/util/FlexSpacer";
import { Textbox } from "../ui/winform/Textbox";
import { DetailImg } from "../ui/util/DetailImg";
import { DetailText } from "../ui/util/DetailText";
import { useState } from "react";

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
    gap: 4px;
    justify-content: flex-end;
`;

export const Run: AppComponent = ({ ctx }: { ctx: AppContext }) => {
    const [input, setInput] = useState("");

    const launch = () => {
        try {
            ctx.open(input);
        } catch (e: unknown) {
            console.log(e);
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
                <Textbox style={{ flex: 1 }} onChange={(e) => {
                    setInput(e.target.value)
                }} placeholder="" />
            </InputPane>
            <FlexSpacer />
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
    backgroundColor: "#D4D0C8",
    icon24: img("apps/run/icon24.png"),
    positioning: {
        horizontal: 'left',
        vertical: 'bottom'
    }
}