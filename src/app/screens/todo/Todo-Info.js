// react
import React from 'react';

// app
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
		const currentHour = dateFormat(null, AppOptions.dateFormats.two);
		if (currentHour < 12) {
			return `${greetings} Morning`;
		} if (currentHour <= 17) {
			return `${greetings} Afternoon`;
		}
		return `${greetings} Evening`;
	};

	return (
		<div className="td-info">
			<h1 className="td-intro">{ welcomeMessage() }</h1>
			<div className="td-detail">
				<p>Here is your today&apos;s breifing!</p>
				<h3>
					You have
					{' '}
					<span>0 tasks</span>
					{' '}
					scheduled for Today.
				</h3>
				<h3>
					There have been
					{' '}
					<span>4 new tasks added</span>
					{' '}
					since Yesterday
				</h3>
				<h3>
					There are total
					{' '}
					<span>400 tasks</span>
					{' '}
					left to complete
				</h3>
			</div>
		</div>
	);
};
export default TodoInfo;
