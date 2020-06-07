// react
import React from 'react';

/**
 * a single todo item in the list
 * @param todo
 * @param index
 * @param completeTodo
 * @param removeTodo
 * @returns {*}
 * @constructor
 */
function TodoItem({ todo, index, completeTodo, removeTodo }) {
	return (
		<div
			className="td-todo-item"
			style={{ textDecoration: todo.isCompleted ? 'line-through' : '' }}
		>
			{todo.text}
			<div>
				<button type="button" onClick={() => !todo.isCompleted && completeTodo(index)}>Complete</button>
				<button type="button" onClick={() => removeTodo(index)}>close</button>
			</div>
		</div>
	);
}

export default TodoItem;
