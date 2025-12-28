
interface Todo {
	_id: string;
	user_id?: string;
	userId?: string;
	completed: boolean;
	important: boolean;
	body: string;
	tag?: string;
	tag_color?: string;
	time?: string;
	created_at?: string;
	updated_at?: string;
	completed_at?: string;
	tagColor?: string; // Adding camelCase version for frontend use
	category?: string;
	dueDate?: string;
}


export default Todo;
