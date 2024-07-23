import { useState, useEffect, useRef } from "react";
import {
	useContext,
	createContext,
	ReactNode,
	Dispatch,
	SetStateAction,
} from "react";
import { useDetectTheme } from "../hooks/useDetectTheme";
import { Theme } from "../shared/theme";
import { COLOR_SCHEME } from "../constants/local-storage";

type ThemeContext = {
	theme: Theme;
	setTheme: Dispatch<SetStateAction<Theme>>;
};

const themeContext = createContext<ThemeContext | undefined>(undefined);
const Provider = themeContext.Provider;

type Props = {
	children: ReactNode;
};

export function ThemeProvider({ children }: Props) {
	const detectedTheme = useDetectTheme();
	const initialDetectedTheme = useRef(detectedTheme);
	const [theme, setTheme] = useState(detectedTheme);

	if (detectedTheme !== initialDetectedTheme.current) {
		initialDetectedTheme.current = detectedTheme;
		setTheme(initialDetectedTheme.current);
	}

	document.documentElement.setAttribute("data-theme", theme);

	useEffect(() => {
		localStorage.setItem(COLOR_SCHEME, theme);
	}, [theme]);

	return (
		<Provider
			value={{
				theme,
				setTheme,
			}}
		>
			{children}
		</Provider>
	);
}

export function useTheme() {
	const theme = useContext(themeContext);

	if (theme === undefined) {
		throw Error("You should use `useTheme` inside of a ThemeProvider");
	}
	return theme;
}
