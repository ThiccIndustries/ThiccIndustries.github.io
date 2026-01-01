import styled from "styled-components";
import { DetailImg } from "../util/DetailImg";
import { DetailText } from "../util/DetailText";
import { img } from "../util/files";
import { FlexSpacer } from "../util/FlexSpacer";
import { forwardRef, useRef, type CSSProperties } from "react";

const Root = styled.div`
    display: flex;
    user-select: none;
    background-color: transparent;
    align-items: center;
    gap: 8px;
    padding-left: 4px;
    padding-right: 4px;
    box-sizing: border-box;

    &:hover{
        background-color: ${({theme}) => theme.primaryColor}
    }

    &:hover ${DetailText}{
        color: WHITE;
    }
`

interface Props {
    name: string;
    display: string; 
    showFolder: (val: string) => void;
    style?: CSSProperties;
};

export const StartmenuFolderItem = forwardRef<HTMLDivElement, Props>(({name, display, showFolder, style}, ref) => {
    const timer = useRef<number>(null);

    const hoverDelay = 500;
    const onMouseEnter = () => {
        timer.current = window.setTimeout(() => {
            showFolder(name);
        }, hoverDelay)
    };

    const onMouseLeave = () => {
        if(timer.current){
            clearTimeout(timer.current);
        }
    }

    return (
        <Root style={style} ref={ref} onMouseDown={() => showFolder(name)} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
            <DetailImg src={img(`system/folders/${name}.png`)}></DetailImg>
            <DetailText style={{ whiteSpace: "nowrap" }}>{display}</DetailText>
            <FlexSpacer />
            <DetailImg src={img('system/startmenu-folder.png')}></DetailImg>
        </Root>
    )
})
