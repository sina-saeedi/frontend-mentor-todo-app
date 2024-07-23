import { useState, useEffect } from "react";
import { Theme } from "../shared/theme";
import { COLOR_SCHEME } from "../constants/local-storage";

export function useDetectTheme(): Theme {
	const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");
	const [theme, setTheme] = useState<Theme>(() => {
		const localTheme = localStorage.getItem(COLOR_SCHEME);
		if (localTheme === null && prefersDarkScheme.matches === true) {
			return "dark";
		} else if (localTheme === null && prefersDarkScheme.matches === false) {
			return "light";
		}
		switch (localTheme) {
			case "dark":
				return "dark";
			case "light":
			default:
				return "light";
		}
	});

	useEffect(() => {
		prefersDarkScheme.onchange = handleOnChange;

		return () =>
			prefersDarkScheme.removeEventListener("change", handleOnChange);
	});

	const handleOnChange = (e: MediaQueryListEvent) => {
		setTheme(e.matches ? "dark" : "light");
	};

	return theme;
}
