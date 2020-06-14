// react
import { useState } from 'react'

/**
 * custom hook: useForm
 * @param initialState
 * @param formValidation
 * @param submitCallBack
 * @returns {*}
 */
const useForm = (initialState, formValidation, submitCallBack) => {
	// hook: values
	const [values, setValues] = useState(initialState);
	const [errors, setErrors] = useState(0);
	const [loader, setLoader] = useState(false);

	/**
	 * handle value change
	 * @param event
	 */
	const handleChange = (event) => {
		// destruct
		const { name, value } = event.target;

		// payload
		const payload = {
			...values,
			[name]: value
		};

		// set values
		setValues(payload);

		// set errors
		const validateErrors = formValidation(payload);
		setErrors(validateErrors);
	}

	/**
	 * handle date change
	 * @param date
	 * @param name
	 */
	const handleDateChange = (date, name) => {
		// payload
		const payload = {
			...values,
			[name]: date
		};

		// set values
		setValues(payload);

		// set errors
		const validateErrors = formValidation(payload);
		setErrors(validateErrors);
	}

	/**
	 * handle submit
	 */
	const handleSubmit = () => {
		// start loader
		setLoader(true);

		// callback
		submitCallBack();

		// initial state
		setValues(initialState);

		// stop loader
		setLoader(false);
	}

	return {
		handleChange,
		handleDateChange,
		handleSubmit,
		values,
		errors,
		loader
	}
}
export default useForm;
