import { useRef } from "react";
import { Checkbox } from "./ui/checkbox";
import classes from "./todo-input.module.css";

type Props = {
	onNewTodo: (title: string) => void;
};

export function TodoInput(props: Props) {
	const { onNewTodo } = props;
	const inputRef = useRef<HTMLInputElement>(null);

	const handleCreateNewTodo = () => {
		const value = inputRef.current && inputRef.current.value;
		if (value) {
			onNewTodo(inputRef.current.value);
			inputRef.current.value = "";
		}
	};

	return (
		<form
			className={classes.container}
			onSubmit={(e) => {
				e.preventDefault();
				handleCreateNewTodo();
			}}
		>
			<Checkbox checked={false} onChange={handleCreateNewTodo} />
			<input
				type="text"
				placeholder="Create a new todo..."
				className={classes["text-input"]}
				ref={inputRef}
			/>
		</form>
	);
}
