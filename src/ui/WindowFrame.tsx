import React, { useEffect, useRef, type CSSProperties } from 'react';
import styled, { useTheme } from 'styled-components';


import { useWindowManager, type WindowState } from '../architexture/context/WindowManager';
import type { AppContext } from '../apps/registry';
import { FlexSpacer } from './util/FlexSpacer';
import { theme } from '../theme';
import { DetailImg } from './util/DetailImg';
import { img } from './util/files';

const Container = styled.div.attrs<{ $z: number, $width: number, $height: number, $x: number, $y: number}>(props => ({
    style: {
        width: props.$width,
        height: props.$height,
        left: props.$x,
        top: props.$y,
        zIndex: props.$z
    }
}))<{ $focused: boolean }>`
    position: absolute;
    box-sizing: content-box;
    border-style: solid;
    border-image-source: url(${ props => props.$focused ? theme.border.imageActive : theme.border.imageInactive });
    border-width: ${theme.border.top}px ${theme.border.right}px ${theme.border.bottom}px ${theme.border.left}px;
    border-image-slice: ${theme.border.top} ${theme.border.right} ${theme.border.bottom} ${theme.border.left};
    border-image-repeat: stretch;
`;

const GrabHandle = styled.div<{ $active: boolean }>`
    position: relative;
    width: 100%;
    top: ${-theme.border.gradTop}px;
    height: ${theme.border.gradHeight}px;
    background-image: linear-gradient(to right,
        ${({theme, $active}) => $active ? theme.activeTitleBar.join(", ") : theme.inactiveTitleBar.join(", ") }
    );

    display: flex;
    box-sizing: border-box;
    padding-left: 2px;
    padding-right: 2px;
    gap: 2px;
    align-items: center;
`

const WindowContent = styled.div < {$color: string} >`
    position: absolute;
    top: 0;
    left: 0;
    background: ${props => props.$color};
    width: 100%;
    height: 100%;
    overflow: hidden;
`

const WindowTitle = styled.span<{$active: boolean}>`
    color: ${({theme, $active}) => $active ? theme.primaryText : theme.secondaryText};
    font-family: ${theme.font.family};
    font-weight: ${theme.titlebar.weight};
    font-size: ${theme.titlebar.size}px;
    font-smooth: never;
    -webkit-font-smoothing : none;
    user-select: none;
    pointer-events: none;
`

const WindowButton = styled.div<{$icon: string, $iconPressed: string}>`
    width: ${theme.titlebar.close.size[0]}px;
    height: ${theme.titlebar.close.size[1]}px;
    background-image: url(${({$icon}) => img($icon)});

    &:active{
        background-image: url(${({$iconPressed}) => img($iconPressed)});
    }
`

export const WindowFrame = ({ state, style }: { state: WindowState, style?: CSSProperties }) => {
    const Content = state.component as React.FC<{ctx: AppContext}>;
    const ref = useRef<HTMLDivElement>(null);

    //draging system
    const dragging = useRef(false);
    const resizing = useRef(false);
    const offsetX = useRef(0);
    const offsetY = useRef(0);

    const wm = useWindowManager();

    const ctx: AppContext = {
        windowId: state.id,
        focused: state.focused,
        command: state.command,
        close: () => wm.close(state.id),
        focus: () => wm.focus(state.id)
    }

    const onMouseDown = (e: React.MouseEvent) => {
        e.preventDefault();
        ref.current!.style.pointerEvents = 'none';

        dragging.current = true;
        offsetX.current = e.clientX - state.x;
        offsetY.current = e.clientY - state.y;
    };

    const onMouseMove = (e: MouseEvent) => {
        if (dragging.current) {
            const newX = e.clientX - offsetX.current;
            const newY = e.clientY - offsetY.current;
            wm.move(state.id, newX, newY);
            e.preventDefault();
            e.stopPropagation();
        }
    };

    const onMouseUp = () => {
        dragging.current = false;
        resizing.current = false;
        ref.current!.style.pointerEvents = 'auto';
    };

    useEffect(() => {
        window.addEventListener("mousemove", onMouseMove);
        window.addEventListener("mouseup", onMouseUp);

        return () => {
            window.removeEventListener("mousemove", onMouseMove);
            window.removeEventListener("mouseup", onMouseUp);
        }
    });

    const theme = useTheme();
    
    return <Container
        style={style}
        $width={state.width}
        $height={state.height}
        $x={state.x}
        $y={state.y}
        $z={state.zIndex}
        $focused={state.focused}
        onClick={(e) => e.stopPropagation()}
        onMouseDown={(e) => {
            e.stopPropagation();

            if (!state.focused) {
                wm.focus(state.id);
            }
        }}
    >
        <GrabHandle $active={state.focused} onMouseDown={onMouseDown}>
            {state.app.icon16 && <DetailImg style={{ width: 16, height: 16 }} src={state.app.icon16} />}
            <WindowTitle $active={state.focused}>{state.title}</WindowTitle>
            <FlexSpacer/>
            { 
                state.app.showTab &&
                <WindowButton
                $icon = {"system/window/minimize-active.png"}
                $iconPressed = {"system/window/minimize-pressed.png"}
                onMouseDown={ (e) => {if(!state.focused) wm.focus(state.id); e.stopPropagation()} /*stop dragging*/ }
                onClick={(e) => { e.stopPropagation(); if(state.focused) wm.minimize(state.id)}}
                />
            }
            <WindowButton
            $icon = {"system/window/button-active.png"}
            $iconPressed = {"system/window/button-pressed.png"}
            onMouseDown={ (e) => {if(!state.focused) wm.focus(state.id); e.stopPropagation()} /*stop dragging*/ }
            onClick={(e) => { e.stopPropagation(); if(state.focused) wm.close(state.id)}}
            />
        </GrabHandle>

        <WindowContent ref={ref} $color={state.app.backgroundColor ?? theme.foregroundColor}>
            <Content ctx={ctx} { ...state.props }/>
        </WindowContent>
    </Container>;
}