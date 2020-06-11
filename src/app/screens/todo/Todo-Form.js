// react
import React, { useState } from 'react';

// app
import TodoEnum from './Todo.enum'
import { Button, DatePicker, Form, Input } from 'antd';
import { dateInMoment } from '../../utilities/helpers/Date'

/**
 * todo form to add a new todo to the list
 * @param todoCrud
 * @returns {*}
 * @constructor
 */
function TodoForm({ todoCrud }) {
	// hook: value
	const initialState = { text: '', date: dateInMoment() };
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
			date: event
		});
	}

	/**
     * handle todo on submit
     */
	const handleSubmit = () => {
		// return on empty
		if (!state.text || !state.date) return;

		// add a todo
		todoCrud(state, TodoEnum.TODO_ADD);

		// set initial state
		setState(initialState);
	};

	return (
		<Form onFinish={handleSubmit}>
			{/* text */}
			<Form.Item>
				<Input
					id="text"
					type="text"
					name="text"
					className="input"
					value={state.text}
					onChange={handleTextChange}
				/>
			</Form.Item>

			{/* date */}
			<Form.Item>
				<DatePicker
					id="date"
					name="date"
					type="date"
					value={state.date}
					onChange={handleDateChange}
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
