import { useEffect, useState } from "react";

export default function useDark() {
    const [theme, setTheme] = useState(localStorage.theme);
    const colorTheme = theme === "light" ? "dark" : "light";

    useEffect(() => {
        const root = window.document.documentElement;
        root.classList.remove(colorTheme);
        root.classList.add(theme);

        // save the theme to the localStorage
        localStorage.setItem("theme", theme);
    }, [theme, colorTheme]);

    return [colorTheme, setTheme]
}


// tranform table to card