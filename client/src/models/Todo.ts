
interface Todo {
	_id?: string;
	completed: boolean;
	important: boolean;
	body: string;
	userId?: string;
}

export default Todo;
