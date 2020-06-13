// react
import React, { useState } from 'react';

// app
import { TodoCrudEnum } from './Todo.enum'
import { Button, DatePicker, Form, Input } from 'antd';
import { dateInMoment } from '../../utilities/helpers/Date'

/**
 * todo form to add a new todo to the list
 * @param todoCrud
 * @returns {*}
 * @constructor
 */
const TodoForm = ({ todoCrud }) => {
	// initial state
	const initialState = {
		text: '',
		createdDate: dateInMoment(),
		expireDate: dateInMoment()
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
		setState({
			...state,
			expireDate: event
		});
	}

	/**
     * handle todo on submit
     */
	const handleSubmit = () => {
		// return on empty
		if (!state.text || !state.expireDate) return;

		// add a todo
		todoCrud(state, TodoCrudEnum.TODO_ADD);

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
					value={state.expireDate}
					onChange={handleDateChange}
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
