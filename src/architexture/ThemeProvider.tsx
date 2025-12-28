import { createContext, useContext, useState, type ReactNode } from "react";
import { yellow, type ColorScheme } from "../theme";

type ThemeContextValue = ColorScheme & {
    setTheme: (val: ColorScheme) => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
    const [theme, setTheme] = useState<ColorScheme>(yellow);

    const value: ThemeContextValue = {
        ...theme,
        setTheme
    };

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    );
}

export const useTheme = () => {
    const ctx = useContext(ThemeContext);
    if (!ctx) throw new Error('useTheme outside prvider');
    return ctx;
}