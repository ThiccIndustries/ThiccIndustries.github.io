import type { WindowId } from "../architexture/WindowManager";

export type AppContext = {
    windowId: WindowId,
    focused: boolean;
    open: (app: string) => void;
    close: () => void;
    focus: () => void;
}

export type AppProperties = {
    id: string;
    title: string;
    defaultSize?: { width: number; height: number };
    positioning?: {horizontal: 'left' | 'middle' | 'right', vertical: 'top' | 'center' | 'bottom'},
    resiable?: boolean;
    showInStart?: boolean;
    showTab?: boolean;
    backgroundColor?: string;
    icon16?: string;
    icon24?: string;
    icon32?: string;
    component: React.ComponentType;
}

export type AppComponent<Props = any> = React.FC<Props & { ctx: AppContext }> & {
    app: Omit<AppProperties, 'component'>
};

const appRegistry = new Map<string, AppProperties>();

export const registerApp = (app: AppComponent) => {
    const meta = app.app;
    if (!meta) throw new Error("App missing static app metadata");

    appRegistry.set(meta.id, {
        id: meta.id,
        title: meta.title ?? meta.id,
        defaultSize: meta.defaultSize ?? { width: 800, height: 600 },
        positioning: meta.positioning ?? { horizontal: 'middle', vertical: 'center' },
        resiable: meta.resiable ?? false,
        showInStart: meta.showInStart ?? false,
        showTab: meta.showTab ?? false,
        backgroundColor: meta.backgroundColor,
        icon16: meta.icon16,
        icon24: meta.icon24,
        icon32: meta.icon32,
        component: app
    });
}

export const getApp = (appId: string) => {
    return appRegistry.get(appId);
}