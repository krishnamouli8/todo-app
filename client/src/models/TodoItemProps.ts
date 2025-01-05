import Todo from "./Todo";

interface TodoItemProps {
	todo: Todo;
	onToggle: (id: string, completed: boolean) => Promise<void>;
	onToggleImportant: (id: string, important: boolean) => Promise<void>;
	onDelete: (id: string) => Promise<void>;
}

export default TodoItemProps;