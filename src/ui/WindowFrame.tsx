import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';


import { useWindowManager, type WindowState } from '../architexture/WindowManager';
import type { AppContext } from '../apps/registry';
import { FlexSpacer } from './util/FlexSpacer';
import { theme } from '../theme';
import { DetailImg } from './util/DetailImg';

const Container = styled.div.attrs<{ $width: number, $height: number, $x: number, $y: number, $focused: boolean}>(props => ({
    style: {
        width: props.$width,
        height: props.$height,
        left: props.$x,
        top: props.$y,
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
        ${props => props.$active ? theme.border.gradActive.join(", ") : theme.border.gradInactive.join(", ") }
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
`

const WindowTitle = styled.span<{$active: boolean}>`
    color: ${props => props.$active ? theme.titlebar.colorActive : theme.titlebar.colorInactive};
    font-family: ${theme.font.family};
    font-weight: ${theme.titlebar.weight};
    font-size: ${theme.titlebar.size}px;
    font-smooth: never;
    -webkit-font-smoothing : none;
    user-select: none;
`

const WindowButton = styled.div<{$active: boolean}>`
    width: ${theme.titlebar.close.size[0]}px;
    height: ${theme.titlebar.close.size[1]}px;

    ${props => props.$active
    ? `
        background-image: url(${theme.titlebar.close.active});
        &:active{
            background-image: url(${theme.titlebar.close.pressed});
        }
    `
    : `
        background-image: url(${theme.titlebar.close.inactive});
    ` 
    }
`

export const WindowFrame = ({ state }: { state: WindowState }) => {
    const Content = state.component as React.FC<{ctx: AppContext}>;

    //draging system
    const dragging = useRef(false);
    const resizing = useRef(false);
    const offsetX = useRef(0);
    const offsetY = useRef(0);

    const wm = useWindowManager();

    const ctx: AppContext = {
        windowId: state.id,
        open: (app: string) => wm.open(app),
        close: () => wm.close(state.id),
        focus: () => wm.focus(state.id)
    }

    const onMouseDown = (e: React.MouseEvent) => {
        dragging.current = true;
        offsetX.current = e.clientX - state.x;
        offsetY.current = e.clientY - state.y;
        e.preventDefault();
    };

    const onMouseMove = (e: MouseEvent) => {
        if (dragging.current) {
            const newX = e.clientX - offsetX.current;
            const newY = e.clientY - offsetY.current;
            wm.move(state.id, newX, newY);
            e.preventDefault();
        }
    };

    const onMouseUp = () => {
        dragging.current = false;
        resizing.current = false;
    };

    useEffect(() => {
        window.addEventListener("mousemove", onMouseMove);
        window.addEventListener("mouseup", onMouseUp);

        return () => {
            window.removeEventListener("mousemove", onMouseMove);
            window.removeEventListener("mouseup", onMouseUp);
        }
    }, [state.x, state.y]);

    return <Container
        $width={state.width}
        $height={state.height}
        $x={state.x}
        $y={state.y}
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
            <WindowButton onClick={(e) => { e.stopPropagation(); if(state.focused) wm.close(state.id)}} $active={ state.focused }></WindowButton>
        </GrabHandle>

        <WindowContent $color={state.app.backgroundColor!}>
            <Content ctx={ctx} { ...state.props }/>
        </WindowContent>
    </Container>;
}