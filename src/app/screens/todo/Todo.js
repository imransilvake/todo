// react
import React, { useState } from 'react'

// app
import { Col, Row } from 'antd'
import { dateIsBefore, dateIsSame } from '../../utilities/helpers/Date'
import TodoFilter from './TodoFilter'
import TodoForm from './Todo-Form';
import TodoItem from './Todo-Item';
import { TodoCrudEnum, TodoFilterEnum } from './Todo.enum'

const Todo = () => {
	// initial state
	const initialState = {
		original: [],
		filtered: []
	};

	// hook: todo
	const [todoList, setTodoList] = useState(initialState);

	/**
	 * TODO CRUD
	 * add a todo
	 * complete a todo
	 * undo a todo
	 * delete a todo
	 */
	const todoCrud = (stateOrIndex, type) => {
		let newTodoList = { ...todoList };
		switch (type) {
			case TodoCrudEnum.TODO_ADD:
				newTodoList = { ...todoList, original: [...todoList.original, stateOrIndex] };
				break;
			case TodoCrudEnum.TODO_COMPLETE:
				newTodoList.original[stateOrIndex].isCompleted = true;
				break;
			case TodoCrudEnum.TODO_UNDO:
				newTodoList.original[stateOrIndex].isCompleted = false;
				break;
			case TodoCrudEnum.TODO_DELETE:
				newTodoList.original.splice(stateOrIndex, 1);
				break;
			default:
		}

		// apply filter to the list
		// reset to filter on addition of new item: ALL
		todoFilter(TodoFilterEnum.FILTER_ALL, newTodoList);
	};

	/**
	 * TODO FILTER
	 * All
	 * Due Today
	 * Past Due
	 * Completed
	 */
	const todoFilter = (type, list = todoList) => {
		const newTodoList = { ...list };
		switch (type) {
			case TodoFilterEnum.FILTER_ALL:
				newTodoList.filtered = newTodoList.original;
				break;
			case TodoFilterEnum.FILTER_TODAY:
				newTodoList.filtered = newTodoList.original.filter((t) => dateIsSame(t.expireDate, 'day'));
				break;
			case TodoFilterEnum.FILTER_PAST:
				newTodoList.filtered = newTodoList.original.filter((t) => dateIsBefore(t.expireDate, 'day'));
				break;
			case TodoFilterEnum.FILTER_COMPLETED:
				newTodoList.filtered = newTodoList.original.filter((t) => !!t.isCompleted);
				break;
			default:
		}

		// update original
		setTodoList(newTodoList);
	};

	return (
		<div className="td-todo">
			<Row>
				<Col span={5} className="td-selection">
					<TodoFilter todoFilter={todoFilter} />
				</Col>
				<Col span={19} className="td-list">
					{/* Form */}
					<section className="td-form-wrapper">
						<TodoForm todoCrud={todoCrud}/>
					</section>

					{/* List */}
					<section className="td-list-wrapper">
						{
							todoList.filtered.map((todo, index) => (
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
