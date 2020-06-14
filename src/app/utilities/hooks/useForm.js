// react
import { useState } from 'react';

/**
 * custom hook: useForm
 * @param initialState
 * @param submitCallBack
 * @returns {{handleSubmit: handleSubmit, handleChange: handleChange, values: {}}}
 */
const useForm = (initialState, submitCallBack) => {
	// hook: values
	const [values, setValues] = useState(initialState);

	/**
	 * handle value change
	 * @param event
	 */
	const handleChange = (event) => {
		// destruct
		const { name, value } = event.target;

		// set state
		setValues({
			...values,
			[name]: value
		});
	}

	/**
	 * handle date change
	 * @param date
	 * @param name
	 */
	const handleDateChange = (date, name) => {
		setValues({
			...values,
			[name]: date
		});
	}

	/**
	 * handle submit
	 */
	const handleSubmit = () => {
		// callback
		submitCallBack();

		// initial state
		setValues(initialState);
	}

	return {
		values,
		handleChange,
		handleDateChange,
		handleSubmit
	}
}
export default useForm;
