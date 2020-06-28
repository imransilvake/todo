// react
import React from 'react';

// app
import './Todo-Item.scss';
import AppOptions from '../../../../app.config';
import { TodoCrudEnum } from '../Todo.enum';
import { dateFormat, fbTimestampToDatetime } from '../../../utilities/helpers/Date';
import regexConvertUrlsToLinks from '../../../utilities/helpers/Regex';
import { Button } from '@material-ui/core';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

/**
 * display a single item
 * @param todo
 * @param todoApplyOperation
 * @param openSnackbar
 * @param lastTodoId
 * @returns {*}
 * @constructor
 */
const TodoItem = ({
	todo, todoApplyOperation, openSnackbar, lastTodoId
}) => {
	return (
		<section className="td-item">
			{/* created date */}
			{todo.createdDate && todo.createdDate.seconds && todo.expireDate && todo.expireDate.seconds && (
				<p className="td-created">
					<span>
						{dateFormat(
							fbTimestampToDatetime(todo.createdDate.seconds),
							AppOptions.date.formats.three
						)}
					</span>
					<span className="td-symbol">&#8226;</span>
					<span>
						{dateFormat(
							fbTimestampToDatetime(todo.expireDate.seconds),
							AppOptions.date.formats.three
						)}
					</span>
				</p>
			)}

			{/* actions */}
			<div className="td-actions">
				{/* action: toggle */}
				<Button
					type="button"
					className="td-toggle"
					onClick={
						() => todoApplyOperation(TodoCrudEnum.TODO_TOGGLE, todo)
					}>
					{todo.isCompleted && (<CheckBoxIcon />) }
					{!todo.isCompleted && (<CheckBoxOutlineBlankIcon />) }
				</Button>

				{/* actions: delete */}
				{/* show delete button after snackbar is gone */}
				{(!openSnackbar || (openSnackbar && lastTodoId !== todo.id)) && (
					<Button
						type="button"
						className="td-delete"
						onClick={
							() => todoApplyOperation(TodoCrudEnum.TODO_DELETE, todo)
						}>
						<DeleteForeverIcon />
					</Button>
				)}
			</div>

			{/* Text */}
			<p className="td-text" dangerouslySetInnerHTML={{ __html: regexConvertUrlsToLinks(todo.text) }} />
		</section>
	);
};
export default TodoItem;
