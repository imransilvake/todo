// react
import React from 'react';

// app
import './Todo-Form.scss';
import { TodoCrudEnum } from '../Todo.enum';
import { dateFormat, fbDatetimeToTimestamp } from '../../../utilities/helpers/Date';
import TodoFormValidation from './Todo-Form-Validation';
import useForm from '../../../utilities/hooks/useForm';
import { TextField, CircularProgress, Button } from '@material-ui/core';

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
	 * validate invalid form
	 * @returns {boolean}
	 */
	const formInvalid = () => {
		return loader || (errors && Object.keys(errors).length > 0);
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
		await todoApplyOperation(TodoCrudEnum.TODO_ADD, payload);
	};

	return (
		<section className="td-form">
			<form noValidate onSubmit={handleSubmit}>
				{/* Date */}
				<TextField
					id="date"
					type="date"
					name="expireDate"
					value={values.expireDate}
					onChange={handleChange}
					inputProps={{ min: dateFormat() }}
					className="td-datepicker"
					variant="filled"
					label="Due Date*"
					size="small" />

				{/* Text */}
				<TextField
					id="text"
					type="text"
					name="text"
					value={values.text}
					onChange={handleChange}
					onBlur={handleChange}
					error={!!errors.text}
					variant="filled"
					label="Todo Description*"
					fullWidth
					multiline
					rows={3} />

				{/* Submit */}
				<div className="td-submit">
					<Button
						type="submit"
						color="primary"
						variant="contained"
						disabled={formInvalid()}
						endIcon={loader && <CircularProgress size={20} />}>
						Add Task
					</Button>
				</div>
			</form>
		</section>
	);
};
export default TodoForm;
