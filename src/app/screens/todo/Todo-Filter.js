// react
import React from 'react';

// app
import { TodoFilterEnum } from './Todo.enum';

/**
 * display a list of filters
 * @param todoApplyFilter
 * @returns {*}
 * @constructor
 */
const TodoFilter = ({ todoApplyFilter }) => {
	return (
		<>
			<h1>TODOs</h1>
			<h4>
				<a href="/#" onClick={() => todoApplyFilter(TodoFilterEnum.FILTER_ALL)}>All</a>
			</h4>
			<h4>
				<a href="/#" onClick={() => todoApplyFilter(TodoFilterEnum.FILTER_TODAY)}>Due Today</a>
			</h4>
			<h4>
				<a href="/#" onClick={() => todoApplyFilter(TodoFilterEnum.FILTER_PAST)}>Past Due</a>
			</h4>
			<h4>
				<a href="/#" onClick={() => todoApplyFilter(TodoFilterEnum.FILTER_COMPLETED)}>Completed</a>
			</h4>
		</>
	);
};
export default TodoFilter;
