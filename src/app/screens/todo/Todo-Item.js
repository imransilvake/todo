// react
import React from 'react'

// app
import { TodoCrudEnum } from './Todo.enum'
import { Button, Divider } from 'antd'
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
	console.log('Todo Item');
	return (
		<>
			{/* Divider */}
			<Divider plain>Text</Divider>

			{/* Item */}
			<div className="td-todo-item">
				{todo.text}
				<div>
					{/* created date */}
					{!!todo.createdDate && (
						<p>{ dateFormat1(todo.createdDate) }</p>
					)}

					{/* expired date */}
					{!!todo.expireDate && (
						<p>{ dateFormat1(todo.expireDate) }</p>
					)}

					{/* complete a todo */}
					{!todo.isCompleted && (
						<Button type="button" onClick={() => todoCrud(index, TodoCrudEnum.TODO_COMPLETE)}>
							Complete
						</Button>
					)}

					{/* undo a todo */}
					{todo.isCompleted && (
						<Button type="button" onClick={() => todoCrud(index, TodoCrudEnum.TODO_UNDO)}>
							Undo
						</Button>
					)}

					{/* remove a todo */}
					<Button type="button" onClick={() => todoCrud(index, TodoCrudEnum.TODO_DELETE)}>
						remove
					</Button>
				</div>
			</div>
		</>
	)
}
export default TodoItem;
