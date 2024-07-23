import { Header } from "./components/header";
import { TodoCard } from "./components/todo-card";
import classes from "./App.module.css";

export function App() {
	return (
		<main className={classes.main}>
			<div className={classes.inner}>
				<Header />
				<TodoCard />
			</div>
		</main>
	);
}
