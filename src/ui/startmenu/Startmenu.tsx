import styled from "styled-components";
import { theme } from "../../theme";
import { DetailImg } from "../util/DetailImg";
import { StartmenuItem } from "./StartmenuItem";
import { Spacer } from "../winform/Spacer";
import { getApp } from "../../apps/registry";
import { FlexSpacer } from "../util/FlexSpacer";

const Root = styled.div`
    margin-left: ${theme.startmenu.position[0]}px;
    margin-bottom: ${theme.startmenu.position[1]}px;
    display: flex;
    width: fit-content;
    height: ${theme.startmenu.height}px;
    box-sizing: content-box;
    border-style: solid;
    border-image-source: url(${theme.startmenu.border});
    border-width: ${theme.startmenu.top}px ${theme.startmenu.right}px ${theme.startmenu.bottom}px ${theme.startmenu.left}px;
    border-image-slice: ${theme.startmenu.top} ${theme.startmenu.right} ${theme.startmenu.bottom} ${theme.startmenu.left};
    border-image-repeat: stretch;
    z-index: 2;
    background-color: ${theme.startmenu.background};
`;

const Items = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
`

export const Startmenu = () => {
    const winver = getApp("winver")!;
    const run = getApp("run")!;

    return (
        <Root
            onMouseDown={(e) => e.stopPropagation()}
            onClick={(e) => e.stopPropagation()}
        >
            <DetailImg src={theme.startmenu.logo}></DetailImg>
            <Items>
                <StartmenuItem app={winver} />
                <Spacer />
                <FlexSpacer />
                <Spacer />
                <StartmenuItem app={run} />
            </Items>
        </Root>
    )
}