import styled from "styled-components";
import { theme } from "../../theme";
import { DetailImg } from "../util/DetailImg";
import { StartmenuItem } from "./StartmenuItem";
import { Spacer } from "../winform/Spacer";
import { getApp, START_SECTIONS } from "../../apps/registry";
import { FlexSpacer } from "../util/FlexSpacer";
import { StartmenuFolderItem } from "./StartmenuFolderItem";
import { useState } from "react";
import { StartmenuFolder } from "./StartmenuFolder";

const StartmenuRoot = styled.div`
    margin-left: ${theme.startmenu.position[0]}px;
    margin-bottom: ${theme.startmenu.position[1]}px;
    display: flex;
    width: fit-content;
    min-width: 212px;
    height: ${theme.startmenu.height}px;
    box-sizing: content-box;
    border-style: solid;
    border-image-source: url(${theme.startmenu.border});
    border-width: ${theme.startmenu.top}px ${theme.startmenu.right}px ${theme.startmenu.bottom}px ${theme.startmenu.left}px;
    border-image-slice: ${theme.startmenu.top} ${theme.startmenu.right} ${theme.startmenu.bottom} ${theme.startmenu.left};
    border-image-repeat: stretch;
    z-index: 2;
    background-color: ${({theme}) => theme.foregroundColor};
`;

const Items = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
`;

const Logo = styled.div`
    background-image: linear-gradient(to top,
        ${({theme}) => theme.startmenuBar.join(",")}
    );
`;

const Root = styled.div`
    display: flex;
`

export const Startmenu = () => {
    const winver = getApp("winver")!;
    const run = getApp("run")!;

    const [folder, setFolder] = useState("");

    const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

    return (
        <Root>
            <StartmenuRoot
                onMouseDown={(e) => e.stopPropagation()}
                onClick={(e) => e.stopPropagation()}
            >
                <Logo>
                    <DetailImg src={theme.startmenu.logo}></DetailImg>
                </Logo>
                <Items>
                    <StartmenuItem height={32} app={winver} />
                    <Spacer />
                    {START_SECTIONS.map(section => 
                        <StartmenuFolderItem key={section} name={section} display={capitalize(section)} showFolder={setFolder}/>
                    )}
                    <FlexSpacer />
                    <Spacer />
                    <StartmenuItem height={32} app={run} />
                </Items>
            </StartmenuRoot>
            {folder !== "" && 
                <StartmenuFolder
                    name={folder}
                    style={{}}
                />
            }
        </Root>

    )
}