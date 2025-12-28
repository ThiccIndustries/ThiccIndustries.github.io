import styled from 'styled-components';
import { WindowHost } from './architexture/WindowHost';
import { WindowManagerProvider } from './architexture/WindowManager';
import "./apps";
import { Taskbar } from './ui/taskbar/Taskbar';
import { theme } from './theme';
import { FlexSpacer } from './ui/util/FlexSpacer';

const MainRoot = styled.div`
    background-color: ${theme.backgroundColor};
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
`;

export const App = () => {
    return (
        <MainRoot
            onContextMenu={(e) => { e.preventDefault() }}
        >
            <WindowManagerProvider>
                <WindowHost />
                <FlexSpacer />
                <Taskbar />
            </WindowManagerProvider>
        </MainRoot>
    )
}
