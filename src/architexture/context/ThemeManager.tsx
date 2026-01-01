import Cookies from "js-cookie";
import { createContext, useContext, useState } from "react";
import { ThemeProvider, type DefaultTheme } from "styled-components";
import { themes } from "../../theme";

type ThemeContextType = {
    theme: DefaultTheme;
    setTheme: (theme: DefaultTheme) => void;
};

const ThemeContext = createContext<ThemeContextType | null>(null);

export const ThemeManager = ({ theme: def, children }: { theme: DefaultTheme, children: React.ReactNode }) => {
    const cookieTheme = Cookies.get("theme");
    const [theme, setTheme] = useState<DefaultTheme>(cookieTheme ? themes[cookieTheme] : def);

    const set = (val: DefaultTheme) => {
        const themename = Object.keys(themes).find((key) => themes[key] === val);
        Cookies.set("theme", themename!);
        setTheme(val);
    }

    return (
        <ThemeContext.Provider value={{ theme: theme, setTheme: set }}>
            <ThemeProvider theme={theme}>
                {children}
            </ThemeProvider>
        </ThemeContext.Provider>
    );
}

export const useThemeManager = () => {
    const ctx = useContext(ThemeContext);
    if (!ctx) throw new Error("useTheme must be used inside AppThemeProvider");
    return ctx;
}