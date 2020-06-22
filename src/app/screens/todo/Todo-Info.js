// react
import React from 'react';

// app
import AppOptions from '../../../app.config';
import {
	dateFormat, dateInMoment, dateIsAfter,
	dateIsSame, fbTimestampToDatetime
} from '../../utilities/helpers/Date';
import FaceIcon from '@material-ui/icons/Face';

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

	/**
	 * total tasks due for Today
	 * @returns {number}
	 */
	const totalTasksDueForToday = () => (todoList && todoList.original ? (
		todoList.original.filter(
			(t) => !t.isCompleted && dateIsSame(
				fbTimestampToDatetime(t.expireDate.seconds), null, 'day'
			)
		).length
	) : 0);

	/**
	 * total tasks due from Yesterday
	 * @returns {number}
	 */
	const totalDueTasksFromYesterday = () => (todoList && todoList.original ? (
		todoList.original.filter(
			(t) => !t.isCompleted && dateIsAfter(
				fbTimestampToDatetime(t.createdDate.seconds), dateInMoment(
					dateInMoment().subtract(1, 'day')
				), 'day'
			)
		).length
	) : 0);

	/**
	 * total pending tasks
	 * @returns {number}
	 */
	const totalPendingTasks = () => (todoList && todoList.original ? (
		todoList.original.filter((t) => !t.isCompleted).length
	) : 0);

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
					<span>
						{totalTasksDueForToday()}
						{' '}
						tasks
					</span>
					{' '}
					scheduled for
					{' '}
					<b>Today</b>
					.
				</h3>
				<h3>
					There have been
					{' '}
					<span>
						{totalDueTasksFromYesterday()}
						{' '}
						tasks
					</span>
					{' '}
					due since
					{' '}
					<b>Yesterday</b>
					.
				</h3>
				<h3>
					There are total
					{' '}
					<span>
						{totalPendingTasks()}
						{' '}
						tasks
					</span>
					{' '}
					left to complete.
				</h3>
			</div>
		</div>
	);
};
export default TodoInfo;
