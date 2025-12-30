import { createContext, useContext, useState } from "react";
import { ThemeProvider, type DefaultTheme } from "styled-components";

type ThemeContextType = {
    theme: DefaultTheme;
    setTheme: (theme: DefaultTheme) => void;
};

const ThemeContext = createContext<ThemeContextType | null>(null);

export const ThemeManager = ({ theme: def, children }: { theme: DefaultTheme, children: React.ReactNode }) => {
    const [theme, setTheme] = useState<DefaultTheme>(def);

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
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