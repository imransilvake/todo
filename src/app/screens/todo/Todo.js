// react
import React, { useEffect, useState } from 'react'

// app
import { Col, Row } from 'antd'
import { TodoCrudEnum, TodoFilterEnum } from './Todo.enum'
import { dateIsBefore, dateIsSame, fbTimestampToDatetime } from '../../utilities/helpers/Date'
import TodoFilter from './Todo-Filter'
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

	// hook: todoList
	const [todoList, setTodoList] = useState(initialState);

	/**
	 * called on mount
	 * fetch data from firebase
	 */
	useEffect(() => {
		/**
		 * fetch todoList
		 * @returns {Promise<void>}
		 */
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

		// fetch: todoList
		fetchData().then();
	}, []);

	/**
	 * get firebase collection
	 * @param id
	 */
	const getFirestoreCollection = (id) => {
		const db = firebase.firestore();
		if (!id) {
			return db.collection(collectionName);
		}
		return db.collection(collectionName).doc(id);
	};

	/**
	 * apply CRUD operations
	 * @param todo
	 * @param type
	 * @returns {Promise<void>}
	 */
	const todoApplyOperation = async (todo, type) => {
		const { id, index, ...todoItem } = todo;
		let newTodoList = { ...todoList };

		// switch block
		switch (type) {
			case TodoCrudEnum.TODO_ADD:
				// add to firestore
				await getFirestoreCollection()
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
				await getFirestoreCollection(id)
					.set({ ...todoItem, isCompleted: true })
					.then(() => {
						// update list
						newTodoList.original[index].isCompleted = true;
					});
				break;
			case TodoCrudEnum.TODO_UNDO:
				// update item in firestore
				await getFirestoreCollection(id)
					.set({ ...todoItem, isCompleted: false })
					.then(() => {
						// update list
						newTodoList.original[index].isCompleted = false;
					});
				break;
			case TodoCrudEnum.TODO_DELETE:
				// delete from firestore
				await getFirestoreCollection(id)
					.delete()
					.then(() => {
						// update list
						newTodoList.original.splice(index, 1);
					})
				break;
			default:
		}

		// apply filter to the list
		// reset filter on addition of new item: ALL
		todoApplyFilter(TodoFilterEnum.FILTER_ALL, newTodoList);
	};

	/**
	 * apply filters
	 * @param type
	 * @param list
	 */
	const todoApplyFilter = (type, list = todoList) => {
		const newTodoList = { ...list };
		switch (type) {
			case TodoFilterEnum.FILTER_ALL:
				newTodoList.filtered = newTodoList.original;
				break;
			case TodoFilterEnum.FILTER_TODAY:
				newTodoList.filtered = newTodoList.original.filter(
					(t) => !t.isCompleted && dateIsSame(fbTimestampToDatetime(t.expireDate.seconds), 'day')
				);
				break;
			case TodoFilterEnum.FILTER_PAST:
				newTodoList.filtered = newTodoList.original.filter(
					(t) => !t.isCompleted && dateIsBefore(fbTimestampToDatetime(t.expireDate.seconds), 'day')
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
					<TodoFilter todoApplyFilter={todoApplyFilter} />
				</Col>
				<Col span={19} className="td-list">
					{/* Form */}
					<section className="td-form-wrapper">
						<TodoForm todoApplyOperation={todoApplyOperation}/>
					</section>

					{/* List */}
					<section className="td-list-wrapper">
						{
							todoList.filtered.map((todo, index) => (
								<TodoItem
									key={todo.id}
									index={index}
									todo={todo}
									todoApplyOperation={todoApplyOperation}
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
