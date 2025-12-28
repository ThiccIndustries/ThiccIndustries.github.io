import { img } from "./ui/util/files";

export type ColorScheme = {
    name: string,
    backgroundColor: string,
    foregroundColor: string,
    activeTitleBar: [string, string],
    inactiveTitleBar: [string, string],
    primaryColor: string,
    secondaryColor: string,
}

//themes
export const yellow: ColorScheme = {
    name: "Yellow",
    backgroundColor: "#A3730D",
    foregroundColor: "#D4D0C8",
    activeTitleBar: ["#F6AE12", "F4DBA6"],
    inactiveTitleBar: ["#808080", "#C0C0C0"],
    primaryColor: "#F6AE12",
    secondaryColor: "#725109"
};

export const theme = {
    backgroundColor: "#6D2739",

    border: {
        gradActive: ["#F6AE12", "#F52C29", "#E60A3D", "#B80A50", "#6A1B59"],
        gradInactive: ["#808080", "#C0C0C0"],
        imageActive: img("winborder.png"),
        imageInactive: img("winborder-inactive.png"),
        gradTop: 19,
        gradHeight: 18,
        top: 22,
        bottom: 3,
        left: 3,
        right: 3,
    },

    "font": {
        "family": "ＭＳ Ｐゴシック"
    },

    resize: {
        image: img("resize.png"),
        size: [16, 16],
    },

    titlebar: {
        size: 12,
        colorActive: "white",
        colorInactive: "#D4D0C8",
        weight: "BOLD",
        close: {
            active: img("button-active.png"),
            inactive: img("button-inactive.png"),
            pressed: img("button-pressed.png"),
            size: [16, 14],
        },
    },

    taskbar: {
        stretch: img("taskbar-stretch.png"),
        button: img("taskbar-left.png"),
        buttonPressed: img("taskbar-left-pressed.png"),
        detail: img("taskbar-detail.png"),
        clock: img("taskbar-right.png"),
        tab: img("tab.png"),
        tabPressed: img("tab-pressed.png"),
        tabWidth: 160,
        height: 28,
        buttonWidth: 58,
        detailWidth: 93,
        clockWidth: 86,
        textSize: 12,
        textColor: "BLACK"
    },

    startmenu: {
        border: img("system/startmenu-border.png"),
        logo: img("system/startmenu-logo.png"),
        background: "#D4D0C8",
        width: 176,
        height: 279,
        top: 3,
        bottom: 3,
        left: 3,
        right: 3,
        position: [2, -4],
        itemHoverColor: "#A31B1B",
    },

    application: {
        default16: img("apps/default.png")
    }
};