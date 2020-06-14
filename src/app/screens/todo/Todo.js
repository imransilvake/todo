// react
import React, { useEffect, useState } from 'react'

// app
import { Col, Row } from 'antd'
import { dateIsBefore, dateIsSame } from '../../utilities/helpers/Date'
import { TodoCrudEnum, TodoFilterEnum } from './Todo.enum'
import TodoFilters from './TodoFilter'
import TodoForm from './Todo-Form';
import TodoItem from './Todo-Item';
import firebase from '../../../firebase'

const Todo = () => {
	// collection name
	const collectionName = 'todo';

	// initial state
	const initialState = {
		original: [],
		filtered: []
	};

	// hook: todo
	const [todoList, setTodoList] = useState(initialState);

	/**
	 * called on mount
	 * fetch data from firebase
	 */
	useEffect(() => {
		// api: fetch todo list
		const fetchData = async () => {
			await firebase.firestore()
				.collection(collectionName)
				.get()
				.then((snapshot) => {
					// get list
					const items = snapshot.docs
						.sort((a, b) => {
							if (a.data().createdDate > b.data().createdDate) return -1;
							if (a.data().createdDate < b.data().createdDate) return 1;
							return 0;
						})
						.map((doc) => ({ ...doc.data(), id: doc.id }));

					// set list
					setTodoList({
						original: items,
						filtered: items
					});
				});
		};
		fetchData().then();
	}, []);

	/**
	 * Firebase Collection
	 * @param id
	 */
	const firestoreCollection = (id) => {
		const db = firebase.firestore();
		if (!id) {
			return db.collection(collectionName);
		}
		return db.collection(collectionName).doc(id);
	};

	/**
	 * Todo CRUD Operations
	 * @param todo
	 * @param type
	 * @returns {Promise<void>}
	 */
	const todoCrud = async (todo, type) => {
		const { id, index, ...todoItem } = todo;
		let newTodoList = { ...todoList };

		// switch block
		switch (type) {
			case TodoCrudEnum.TODO_ADD:
				// add to firestore
				await firestoreCollection()
					.add(todoItem)
					.then((result) => {
						// update list
						newTodoList = {
							...todoList,
							original: [{ ...todo, id: result.id }, ...todoList.original]
						};
					});
				break;
			case TodoCrudEnum.TODO_COMPLETE:
				// update item in firestore
				await firestoreCollection(id)
					.set({ ...todoItem, isCompleted: true })
					.then(() => {
						// update list
						newTodoList.original[index].isCompleted = true;
					});
				break;
			case TodoCrudEnum.TODO_UNDO:
				// update item in firestore
				await firestoreCollection(id)
					.set({ ...todoItem, isCompleted: false })
					.then(() => {
						// update list
						newTodoList.original[index].isCompleted = false;
					});
				break;
			case TodoCrudEnum.TODO_DELETE:
				// delete from firestore
				await firestoreCollection(id)
					.delete()
					.then(() => {
						// update list
						newTodoList.original.splice(index, 1);
					})
				break;
			default:
		}

		// apply filter to the list
		// reset to filter on addition of new item: ALL
		todoFilter(TodoFilterEnum.FILTER_ALL, newTodoList);
	};

	/**
	 * Todo Filters
	 * @param type
	 * @param list
	 */
	const todoFilter = (type, list = todoList) => {
		const newTodoList = { ...list };
		switch (type) {
			case TodoFilterEnum.FILTER_ALL:
				newTodoList.filtered = newTodoList.original;
				break;
			case TodoFilterEnum.FILTER_TODAY:
				newTodoList.filtered = newTodoList.original.filter(
					(t) => !t.isCompleted && dateIsSame(t.expireDate, 'day')
				);
				break;
			case TodoFilterEnum.FILTER_PAST:
				newTodoList.filtered = newTodoList.original.filter(
					(t) => dateIsBefore(t.expireDate, 'day')
				);
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
					<TodoFilters todoFilter={todoFilter} />
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
									key={todo.id}
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
