// react
import React, { useState } from 'react';

/**
 * todo form to add a new todo to the list
 * @param addTodo
 * @returns {*}
 * @constructor
 */
function TodoForm({ addTodo }) {
	// hook: value
	const [value, setValue] = useState('');

	/**
     * handle todo on submit
     * @param e
     */
	const handleSubmit = (e) => {
		// prevent default
		e.preventDefault();

		// return on empty
		if (!value) return;

		// add todo
		addTodo(value);

		// clear input
		setValue('');
	};

	return (
		<form onSubmit={handleSubmit}>
			<input
				type="text"
				className="input"
				value={value}
				onChange={(e) => setValue(e.target.value)}
			/>
		</form>
	);
}
export default TodoForm;
