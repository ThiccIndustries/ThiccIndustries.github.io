import styled from "styled-components";
import { theme } from "../../theme";
import type { CSSProperties } from "react";
import { appRegistry } from "../../apps/registry";
import { DetailText } from "../util/DetailText";
import { StartmenuItem } from "./StartmenuItem";
import { Spacer } from "../winform/Spacer";

const Root = styled.div`
    margin-top: 6px;
    margin-left: -6px;
    margin-bottom: ${theme.startmenu.position[1]}px;
    display: flex;
    flex-direction: column;
    width: fit-content;
    height: fit-content;
    min-height: 24px;
    min-width: 212px;
    box-sizing: content-box;
    border-style: solid;
    border-image-source: url(${theme.startmenu.border});
    border-width: ${theme.startmenu.top}px ${theme.startmenu.right}px ${theme.startmenu.bottom}px ${theme.startmenu.left}px;
    border-image-slice: ${theme.startmenu.top} ${theme.startmenu.right} ${theme.startmenu.bottom} ${theme.startmenu.left};
    border-image-repeat: stretch;
    z-index: ${2^31};
    background-color: ${({theme}) => theme.foregroundColor};
`;

const Items = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    justify-content: center;
`;

export const StartmenuFolder = ({name, style}: {name: string, style?: CSSProperties}) => {
    const apps = Array.from(appRegistry.values());
    const matching = apps.filter((app) => app.showInStart === name);
    const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);
    return (
        <Root
            style={style}
            onMouseDown={(e) => e.stopPropagation()}
            onClick={(e) => e.stopPropagation()}
        >
            <div style={{
                color: 'black',
                display: 'flex',
                width: '100%',
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: '4px',
            }}><DetailText>{capitalize(name)}</DetailText></div>
            <Spacer />
        {matching.length === 0 &&
            <div style={{
                color: 'gray',
                display: 'flex',
                width: '100%',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '4px',
            }}><DetailText>Empty Folder</DetailText></div>
        }
            
            <Items>
                {matching.map((app) => 
                    <StartmenuItem height={16} key={app.id} app={app}></StartmenuItem>
                )}
            </Items>
        </Root>
    )
}