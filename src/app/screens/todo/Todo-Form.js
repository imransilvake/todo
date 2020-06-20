// react
import React from 'react';

// app
import { TextField, CircularProgress, Button } from '@material-ui/core';
import { TodoCrudEnum } from './Todo.enum';
import { dateFormat, fbDatetimeToTimestamp } from '../../utilities/helpers/Date';
import TodoFormValidation from './Todo-Form-Validation';
import useForm from '../../utilities/hooks/useForm';

/**
 * form: to add a new item to the list
 * @param todoApplyOperation
 * @returns {*}
 * @constructor
 */
const TodoForm = ({ todoApplyOperation }) => {
	// initial state
	const initialState = {
		text: '',
		createdDate: dateFormat(),
		expireDate: dateFormat(),
		isCompleted: false
	};

	// hook: useForm
	const [handleChange, handleSubmit, values, errors, loader] = useForm(
		initialState, TodoFormValidation, () => formSubmit()
	);

	/**
	 * check form state
	 * @returns {boolean}
	 */
	const formValid = () => {
		return !(errors === 0 || Object.keys(errors).length > 0 || loader);
	};

	/**
     * handle submit
	 * add a new item
	 * clear the form
     */
	const formSubmit = async () => {
		// payload
		const payload = {
			...values,
			createdDate: fbDatetimeToTimestamp(),
			expireDate: fbDatetimeToTimestamp(values.expireDate)
		};

		// add a new item
		await todoApplyOperation(payload, TodoCrudEnum.TODO_ADD);
	};

	return (
		<>
			<form noValidate onSubmit={handleSubmit} className="td-form">
				{/* Text */}
				<TextField
					id="text"
					type="text"
					name="text"
					value={values.text}
					onChange={handleChange}
					onBlur={handleChange}
				/>

				{/* Date */}
				<TextField
					id="date"
					type="date"
					name="expireDate"
					onChange={handleChange}
					value={values.expireDate}
					inputProps={{ min: dateFormat() }}
				/>

				{/* Submit */}
				<Button type="submit" disabled={!formValid()}>
					Submit
				</Button>
			</form>

			{/* Spinner */}
			{ loader && <CircularProgress /> }

			{/* Errors */}
			{
				Object.values(errors).map((error, index) => (
					<p key={index}>{error}</p>
				))
			}
		</>
	);
};
export default TodoForm;
