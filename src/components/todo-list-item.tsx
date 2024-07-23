import { Checkbox } from "./ui/checkbox";
import { Todo } from "./shared";
import classes from "./todo-list-item.module.css";
import iconCross from "../assets/icon-cross.svg";

type Props = {
	todo: Todo;
	onChange: (checked: boolean) => void;
	onRemove: (id: Todo["id"]) => void;
};

export function TodoListItem(props: Props) {
	const { todo, onChange, onRemove } = props;

	return (
		<li key={todo.id} className={classes.todo}>
			<div
				role="button"
				onClick={onChange.bind(
					null,
					todo.status === "completed" ? false : true
				)}
			>
				<Checkbox
					checked={todo.status === "completed" ? true : false}
					onChange={() => {}}
				/>
				<p role="button">
					{todo.status === "active" ? todo.text : <s>{todo.text}</s>}
				</p>
			</div>
			<button onClick={onRemove.bind(null, todo.id)}>
				<img src={iconCross} alt="Remove todo" />
			</button>
		</li>
	);
}
