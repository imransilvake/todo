// react
import React from 'react';

// app
import { TodoCrudEnum } from './Todo.enum';
import { Button, DatePicker, Form, Input, Spin } from 'antd';
import { dateInMoment, fbDatetimeToTimestamp } from '../../utilities/helpers/Date';
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
		createdDate: dateInMoment(),
		expireDate: dateInMoment(),
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
			<Form onFinish={handleSubmit} className="td-form">
				{/* Text */}
				<Form.Item className="td-input">
					<Input
						id="text"
						type="text"
						name="text"
						value={values.text}
						onChange={handleChange}
						onBlur={handleChange}
					/>
				</Form.Item>

				{/* Date */}
				<Form.Item className="td-date">
					<DatePicker
						id="expireDate"
						type="date"
						onChange={(e) => handleChange(e, 'expireDate')}
						value={values.expireDate}
						disabledDate={(current) => {
							return current && current < dateInMoment().subtract(1, 'day');
						}}
					/>
				</Form.Item>

				{/* Submit */}
				<Form.Item>
					<Button type="primary" htmlType="submit" disabled={!formValid()}>
						Submit
					</Button>
				</Form.Item>
			</Form>

			{/* Spinner */}
			{ loader && <Spin /> }

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
