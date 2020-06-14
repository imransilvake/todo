// react
import React from 'react'

// app
import { TodoCrudEnum } from './Todo.enum'
import { Button, Divider } from 'antd'
import { dateFormat, fbTimestampToDatetime } from '../../utilities/helpers/Date'

/**
 * display a single item
 * @param todo
 * @param index
 * @param todoApplyOperation
 * @returns {*}
 * @constructor
 */
const TodoItem = ({ todo, index, todoApplyOperation }) => {
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

					{/* action: complete */}
					{!todo.isCompleted && (
						<Button type="button" onClick={() => todoApplyOperation({ ...todo, index }, TodoCrudEnum.TODO_COMPLETE)}>
							Complete
						</Button>
					)}

					{/* action: undo */}
					{todo.isCompleted && (
						<Button type="button" onClick={() => todoApplyOperation({ ...todo, index }, TodoCrudEnum.TODO_UNDO)}>
							Undo
						</Button>
					)}

					{/* action: remove a specific item */}
					<Button type="button" onClick={() => todoApplyOperation({ ...todo, index }, TodoCrudEnum.TODO_DELETE)}>
						remove
					</Button>
				</div>
			</div>
		</>
	)
}
export default TodoItem;
