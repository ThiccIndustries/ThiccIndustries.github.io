import styled from 'styled-components';
import { WindowHost } from './architexture/WindowHost';
import { useWindowManager, WindowManagerProvider } from './architexture/context/WindowManager';
import "./apps";
import { Taskbar } from './ui/taskbar/Taskbar';
import { themes } from './theme';
import { FlexSpacer } from './ui/util/FlexSpacer';
import { ThemeManager } from './architexture/context/ThemeManager';
import { useEffect, useRef } from 'react';

const MainRoot = styled.div`
    @font-face {
        font-family: 'W95font';
        src: url('w95font.woff2') format('woff2'),
            url('w95font.woff2') format('woff');
        font-weight: normal;
    }

    @font-face {
        font-family: 'W95font';
        src: url('w95font-bold.woff2') format('woff2'),
            url('w95font-bold.woff2') format('woff');
        font-weight: bold;

    }

    display: flex;
    flex-direction: column;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    font-family: "MS PGothic";
    font-size: 12px;
    font-smooth: never;
    -webkit-font-smoothing : none;
    line-height: 1;
    background-color: ${({theme}) => theme.backgroundColor};
`;

export const App = () => {
    return (
        <ThemeManager theme={themes["default"]}>
            <WindowManagerProvider>
                <AppBootstrap />
                <MainRoot onContextMenu={(e) => { e.preventDefault() }}>
                    <WindowHost />
                    <FlexSpacer />
                    <Taskbar />
                </MainRoot>
            </WindowManagerProvider>
        </ThemeManager>
    )
}

const AppBootstrap = () => {
    const {open} = useWindowManager();
    const didOpen = useRef(false);
    
    useEffect(() => {
        if(didOpen.current) return;
        setTimeout(() => open("winver"), 500);
        didOpen.current = true;
    }, []);

    return null;
}