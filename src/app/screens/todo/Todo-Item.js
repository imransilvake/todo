// react
import React from 'react'

// app
import { TodoCrudEnum } from './Todo.enum'
import { Button, Divider } from 'antd'
import { dateFormat, fbTimestampToDatetime } from '../../utilities/helpers/Date'

/**
 * display a single todo item
 * @param todo
 * @param index
 * @param todoCrud
 * @returns {*}
 * @constructor
 */
const TodoItem = ({ todo, index, todoCrud }) => {
	return (
		<>
			{/* Divider */}
			<Divider plain>Text</Divider>

			{/* Item */}
			<div className="td-todo-item">
				{todo.text}
				<div>
					{/* created date */}
					{!!todo.createdDate && !!todo.createdDate.seconds && (
						<p>{ dateFormat(fbTimestampToDatetime(todo.createdDate.seconds)) }</p>
					)}

					{/* expire date */}
					{!!todo.expireDate && !!todo.expireDate.seconds && (
						<p>{ dateFormat(fbTimestampToDatetime(todo.expireDate.seconds)) }</p>
					)}

					{/* complete a todo */}
					{!todo.isCompleted && (
						<Button type="button" onClick={() => todoCrud({ ...todo, index }, TodoCrudEnum.TODO_COMPLETE)}>
							Complete
						</Button>
					)}

					{/* undo a todo */}
					{todo.isCompleted && (
						<Button type="button" onClick={() => todoCrud({ ...todo, index }, TodoCrudEnum.TODO_UNDO)}>
							Undo
						</Button>
					)}

					{/* remove a todo */}
					<Button type="button" onClick={() => todoCrud({ ...todo, index }, TodoCrudEnum.TODO_DELETE)}>
						remove
					</Button>
				</div>
			</div>
		</>
	)
}
export default TodoItem;
