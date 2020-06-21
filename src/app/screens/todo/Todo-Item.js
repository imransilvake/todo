// react
import React from 'react';

// app
import AppOptions from '../../../app.config';
import { TodoCrudEnum } from './Todo.enum';
import { dateFormat, fbTimestampToDatetime } from '../../utilities/helpers/Date';
import { Button } from '@material-ui/core';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

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
		<div className="td-item">
			{/* created date */}
			{!!todo.createdDate && !!todo.createdDate.seconds && (
				<p className="td-created">
					<span>
						{dateFormat(
							fbTimestampToDatetime(todo.createdDate.seconds),
							AppOptions.date.formats.three
						)}
					</span>
				</p>
			)}

			{/* actions */}
			<div className="td-actions">
				{/* action: complete */}
				{!todo.isCompleted && (
					<Button
						type="button"
						onClick={
							() => todoApplyOperation({ ...todo, index }, TodoCrudEnum.TODO_COMPLETE)
						}
					>
						<CheckBoxOutlineBlankIcon />
					</Button>
				)}

				{/* action: undo */}
				{todo.isCompleted && (
					<Button
						type="button"
						onClick={
							() => todoApplyOperation({ ...todo, index }, TodoCrudEnum.TODO_UNDO)
						}
					>
						<CheckBoxIcon />
					</Button>
				)}

				{/* action: remove a specific item */}
				<Button
					type="button"
					onClick={
						() => todoApplyOperation({ ...todo, index }, TodoCrudEnum.TODO_DELETE)
					}
				>
					<DeleteForeverIcon />
				</Button>
			</div>

			{/* Text */}
			<p className="td-text">{todo.text}</p>

			{/* expire date */}
			{!!todo.expireDate && !!todo.expireDate.seconds && (
				<p>{ dateFormat(fbTimestampToDatetime(todo.expireDate.seconds)) }</p>
			)}
		</div>
	);
};
export default TodoItem;
