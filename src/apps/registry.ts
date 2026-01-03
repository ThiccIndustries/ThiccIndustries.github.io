import type { WindowId } from "../architexture/context/WindowManager";

export type AppContext = {
    windowId: WindowId,
    focused: boolean;
    command: string;
    close: () => void;
    focus: () => void;
}

export const START_SECTIONS = [
    'downloads',
    'programs',
    'games',
    'tools'
] as const;

type StartSection = typeof START_SECTIONS[number];

export type AppProperties = {
    id: string;
    title: string;
    defaultSize?: { width: number; height: number };
    positioning?: {horizontal: 'left' | 'middle' | 'right', vertical: 'top' | 'center' | 'bottom'},
    resiable?: boolean;
    showInStart?: StartSection | 'none';
    showTab?: boolean;
    backgroundColor?: string;
    icon16?: string;
    icon24?: string;
    icon32?: string;
    command?: string;
    component: React.ComponentType;
}

export type AppComponent<Props = any> = React.FC<Props & { ctx: AppContext }> & {
    app: Omit<AppProperties, 'component'>
};

//DANGER DANGER!
export const appRegistry = new Map<string, AppProperties>();

export const registerApp = (app: AppComponent, props?: Omit<AppProperties, "component">) => {
    const meta = {
        ...app.app,
        ...props
    };

    if (!meta) throw new Error("App missing static app metadata");

    appRegistry.set(meta.id, {
        id: meta.id,
        title: meta.title ?? meta.id,
        defaultSize: meta.defaultSize ?? { width: 800, height: 600 },
        positioning: meta.positioning ?? { horizontal: 'middle', vertical: 'center' },
        resiable: meta.resiable ?? false,
        showInStart: meta.showInStart ?? 'none',
        showTab: meta.showTab ?? false,
        backgroundColor: meta.backgroundColor,
        icon16: meta.icon16,
        icon24: meta.icon24,
        icon32: meta.icon32,
        command: meta.command ?? "",
        component: app
    });
}

export const getApp = (appId: string) => {
    return appRegistry.get(appId);
}