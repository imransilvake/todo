// react
import React from 'react';

// app
import { Button } from '@material-ui/core';
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
				<Button onClick={() => todoApplyFilter(TodoFilterEnum.FILTER_ALL)}>All</Button>
			</h4>
			<h4>
				<Button onClick={() => todoApplyFilter(TodoFilterEnum.FILTER_TODAY)}>Due Today</Button>
			</h4>
			<h4>
				<Button onClick={() => todoApplyFilter(TodoFilterEnum.FILTER_PAST)}>Past Due</Button>
			</h4>
			<h4>
				<Button onClick={() => todoApplyFilter(TodoFilterEnum.FILTER_COMPLETED)}>Complete</Button>
			</h4>
		</>
	);
};
export default TodoFilter;
