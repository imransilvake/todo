// react
import React, { useState } from 'react';

// app
import TodoForm from './Todo-Form';
import TodoItem from './Todo-Item';
import TodoEnum from './Todo.enum'

function Todo() {
	// hook: todo
	const [todoList, setTodoList] = useState([]);

	/**
	 * todo CRUD: add, complete, undo, delete
	 */
	const todoCrud = (stateOrIndex, type) => {
		let newTodoList = [...todoList];
		switch (type) {
			case TodoEnum.TODO_ADD:
				newTodoList = [...todoList, stateOrIndex];
				break;
			case TodoEnum.TODO_COMPLETE:
				newTodoList[stateOrIndex].isCompleted = true;
				break;
			case TodoEnum.TODO_UNDO:
				newTodoList[stateOrIndex].isCompleted = false;
				break;
			case TodoEnum.TODO_DELETE:
				newTodoList.splice(stateOrIndex, 1);
				break;
			default:
				// console.error('wrong type');
		}

		// set state
		setTodoList(newTodoList);
	};

	return (
		<div className="td-todo">
			<div className="td-list">
				{/* todo list */}
				{
					todoList.map((todo, index) => (
						<TodoItem
							key={index}
							index={index}
							todo={todo}
							todoCrud={todoCrud}
						/>
					))
				}
			</div>

			{/* todo form */}
			<div className="td-form">
				<TodoForm todoCrud={todoCrud}/>
			</div>
		</div>
	);
}
export default Todo;
