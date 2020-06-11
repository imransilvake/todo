// react
import React from 'react'

// app
import TodoEnum from './Todo.enum'
import { Button } from 'antd'
import { dateFormat1 } from '../../utilities/helpers/Date'

/**
 * a single todo item in the list
 * @param todo
 * @param index
 * @param todoCrud
 * @returns {*}
 * @constructor
 */
function TodoItem({ todo, index, todoCrud }) {
	return (
		<div
			className="td-todo-item"
			style={{ textDecoration: todo.isCompleted ? 'line-through' : '' }}
		>
			{todo.text}
			<div>
				{/* date */}
				{!!todo.date && (
					<p>{ dateFormat1(todo.date) }</p>
				)}

				{/* complete a todo */}
				{!todo.isCompleted && (
					<Button
						type="button"
						onClick={() => !todo.isCompleted && todoCrud(index, TodoEnum.TODO_COMPLETE)}
					>
						Complete
					</Button>
				)}

				{/* undo a todo */}
				{todo.isCompleted && (
					<Button type="button" onClick={() => todoCrud(index, TodoEnum.TODO_UNDO)}>
						Undo
					</Button>
				)}

				{/* remove a todo */}
				<Button type="button" onClick={() => todoCrud(index, TodoEnum.TODO_DELETE)}>
					remove
				</Button>
			</div>
		</div>
	)
}
export default TodoItem;
