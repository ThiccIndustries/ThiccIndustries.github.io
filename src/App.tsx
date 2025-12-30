import styled from 'styled-components';
import { WindowHost } from './architexture/WindowHost';
import { WindowManagerProvider } from './architexture/WindowManager';
import "./apps";
import { Taskbar } from './ui/taskbar/Taskbar';
import { theme, themes } from './theme';
import { FlexSpacer } from './ui/util/FlexSpacer';
import { ThemeManager } from './architexture/ThemeManager';

const MainRoot = styled.div`
    display: flex;
    flex-direction: column;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    font-family: ${theme.font.family};
    font-size: 12px;
    font-smooth: never;
    -webkit-font-smoothing : none;
    line-height: 1;

    background-color: ${({theme}) => theme.backgroundColor}
`;

export const App = () => {
    return (
        <ThemeManager theme={themes["classic"]}>
            <WindowManagerProvider>
                <MainRoot onContextMenu={(e) => { e.preventDefault() }}>
                    <WindowHost />
                    <FlexSpacer />
                    <Taskbar />
                </MainRoot>
            </WindowManagerProvider>
        </ThemeManager>
    )
}
