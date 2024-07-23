import ReactDOM from "react-dom/client";
import { App } from "./App.tsx";
import { ThemeProvider } from "./context/theme.tsx";
import "normalize.css";
import "./index.css";

// Due to the issues react-beautiful-dnd has with React v18 and above,
// StrictMode should be off to proper drag & drop behaviors.

ReactDOM.createRoot(document.getElementById("root")!).render(
	<ThemeProvider>
		<App />
	</ThemeProvider>
);
