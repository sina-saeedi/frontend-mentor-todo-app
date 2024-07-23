import { useTheme } from "../context/theme";
import IconMoon from "../assets/icon-moon.svg";
import IconSun from "../assets/icon-sun.svg";
import classes from "./header.module.css";

export function Header() {
	const { theme, setTheme } = useTheme();

	const handleThemeToggle = () => {
		setTheme(theme === "dark" ? "light" : "dark");
	};

	return (
		<div className={classes.container}>
			<h1 className={classes.title}>{"TODO"}</h1>
			<img
				role="button"
				width={24}
				src={theme === "dark" ? IconSun : IconMoon}
				style={{
					cursor: "pointer",
				}}
				alt="Theme switch"
				onClick={handleThemeToggle}
			/>
		</div>
	);
}
