// react
import { useState } from 'react';

/**
 * custom hook: useForm
 * @param initialState
 * @param formValidation
 * @param submitCallBack
 * @returns {*}
 */
const useForm = (initialState, formValidation, submitCallBack) => {
	// hook: values, errors, loader
	const [values, setValues] = useState(initialState);
	const [errors, setErrors] = useState(0);
	const [loader, setLoader] = useState(false);

	/**
	 * handle change
	 * @param event
	 */
	const handleChange = (event) => {
		// payload
		const payload = { ...values };
		const { name, value } = event.target;
		payload[name] = value;

		// set values
		setValues(payload);

		// set errors
		const validateErrors = formValidation(payload);
		setErrors(validateErrors);
	};

	/**
	 * handle submit
	 */
	const handleSubmit = async (event) => {
		// prevent default
		event.preventDefault();

		// start loader
		setLoader(true);

		// callback
		// wait for callback to execute
		await submitCallBack();

		// stop loader
		setLoader(false);

		// initial state
		setValues(initialState);

		// set errors initial state
		setErrors(0);
	};

	return [
		handleChange,
		handleSubmit,
		values,
		errors,
		loader
	];
};
export default useForm;
