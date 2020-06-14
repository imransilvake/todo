// react
import React from 'react';

// app
import { TodoCrudEnum } from './Todo.enum';
import { Button, DatePicker, Form, Input } from 'antd';
import { dateInMoment, fbDatetimeToTimestamp } from '../../utilities/helpers/Date';
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
	const { values, handleChange, handleDateChange, handleSubmit } = useForm(initialState, () => formSubmit());

	/**
	 * validate form
	 * @returns {boolean}
	 */
	const formValidation = () => {
		return !values.text || !values.expireDate;
	}

	/**
     * handle submit
	 * add a new item
	 * clear the form
     */
	const formSubmit = () => {
		// form payload
		const formPayload = {
			...values,
			createdDate: fbDatetimeToTimestamp(),
			expireDate: fbDatetimeToTimestamp(values.expireDate)
		};

		// add a new item
		todoApplyOperation(formPayload, TodoCrudEnum.TODO_ADD);
	}

	return (
		<Form onFinish={handleSubmit} className="td-form">
			{/* Text */}
			<Form.Item className="td-input">
				<Input
					id="text"
					type="text"
					name="text"
					value={values.text}
					onChange={handleChange}
				/>
			</Form.Item>

			{/* Date */}
			<Form.Item className="td-date">
				<DatePicker
					id="date"
					type="date"
					name="date"
					onChange={(e) => handleDateChange(e, 'expireDate')}
					value={values.expireDate}
					disabledDate={(current) => {
						return current && current < dateInMoment().subtract(1, 'day');
					}}
				/>
			</Form.Item>

			{/* Submit */}
			<Form.Item>
				<Button type="primary" htmlType="submit" disabled={formValidation()}>
					Submit
				</Button>
			</Form.Item>
		</Form>
	);
}
export default TodoForm;
