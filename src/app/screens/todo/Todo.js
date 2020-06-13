// react
import React, { useEffect, useState } from 'react'

// app
import { Col, Row } from 'antd'
import TodoForm from './Todo-Form';
import TodoItem from './Todo-Item';
import { TodoCrudEnum, TodoFilterEnum } from './Todo.enum'
import { dateIsBefore, dateIsSame } from '../../utilities/helpers/Date'

function Todo() {
	// hook: todo
	const [todoList, setTodoList] = useState([]);
	const [filter, setFilter] = useState(TodoFilterEnum.FILTER_ALL);
	const [list, setList] = useState(todoList);

	useEffect(() => {
		// set filter
		todoFilter(filter);
	}, [todoList]);

	/**
	 * TODO CRUD
	 * add a todo
	 * complete a todo
	 * undo a todo
	 * delete a todo
	 */
	const todoCrud = (stateOrIndex, type) => {
		let newTodoList = [...todoList];
		switch (type) {
			case TodoCrudEnum.TODO_ADD:
				newTodoList = [...todoList, stateOrIndex];
				break;
			case TodoCrudEnum.TODO_COMPLETE:
				newTodoList[stateOrIndex].isCompleted = true;
				break;
			case TodoCrudEnum.TODO_UNDO:
				newTodoList[stateOrIndex].isCompleted = false;
				break;
			case TodoCrudEnum.TODO_DELETE:
				newTodoList.splice(stateOrIndex, 1);
				break;
			default:
		}

		// set todo state
		setTodoList(newTodoList);
	};

	/**
	 * TODO FILTER
	 * All
	 * Due Today
	 * Past Due
	 * Completed
	 */
	const todoFilter = (type) => {
		let newFilterList = [...todoList];
		switch (type) {
			case TodoFilterEnum.FILTER_ALL:
				newFilterList = todoList;
				break;
			case TodoFilterEnum.FILTER_TODAY:
				newFilterList = todoList.filter((t) => dateIsSame(t.expireDate, 'day'));
				break;
			case TodoFilterEnum.FILTER_PAST:
				newFilterList = todoList.filter((t) => dateIsBefore(t.expireDate, 'day'));
				break;
			case TodoFilterEnum.FILTER_COMPLETED:
				newFilterList = todoList.filter((t) => !!t.isCompleted);
				break;
			default:
		}

		// set filter
		setFilter(type);

		// set data to list
		setList(newFilterList);
	};

	return (
		<div className="td-todo">
			<Row>
				<Col span={5} className="td-selection">
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
				</Col>
				<Col span={19} className="td-list">
					{/* Form */}
					<section className="td-form-wrapper">
						<TodoForm todoCrud={todoCrud}/>
					</section>

					{/* List */}
					<section className="td-list-wrapper">
						{
							list.map((todo, index) => (
								<TodoItem
									key={index}
									index={index}
									todo={todo}
									todoCrud={todoCrud}
								/>
							))
						}
					</section>
				</Col>
			</Row>
		</div>
	);
}
export default Todo;
