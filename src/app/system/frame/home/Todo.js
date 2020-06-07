// react
import React, { useState } from 'react';

// app
import TodoForm from './Todo-Form';
import TodoItem from './Todo-Item';

function Todo() {
	// hook: todo
	const [todoList, setTodoList] = useState([
		{
			text: 'Learn about React',
			isCompleted: false
		},
		{
			text: 'Meet friend for lunch',
			isCompleted: false
		},
		{
			text: 'Build really cool todo app',
			isCompleted: false
		}
	]);

	/**
     * add a new todo
     * @param text
     */
	const addTodo = (text) => {
		const newTodoList = [...todoList, { text }];
		setTodoList(newTodoList);
	};

	/**
	 * complete a todo
	 * @param index
	 */
	const completeTodo = (index) => {
		const newTodoList = [...todoList];
		newTodoList[index].isCompleted = true;
		setTodoList(newTodoList);
	};

	/**
	 * delete a todo
	 * @param index
	 */
	const removeTodo = (index) => {
		const newTodoList = [...todoList];
		newTodoList.splice(index, 1);
		setTodoList(newTodoList);
	};

	return (
		<div className="td-todo">
			<div className="td-todo-list">
				{ /* todo list */}
				{
					todoList.map((todo, index) => (
						<TodoItem
							key={index}
							index={index}
							todo={todo}
							completeTodo={completeTodo}
							removeTodo={removeTodo}
						/>
					))
				}

				{ /* todo form */}
				<TodoForm addTodo={addTodo}/>
			</div>
		</div>
	);
}

export default Todo;
