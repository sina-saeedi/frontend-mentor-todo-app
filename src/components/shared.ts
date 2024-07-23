export type Todo = {
	id: string;
	text: string;
	status: "active" | "completed";
};

export type Filter = Todo["status"] | "all";
