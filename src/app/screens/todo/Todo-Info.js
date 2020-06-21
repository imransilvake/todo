// react
import React from 'react';

// app
import FaceIcon from '@material-ui/icons/Face';
import { dateFormat } from '../../utilities/helpers/Date';
import AppOptions from '../../../app.config';

/**
 * show general information about the tasks
 * @param todoList
 * @constructor
 */
const TodoInfo = ({ todoList }) => {
	/**
	 * display welcome message
	 * @returns {string}
	 */
	const welcomeMessage = () => {
		const greetings = 'Good';
		const currentHour = dateFormat(null, AppOptions.date.formats.two);
		if (currentHour < 12) {
			return `${greetings} Morning`;
		} if (currentHour <= 17) {
			return `${greetings} Afternoon`;
		}
		return `${greetings} Evening`;
	};

	return (
		<div className="td-info">
			<div className="td-intro">
				<h1>{ welcomeMessage() }</h1>
				<div className="td-icon">
					<FaceIcon fontSize="inherit" />
				</div>
			</div>

			<div className="td-detail">
				<p>Here is today&apos;s breifing!</p>
				<h3>
					There are
					{' '}
					<span>0 tasks</span>
					{' '}
					scheduled for
					{' '}
					<b>Today</b>
					.
				</h3>
				<h3>
					There have been
					{' '}
					<span>4 new tasks added</span>
					{' '}
					since
					{' '}
					<b>Yesterday</b>
					.
				</h3>
				<h3>
					There are total
					{' '}
					<span>400 tasks</span>
					{' '}
					left to complete.
				</h3>
			</div>
		</div>
	);
};
export default TodoInfo;
