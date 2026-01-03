import type { DefaultTheme } from "styled-components";
import { img } from "./ui/util/files";
import "styled-components";

declare module "styled-components" {
    export interface DefaultTheme{
        name: string,
        backgroundColor: string,
        foregroundColor: string,
        activeTitleBar: string[],
        inactiveTitleBar: string[],
        startmenuBar: string[],
        primaryColor: string,
        secondaryColor: string,
        primaryText: string,
        secondaryText: string
    }
}

//themes

export const themes: Record<string, DefaultTheme> = {
    "default":{
        name: "Thicc Industries Standard",
        backgroundColor: "#242424",
        foregroundColor: "#D4D0C8",
        activeTitleBar: ["#F6AE12", "#F52C29", "#E60A3D", "#B80A50", "#6A1B59"],
        inactiveTitleBar: ["#808080", "#C0C0C0"],
        startmenuBar: ["#F6AE12", "#F52C29", "#E60A3D", "#B80A50", "#6A1B59", "#000000"],
        primaryColor: "#3F1036",
        secondaryColor: "#3F1036",
        primaryText: "#FFFFFF",
        secondaryText: "#D4D0C8"
    },

    "classic": {
        name: "Windows Classic",
        backgroundColor: "#3A6EA5",
        foregroundColor: "#D4D0C8",
        activeTitleBar: ["#0A246A", "#A6CAF0"],
        inactiveTitleBar: ["#808080", "#C0C0C0"],
        startmenuBar: ["#0000FF", "#000000"],
        primaryColor: "#0A246A",
        secondaryColor: "#0A246A",
        primaryText: "#FFFFFF",
        secondaryText: "#D4D0C8"
    },

    "classicer": {
        name: "Windows Classic-er",
        backgroundColor: "#3A6EA5",
        foregroundColor: "#C0C0C0",
        activeTitleBar: ["#000180", "#000180"],
        inactiveTitleBar: ["#808080", "#808080"],
        startmenuBar: ["#000180", "#0000FF", "#000180", "#000180", "#000180"],
        primaryColor: "#000180",
        secondaryColor: "#000180",
        primaryText: "#FFFFFF",
        secondaryText: "#C0C0C0"
    },

    "classic-est": {
        name: "Windows Classic-est",
        backgroundColor: "#008080",
        foregroundColor: "#C0C0C0",
        activeTitleBar: ["#000180", "#000180"],
        inactiveTitleBar: ["#808080", "#808080"],
        startmenuBar: ["#808080", "#808080"],
        primaryColor: "#000180",
        secondaryColor: "#000180",
        primaryText: "#FFFFFF",
        secondaryText: "#C0C0C0"
    },

    "gold": {
        name: "Thicc Industries Gold",
        backgroundColor: "#CCA351",
        foregroundColor: "#D4D0C8",
        activeTitleBar: ["#F6AE12", "#F4DBA6"],
        inactiveTitleBar: ["#808080", "#C0C0C0"],
        startmenuBar: ["#F6AE12", "#000000"],
        primaryColor: "#F6AE12",
        secondaryColor: "#725109",
        primaryText: "#FFFFFF",
        secondaryText: "#D4D0C8"
    },

    "grapefruit": {
        name: "Thicc Industries Grapefruit",
        backgroundColor: "#F45858",
        foregroundColor: "#D4D0C8",
        activeTitleBar: ["#F52C29", "#F2A4A4"],
        inactiveTitleBar: ["#808080", "#C0C0C0"],
        startmenuBar: ["#F52C29", "#000000"],
        primaryColor: "#721313",
        secondaryColor: "#721313",
        primaryText: "#FFFFFF",
        secondaryText: "#D4D0C8"
    },

    "hotpink": {
        name: "Thicc Industries Hot Pink",
        backgroundColor: "#E55274",
        foregroundColor: "#D4D0C8",
        activeTitleBar: ["#E60A3D", "#E59CAD"],
        inactiveTitleBar: ["#808080", "#C0C0C0"],
        startmenuBar: ["#E60A3D", "#000000"],
        primaryColor: "#72051F",
        secondaryColor: "#72051F",
        primaryText: "#FFFFFF",
        secondaryText: "#D4D0C8"
    },

    "magenta": {
        name: "Thicc Industries Magenta",
        backgroundColor: "#B24975",
        foregroundColor: "#D4D0C8",
        activeTitleBar: ["#B80A50", "#B77C95"],
        inactiveTitleBar: ["#808080", "#C0C0C0"],
        startmenuBar: ["#B80A50", "#000000"],
        primaryColor: "#66062E",
        secondaryColor: "#66062E",
        primaryText: "#FFFFFF",
        secondaryText: "#D4D0C8"
    },

    "purple": {
        name: "Thicc Industries Purple",
        backgroundColor: "#683C5F",
        foregroundColor: "#D4D0C8",
        activeTitleBar: ["#6A1B59", "#66455F"],
        inactiveTitleBar: ["#808080", "#C0C0C0"],
        startmenuBar: ["#6A1B59", "#000000"],
        primaryColor: "#3F1036",
        secondaryColor: "#3F1036",
        primaryText: "#FFFFFF",
        secondaryText: "#D4D0C8"
    },
}

export const theme = {
    border: {
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
        "family": "MS PGothic",
    },

    resize: {
        image: img("resize.png"),
        size: [16, 16],
    },

    titlebar: {
        size: 12,
        weight: "BOLD",
        close: {
            size: [16, 14]
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
    },

    startmenu: {
        border: img("system/startmenu-border.png"),
        logo: img("system/startmenu-logo.png"),
        width: 176,
        height: 279,
        top: 3,
        bottom: 3,
        left: 3,
        right: 3,
        position: [2, -4],
    },

    application: {
        default16: img("apps/default.png")
    }
};