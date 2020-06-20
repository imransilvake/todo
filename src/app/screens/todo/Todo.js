// react
import React, { useEffect, useState } from 'react';

// app
import { Col, Row } from 'antd';
import { TodoCrudEnum, TodoFilterEnum } from './Todo.enum';
import { dateIsBefore, dateIsSame, fbTimestampToDatetime } from '../../utilities/helpers/Date';
import TodoFilter from './Todo-Filter';
import TodoForm from './Todo-Form';
import TodoItem from './Todo-Item';
import firebase from '../../../firebase';
import AppOptions from '../../../app.config';

const Todo = () => {
	// initial state
	const initialState = {
		original: [],
		filtered: []
	};

	// hook: todoList state
	const [todoList, setTodoList] = useState(initialState);

	// hook: on mount: fetch data from firebase
	useEffect(() => {
		/**
		 * fetch todoList
		 * @returns {Promise<void>}
		 */
		const fetchData = async () => {
			await firebase.firestore()
				.collection(AppOptions.firebase.collectionName)
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

		// fetch data from firebase
		fetchData().then();
	}, []);

	/**
	 * get firestore collection
	 * @param id
	 */
	const getFirestoreCollection = (id) => {
		const { collectionName } = AppOptions.firebase;
		const dbCollection = firebase.firestore().collection(collectionName);
		return id ? dbCollection.doc(id) : dbCollection;
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

		// select and apply operation
		switch (type) {
			case TodoCrudEnum.TODO_ADD:
				await getFirestoreCollection()
					.add(todoItem)
					.then((result) => {
						newTodoList = {
							...todoList,
							original: [{ ...todo, id: result.id }, ...todoList.original]
						};
					});
				break;
			case TodoCrudEnum.TODO_COMPLETE:
			case TodoCrudEnum.TODO_UNDO:
				await getFirestoreCollection(id)
					.set({ ...todoItem, isCompleted: true })
					.then(() => {
						newTodoList.original[index].isCompleted = (type === TodoCrudEnum.TODO_COMPLETE);
					});
				break;
			case TodoCrudEnum.TODO_DELETE:
				await getFirestoreCollection(id)
					.delete()
					.then(() => newTodoList.original.splice(index, 1));
				break;
			default:
		}

		// apply filter to the list
		// reset filter on addition of new item: ALL
		todoApplyFilter(TodoFilterEnum.FILTER_ALL, newTodoList);
	};

	/**
	 * apply filters on the list
	 * @param type
	 * @param data
	 */
	const todoApplyFilter = (type, data = todoList) => {
		const newTodoList = { ...data };
		switch (type) {
			case TodoFilterEnum.FILTER_ALL:
				newTodoList.filtered = newTodoList.original;
				break;
			case TodoFilterEnum.FILTER_TODAY:
				newTodoList.filtered = newTodoList.original.filter(
					(t) => !t.isCompleted && dateIsSame(
						fbTimestampToDatetime(t.expireDate.seconds), 'day'
					)
				);
				break;
			case TodoFilterEnum.FILTER_PAST:
				newTodoList.filtered = newTodoList.original.filter(
					(t) => !t.isCompleted && dateIsBefore(
						fbTimestampToDatetime(t.expireDate.seconds), 'day'
					)
				);
				break;
			case TodoFilterEnum.FILTER_COMPLETED:
				newTodoList.filtered = newTodoList.original.filter((t) => !!t.isCompleted);
				break;
			default:
		}

		// set hook: todoList
		setTodoList(newTodoList);
	};

	return (
		<div className="td-todo">
			<Row>
				{/* Sidebar */}
				<Col span={5} className="td-selection">
					<TodoFilter todoApplyFilter={todoApplyFilter} />
				</Col>

				{/* Content */}
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
};
export default Todo;
