// react
import React, { useState } from 'react';

// app
import { TodoCrudEnum } from './Todo.enum'
import { Button, DatePicker, Form, Input } from 'antd';
import { dateInMoment, fbDatetimeToTimestamp, fbTimestampToDatetime } from '../../utilities/helpers/Date'

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
		createdDate: fbDatetimeToTimestamp(),
		expireDate: fbDatetimeToTimestamp(),
		isCompleted: false
	};

	// hook: value
	const [state, setState] = useState(initialState);

	/**
     * set text to the state
     * @param event
     */
	const handleTextChange = (event) => {
		const { value } = event.target;
		setState({
			...state,
			[event.target.name]: value
		});
	}

	/**
     * set date to the state
     * @param event
     */
	const handleDateChange = (event) => {
		// create timestamps
		const createdDate = fbDatetimeToTimestamp();
		const expireDate = fbDatetimeToTimestamp(event);

		// set state
		setState({
			...state,
			createdDate,
			expireDate
		});
	}

	/**
     * on submit
	 * add a new item
	 * clear the form
     */
	const handleSubmit = () => {
		// return on empty
		if (!state.text || !state.expireDate) return;

		// add a new item
		todoApplyOperation(state, TodoCrudEnum.TODO_ADD);

		// set initial state
		setState(initialState);
	};

	return (
		<Form onFinish={handleSubmit} className="td-form">
			{/* Text */}
			<Form.Item className="td-input">
				<Input
					id="text"
					type="text"
					name="text"
					className="input"
					value={state.text}
					onChange={handleTextChange}
				/>
			</Form.Item>

			{/* Date */}
			<Form.Item className="td-date">
				<DatePicker
					id="date"
					name="date"
					type="date"
					onChange={handleDateChange}
					value={fbTimestampToDatetime(state.expireDate.seconds)}
					disabledDate={(current) => {
						return current && current < dateInMoment().subtract(1, 'day');
					}}
				/>
			</Form.Item>

			{/* Submit */}
			<Form.Item>
				<Button type="primary" htmlType="submit">
					Submit
				</Button>
			</Form.Item>
		</Form>
	);
}
export default TodoForm;
