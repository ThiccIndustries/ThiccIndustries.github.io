import { img } from "../ui/util/files";
import type { AppComponent, AppContext } from "./registry";
import styled from "styled-components";
import { DetailImg } from "../ui/util/DetailImg";
import { DetailText } from "../ui/util/DetailText";
import { FlexSpacer } from "../ui/util/FlexSpacer";
import { Button } from "../ui/winform/Button";
import { useEnterKey } from "../architexture/hooks/UseEnterKey";

const Flex = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    width: 100%;
`;
const FlexColumn = styled.div`
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    height: 100%;
`;

export const Error: AppComponent = ({ctx}: {ctx : AppContext}) => {
    useEnterKey(ctx.focused, () => {ctx.close()});


    return (
        <FlexColumn style={{padding: 8}}>
            <Flex style={{gap: 16}}>
                <DetailImg src={img("apps/error/icon.png")} />
                <DetailText>{ctx.command}</DetailText>
            </Flex>
            <FlexSpacer />
            <Flex>
                <Button onClick={ctx.close}>Ok</Button>
            </Flex>
        </FlexColumn>
    );
}

Error.app = {
    id: "error",
    title: "Error",
    defaultSize: { width: 512, height: 94 },
}