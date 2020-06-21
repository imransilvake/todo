// react
import React from 'react';

// app
import { TodoFilterEnum } from './Todo.enum';
import { Button } from '@material-ui/core';
import ImportContactsIcon from '@material-ui/icons/ImportContacts';
import TodayIcon from '@material-ui/icons/Today';
import EventNoteIcon from '@material-ui/icons/EventNote';
import DoneAllIcon from '@material-ui/icons/DoneAll';

/**
 * display a list of filters
 * @param todoApplyFilter
 * @param todoFilter
 * @returns {*}
 * @constructor
 */
const TodoFilter = ({ todoApplyFilter, todoFilter }) => {
	return (
		<div className="td-filters">
			<ul>
				<li>
					<Button
						classes={{ disabled: 'td-disabled' }}
						disabled={todoFilter === TodoFilterEnum.FILTER_ALL}
						onClick={() => todoApplyFilter(TodoFilterEnum.FILTER_ALL)}
						startIcon={<ImportContactsIcon />}
					>
						ALL
					</Button>
				</li>
				<li>
					<Button
						classes={{ disabled: 'td-disabled' }}
						disabled={todoFilter === TodoFilterEnum.FILTER_TODAY}
						onClick={() => todoApplyFilter(TodoFilterEnum.FILTER_TODAY)}
						startIcon={<TodayIcon />}
					>
						DUE TODAY
					</Button>
				</li>
				<li>
					<Button
						classes={{ disabled: 'td-disabled' }}
						disabled={todoFilter === TodoFilterEnum.FILTER_PAST}
						onClick={() => todoApplyFilter(TodoFilterEnum.FILTER_PAST)}
						startIcon={<EventNoteIcon />}
					>
						PAST DUE
					</Button>
				</li>
				<li>
					<Button
						classes={{ disabled: 'td-disabled' }}
						disabled={todoFilter === TodoFilterEnum.FILTER_COMPLETED}
						onClick={() => todoApplyFilter(TodoFilterEnum.FILTER_COMPLETED)}
						startIcon={<DoneAllIcon />}
					>
						COMPLETED
					</Button>
				</li>
			</ul>
		</div>
	);
};
export default TodoFilter;
