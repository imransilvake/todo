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
	 * @param fieldName
	 */
	const handleChange = (event, fieldName = null) => {
		// payload
		const payload = { ...values };
		if (fieldName) {
			payload[fieldName] = event;
		} else {
			const { name, value } = event.target;
			payload[name] = value;
		}

		// set values
		setValues(payload);

		// set errors
		const validateErrors = formValidation(payload);
		setErrors(validateErrors);
	};

	/**
	 * handle submit
	 */
	const handleSubmit = async () => {
		// start loader
		setLoader(true);

		// callback
		// wait for callback to execute
		await submitCallBack();

		// initial state
		setValues(initialState);

		// stop loader
		setLoader(false);
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
