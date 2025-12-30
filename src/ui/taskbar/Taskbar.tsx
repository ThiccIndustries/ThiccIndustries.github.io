import styled, { css } from "styled-components";
import { useWindowManager } from "../../architexture/WindowManager"
import { Clock } from "./Clock";
import { theme } from "../../theme";
import { DetailImg } from "../util/DetailImg";
import { Startmenu } from "../startmenu/Startmenu";

const Root = styled.div`
    display: flex;
    height: ${theme.taskbar.height}px;
    width: 100%;
    background-image: url(${theme.taskbar.stretch});
    background-color: ${({theme}) => theme.foregroundColor};
    z-index: 1;
`

const TabRoot = styled.div`
    display: flex;
    flex: 1;
    margin-left: 3px;
    margin-right: 3px;
    gap: 3px;
`

const TaskbarElement = styled.div<{ $width: number, $image: string, $active?: boolean }>`
    height: ${theme.taskbar.height}px;
    width: ${props => props.$width}px;
    background-image: url(${props => props.$image});

    color: "BLACK";
    font-family: ${theme.font.family};
    font-size: ${theme.taskbar.textSize}px;
    font-weight: ${props => props.$active ? "BOLD" : "NORMAL"};
`

const TaskbarButton = styled(TaskbarElement) < {$active: boolean, $pressed: string} >`
    ${props => props.$active && css`background-image: url(${props.$pressed})`}
`

const TaskbarTab = styled(TaskbarElement)`
    display: flex;
    padding-left: 4px;
    padding-right: 4px;
    padding-top: 8px;
    padding-bottom: 6px;
    box-sizing: border-box;
    align-items: center;
    gap: 2px;
    white-space: nowrap;
`

const TaskbarClock = styled(TaskbarElement)`
    display: flex;
    align-items: center;
    box-sizing: border-box;
    padding-left: 28px;
    padding-right: 4px;
    padding-top: 8px;
    padding-bottom: 5px;
`

export const Taskbar = () => {
    const wm = useWindowManager();

    return (
        <>
            {wm.showStart && <Startmenu />}
            <Root
                onMouseDown={(e) => e.stopPropagation()}
                onClick={(e) => e.stopPropagation()}
            >
                <TaskbarButton
                    $active={wm.showStart}
                    $width={theme.taskbar.buttonWidth}
                    $image={theme.taskbar.button}
                    $pressed={theme.taskbar.buttonPressed}

                    onMouseDown={() => { wm.setShowStart(!wm.showStart) }}

                />
                <TaskbarElement $width={theme.taskbar.detailWidth} $image={theme.taskbar.detail} />
                <TabRoot>
                    {wm.windows
                        .sort((a, b) => a.age - b.age)
                        .map(w => ( w.app.showTab ?
                            <TaskbarTab 
                                key={w.id}
                                onMouseDown={() => { wm.focus(w.id) }}
                                $width={theme.taskbar.tabWidth}
                                $image={w.focused ? theme.taskbar.tabPressed : theme.taskbar.tab}
                                $active={w.focused}
                            >
                                {w.app.icon16 && <DetailImg draggable={false} style={{ width: 16, height: 16 }} src={w.app.icon16} />}
                                <span style={{ userSelect: "none", overflow: "hidden" }}>{w.title.slice(0, 22)}</span>
                            </TaskbarTab> : undefined
                        ))}
                </TabRoot>
                <TaskbarClock $width={theme.taskbar.clockWidth} $image={theme.taskbar.clock}>
                    <Clock />
                </TaskbarClock>
            </Root>
        </>
    );
}