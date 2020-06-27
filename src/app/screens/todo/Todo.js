// react
import React, { useEffect, useState } from 'react';

// app
import AppOptions from '../../../app.config';
import firebase from '../../../firebase';
import { dateIsBefore, dateIsSame, fbTimestampToDatetime } from '../../utilities/helpers/Date';
import TodoInfo from './todo-info/Todo-Info';
import TodoFilter from './todo-filter/Todo-Filter';
import TodoForm from './todo-form/Todo-Form';
import TodoItem from './todo-item/Todo-Item';
import TodoSnackbar from './todo-snackbar/Todo-Snackbar';
import { TodoCrudEnum, TodoFilterEnum } from './Todo.enum';
import { Container, Grid } from '@material-ui/core';

const Todo = () => {
	// initial state
	const initialState = {
		original: [],
		filtered: []
	};

	// hooks: todoList, todoFilter, setOpenSnackbar
	const [todoList, setTodoList] = useState(initialState);
	const [todoFilter, setTodoFilter] = useState(TodoFilterEnum.FILTER_ALL);
	const [openSnackbar, setOpenSnackbar] = useState(false);

	// fetch data from firebase
	// run only once when component is initialized
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
						.sort((a, b) => b.data().createdDate - a.data().createdDate)
						.map((doc) => ({ ...doc.data(), id: doc.id }));

					// set hook: todoList
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
	 * @param type
	 * @param data
	 * @returns {Promise<void>}
	 */
	const todoApplyOperation = async (type, data) => {
		const { id, ...todo } = data;
		let newTodoList = { ...todoList };

		// select and apply operation
		switch (type) {
			case TodoCrudEnum.TODO_ADD:
				await getFirestoreCollection()
					.add(todo)
					.then((result) => {
						// add item to the list
						newTodoList = {
							...todoList,
							original: [{ ...todo, id: result.id }, ...todoList.original]
						};

						// set hook: openSnackbar
						setOpenSnackbar(true);
					});
				break;
			case TodoCrudEnum.TODO_TOGGLE: {
				await getFirestoreCollection(id)
					.set({ ...todo, isCompleted: !todo.isCompleted })
					.then(() => {
						newTodoList.original = newTodoList.original.map(
							(t) => (t.id === id ? {
								...t, isCompleted: !todo.isCompleted
							} : t)
						);
					});
				break;
			}
			case TodoCrudEnum.TODO_DELETE:
				await getFirestoreCollection(id)
					.delete()
					.then(() => {
						newTodoList.original = newTodoList.original.filter(
							(t) => t.id !== id
						);
					});
				break;
			default:
		}

		// apply filter to the list
		todoApplyFilter(todoFilter, newTodoList);
	};

	/**
	 * apply filters on the list
	 * @param type
	 * @param data
	 */
	const todoApplyFilter = (type, data) => {
		const newTodoList = !data ? { ...todoList } : { ...data };
		switch (type) {
			case TodoFilterEnum.FILTER_ALL:
				newTodoList.filtered = newTodoList.original;
				break;
			case TodoFilterEnum.FILTER_TODAY:
				newTodoList.filtered = newTodoList.original.filter(
					(t) => !t.isCompleted && dateIsSame(
						fbTimestampToDatetime(t.expireDate.seconds), null, 'day'
					)
				);
				break;
			case TodoFilterEnum.FILTER_PAST:
				newTodoList.filtered = newTodoList.original.filter(
					(t) => !t.isCompleted && dateIsBefore(
						fbTimestampToDatetime(t.expireDate.seconds), null, 'day'
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

		// set hook: setTodoFilter
		if (!data) {
			setTodoFilter(type);
		}
	};

	/**
	 * close snackbar
	 * @param event
	 * @param reason
	 */
	const todoCloseSnackbar = (event, reason) => {
		// ignore outside slick
		if (reason === 'clickaway') {
			return;
		}

		// undo a last added item
		const target = event && event.target;
		if (target && target.parentNode && target.parentNode.id === 'undo') {
			todoApplyOperation(TodoCrudEnum.TODO_DELETE, todoList.filtered[0]);
		}

		// close snackbar
		setOpenSnackbar(false);
	};

	return (
		<Container maxWidth="md">
			{/* Grid */}
			<Grid container className="td-todo">
				{/* Information */}
				<Grid item xs={12} className="ts-info-wrapper">
					<TodoInfo todoList={todoList} />
				</Grid>

				{/* Sidebar */}
				<Grid container spacing={2}>
					<Grid item xs={12} sm={3}>
						<TodoFilter
							todoApplyFilter={todoApplyFilter}
							todoFilter={todoFilter} />
					</Grid>

					{/* Content */}
					<Grid item xs={12} sm={9}>
						{/* Form */}
						<TodoForm todoApplyOperation={todoApplyOperation} />

						{/* List */}
						{
							todoList.filtered.map((todo, index) => (
								<TodoItem
									key={todo.id}
									index={index}
									todo={todo}
									todoApplyOperation={todoApplyOperation}
									openSnackbar={openSnackbar} />
							))
						}
					</Grid>
				</Grid>
			</Grid>

			{/* Snackbar */}
			<TodoSnackbar
				openSnackbar={openSnackbar}
				todoCloseSnackbar={todoCloseSnackbar} />
		</Container>
	);
};
export default Todo;
