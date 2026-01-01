import React, { type ReactNode, createContext, useReducer, useCallback, useContext, useState } from 'react';
import { getApp, type AppProperties } from '../../apps/registry';
import { theme } from '../../theme';

export type WindowId = string;
export type WindowState = {
    id: WindowId;
    age: number;
    x: number;
    y: number;
    width: number;
    height: number;

    title: string;

    zIndex: number;
    focused: boolean;
    minimized: boolean;
    maximized: boolean;

    app: AppProperties;
    component: React.ComponentType;
    props?: any;
};

type Action =
    | { type: 'OPEN'; window: WindowState }
    | { type: 'CLOSE'; id: WindowId }
    | { type: 'FOCUS'; id: WindowId }
    | { type: 'MOVE'; id: WindowId; x: number; y: number }
    | { type: 'RESIZE'; id: WindowId; width: number; height: number }
    | { type: 'MINIMIZE'; id: WindowId, val?: boolean }
    | { type: 'MAXIMIZE'; id: WindowId };

function windowReducer(state: WindowState[], action: Action): WindowState[] {
    switch (action.type) {
        case 'OPEN':
            return [...state.map(w => ({...w, focused: false})), action.window];

        case 'CLOSE':
            return state.filter(w => w.id !== action.id);
        
        case 'MINIMIZE':
            return state.map(w => w.id === action.id 
                ? {...w, focused: !(action.val ?? true), minimized: action.val ?? true}
                : w
            );

        case 'FOCUS': {
            const topZ = Math.max(0, ...state.map(w => w.zIndex)) + 1;
            return state.map(w =>
                w.id === action.id
                    ? { ...w, minimized: false, focused: true, zIndex: topZ }
                    : { ...w, focused: false }
            );
        }

        case 'MOVE':
            return state.map(w =>
                w.id === action.id ? { ...w, x: action.x, y: action.y } : w
            );

        case 'RESIZE':
            return state.map(w =>
                w.id === action.id ? {...w, width: action.width, height: action.height} : w
            );
        default:
            return state;
    }
}

const WindowManagerContext = createContext<{
    windows: WindowState[];
    open: (appId: string) => void;
    close: (id: WindowId) => void;
    minimize: (id: WindowId, val?: boolean) => void;
    focus: (id: WindowId) => void;
    move: (id: WindowId, x: number, y: number) => void;
    resize: (id: WindowId, width: number, height: number) => void;
    setShowStart: (val: boolean) => void;
    showStart: boolean;
} | null>(null);

const getCoordinates = (
    size : { width: number, height: number },
    positioning : { horizontal: 'left' | 'middle' | 'right', vertical: 'top' | 'center' | 'bottom' }) => {

    const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
    const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)
        - theme.taskbar.height
        - theme.border.top
        - theme.border.bottom
        - 8;

    const x = (
        positioning.horizontal === 'left' ? 0 :
        positioning.horizontal === 'middle' ? (vw - size.width) / 2 :
        vw - size.width) + 4;

    const y = (
        positioning.vertical === 'top' ? 0 :
        positioning.vertical === 'center' ? (vh - size.height) / 2 :
        vh - size.height) + 4;

    return { x: x, y: y };
}

export const WindowManagerProvider = ({ children } : { children: ReactNode }) => {
    const [windows, dispatch] = useReducer(windowReducer, []);
    const [showStart, setShowStart] = useState(true);

    const open = useCallback((appId: string) => {
        const app = getApp(appId);

        if (!app) throw new Error("App definition missing: " + appId);

        const pos = getCoordinates(app.defaultSize!, app.positioning!);
        const topZ = Math.max(0, ...windows.map(w => w.zIndex)) + 1;
        dispatch({
            type: 'OPEN',
            window: {
                id: crypto.randomUUID(),
                age: Date.now(),
                x: pos.x,
                y: pos.y,
                width: app.defaultSize!.width,
                height: app.defaultSize!.height,
                title: app.title,
                zIndex: topZ,
                focused: true,
                maximized: false,
                minimized: false,
                app: app,
                component: app.component
            }
        });
    }, [windows]);

    const value = {
        windows,
        open,
        close: (id: WindowId) => dispatch({ type: 'CLOSE', id }),
        minimize: (id: WindowId, val?: boolean) => dispatch({type: 'MINIMIZE', id, val}),
        focus: (id: WindowId) => dispatch({ type: 'FOCUS', id }),
        move: (id: WindowId, x: number, y: number) => dispatch({ type: 'MOVE', id, x, y }),
        resize: (id: WindowId, width: number, height: number) => dispatch({ type: 'RESIZE', id, width, height }),
        setShowStart: setShowStart,
        showStart: showStart
    };

    return (
        <WindowManagerContext.Provider value={value}>
            {children}
        </WindowManagerContext.Provider>
    )
}
export function useWindowManager() {
    const ctx = useContext(WindowManagerContext);
    if (!ctx) throw new Error('useWindowManager outside provider');
    return ctx;
}