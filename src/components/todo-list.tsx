import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { TodoListItem } from "./todo-list-item";
import { Todo, Filter } from "./shared";
import classes from "./todo-list.module.css";

type Props = {
	todos: Todo[];
	filter: Filter;
	onOrder: (src: number, dest: number) => void;
	onToggle: (id: Todo["id"]) => void;
	onRemoveTodo: (id: Todo["id"]) => void;
	onFilterChange: (newFilter: Filter) => void;
	onClearCompleted: () => void;
};

const FILTER_BUTTONS: Filter[] = ["all", "active", "completed"];

export function TodoList(props: Props) {
	const {
		todos,
		filter,
		onOrder,
		onToggle,
		onRemoveTodo,
		onFilterChange,
		onClearCompleted,
	} = props;
	const totalTodosToRender = todos.reduce((acc, todo) => {
		if (filter === "all" && todos.length > 0) {
			return todos.length;
		}
		if (filter !== "all" && todo.status === filter) {
			return acc + 1;
		}
		return acc;
	}, 0);
	const itemsLeftCount = todos?.filter(
		(todo) => todo.status === "active"
	).length;

	const filterButtons = FILTER_BUTTONS.map((v) => {
		return (
			<button
				key={v}
				className={filter === v ? classes.active : ""}
				onClick={onFilterChange.bind(null, v)}
			>
				{v.charAt(0).toUpperCase() + v.slice(1)}
			</button>
		);
	});

	return (
		<>
			<div className={classes.container}>
				<DragDropContext
					onDragEnd={(result) => {
						if (result.destination?.index !== undefined) {
							onOrder(
								result.source.index,
								result.destination.index
							);
						}
					}}
				>
					<Droppable droppableId="todos">
						{(provided) => {
							return (
								<ul
									className={classes.list}
									ref={provided.innerRef}
									{...provided.droppableProps}
								>
									{todos?.map((todo, index) => {
										if (
											filter !== "all" &&
											todo.status !== filter
										) {
											return null;
										}
										return (
											<Draggable
												key={todo.id}
												draggableId={todo.id}
												index={index}
											>
												{(provided) => {
													return (
														<div
															className={
																classes[
																	"todo-wrapper"
																]
															}
															ref={
																provided.innerRef
															}
															{...provided.dragHandleProps}
															{...provided.draggableProps}
														>
															<TodoListItem
																todo={todo}
																onChange={onToggle.bind(
																	null,
																	todo.id
																)}
																onRemove={onRemoveTodo.bind(
																	null,
																	todo.id
																)}
															/>
														</div>
													);
												}}
											</Draggable>
										);
									})}
									{provided.placeholder}
								</ul>
							);
						}}
					</Droppable>
				</DragDropContext>
				{totalTodosToRender === 0 && (
					<div className={classes["empty-list"]}>
						{(filter === "all" || filter === "active") && (
							<p>There's nothing todo yet!</p>
						)}
						{filter === "completed" && (
							<p>There's nothing completed yet!</p>
						)}
					</div>
				)}
				<div className={classes.footer}>
					<span>
						{itemsLeftCount} item{itemsLeftCount === 1 ? "" : "s"}{" "}
						left
					</span>
					<div className={classes["filter-buttons"]}>
						{filterButtons}
					</div>
					<button
						className={classes["clear-button"]}
						onClick={onClearCompleted}
					>
						Clear Completed
					</button>
				</div>
			</div>
			<div className={classes["mobile-filter-buttons"]}>
				{filterButtons}
			</div>
			<p className={classes.hint}>Drag and drop to reorder list</p>
		</>
	);
}
