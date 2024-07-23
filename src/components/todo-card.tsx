import { useState, useReducer } from "react";
import { TodoInput } from "./todo-input";
import { TodoList } from "./todo-list";
import { Todo, Filter } from "../components/shared";
import { v4 as uuidv4 } from "uuid";
import classes from "./todo-card.module.css";

const TODOS: Todo[] = [
	{
		id: uuidv4(),
		status: "completed",
		text: "Complete online JavaScript course",
	},
	{ id: uuidv4(), status: "active", text: "Jog around the park 3x" },
	{ id: uuidv4(), status: "active", text: "10 minutes meditation" },
	{ id: uuidv4(), status: "active", text: "Read for 1 hour" },
	{ id: uuidv4(), status: "active", text: "Pick up groceries" },
];

type Action =
	| { type: "add"; payload: string }
	| { type: "remove"; payload: string }
	| { type: "toggle"; payload: string }
	| { type: "order"; payload: { src: number; dest: number } }
	| { type: "clear-completed" };

function todoReducer(prevState: Todo[], action: Action): Todo[] {
	switch (action.type) {
		case "add":
			return [
				{
					id: uuidv4(),
					status: "active",
					text: action.payload,
				},
				...prevState,
			];
		case "remove":
			return prevState.filter((t) => t.id != action.payload);
		case "toggle":
			return prevState.map((t) => {
				if (t.id === action.payload) {
					return {
						...t,
						status: t.status === "active" ? "completed" : "active",
					};
				}
				return t;
			});
		case "clear-completed":
			return prevState.filter((t) => t.status === "active");
		case "order":
			return newTodoOrder(
				prevState,
				action.payload.src,
				action.payload.dest
			);
		default:
			return prevState;
	}
}

function newTodoOrder(prevState: Todo[], src: number, dest: number) {
	const newTodos = Array.from(prevState);
	const [draggedTodo] = newTodos.splice(src, 1);
	newTodos.splice(dest, 0, draggedTodo);
	return newTodos;
}

export function TodoCard() {
	const [todos, dispatch] = useReducer(todoReducer, TODOS);
	const [filter, setFilter] = useState<Filter>("all");

	const handleNewTodo = (title: string) => {
		dispatch({
			type: "add",
			payload: title,
		});
	};

	const handleRemoveTodo = (id: Todo["id"]) => {
		dispatch({
			type: "remove",
			payload: id,
		});
	};

	const handleToggleTodo = (id: Todo["id"]) => {
		dispatch({
			type: "toggle",
			payload: id,
		});
	};

	const handleClearCompleted = () => {
		dispatch({
			type: "clear-completed",
		});
		setFilter("all");
	};

	const handleChangeFilter = (newFilter: Filter) => {
		setFilter(newFilter);
	};

	const handleOrder = (src: number, dest: number) => {
		dispatch({
			type: "order",
			payload: {
				src,
				dest,
			},
		});
	};

	return (
		<div className={classes.container}>
			<div>
				<TodoInput onNewTodo={handleNewTodo} />
			</div>
			<div>
				<TodoList
					todos={todos}
					filter={filter}
					onOrder={handleOrder}
					onToggle={handleToggleTodo}
					onRemoveTodo={handleRemoveTodo}
					onFilterChange={handleChangeFilter}
					onClearCompleted={handleClearCompleted}
				/>
			</div>
		</div>
	);
}
