// react
import React from 'react'

// app
import { TodoFilterEnum } from './Todo.enum'

/**
 * display a list of todo filters
 * @param todoFilter
 * @returns {*}
 * @constructor
 */
const TodoFilter = ({ todoFilter }) => {
	return (
		<>
			<h1>TODOs</h1>
			<h4>
				<a href="/#" onClick={() => todoFilter(TodoFilterEnum.FILTER_ALL)}>All</a>
			</h4>
			<h4>
				<a href="/#" onClick={() => todoFilter(TodoFilterEnum.FILTER_TODAY)}>Due Today</a>
			</h4>
			<h4>
				<a href="/#" onClick={() => todoFilter(TodoFilterEnum.FILTER_PAST)}>Past Due</a>
			</h4>
			<h4>
				<a href="/#" onClick={() => todoFilter(TodoFilterEnum.FILTER_COMPLETED)}>Completed</a>
			</h4>
		</>
	)
}
export default TodoFilter;
