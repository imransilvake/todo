// react
import React from 'react';

// app
import './Todo-Item.scss';
import AppOptions from '../../../../app.config';
import { TodoCrudEnum } from '../Todo.enum';
import { dateFormat, fbTimestampToDatetime } from '../../../utilities/helpers/Date';
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
		<section className="td-item">
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
							() => todoApplyOperation(TodoCrudEnum.TODO_COMPLETE, { ...todo, index })
						}>
						<CheckBoxOutlineBlankIcon />
					</Button>
				)}

				{/* action: undo */}
				{todo.isCompleted && (
					<Button
						type="button"
						onClick={
							() => todoApplyOperation(TodoCrudEnum.TODO_UNDO, { ...todo, index })
						}>
						<CheckBoxIcon />
					</Button>
				)}

				{/* action: remove a specific item */}
				<Button
					type="button"
					onClick={
						() => todoApplyOperation(TodoCrudEnum.TODO_DELETE, { ...todo, index })
					}>
					<DeleteForeverIcon />
				</Button>
			</div>

			{/* Text */}
			<p className="td-text">{todo.text}</p>

			{/* expire date */}
			{!!todo.expireDate && !!todo.expireDate.seconds && (
				<p>{ dateFormat(fbTimestampToDatetime(todo.expireDate.seconds)) }</p>
			)}
		</section>
	);
};
export default TodoItem;
