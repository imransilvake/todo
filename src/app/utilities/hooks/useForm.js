// react
import { useState } from 'react';

/**
 * custom hook: useForm
 * handle change events of TextField and DatePicker and perform validation on the form
 * @param valuesInitialState
 * @param formValidation
 * @param submitCallBack
 * @returns {*}
 */
const useForm = (valuesInitialState, formValidation, submitCallBack) => {
	const errorInitialState = {
		init: false
	};

	// hooks: values, errors, loader
	const [values, setValues] = useState(valuesInitialState);
	const [errors, setErrors] = useState(errorInitialState);
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

		// set values initial state
		setValues(valuesInitialState);

		// set errors initial state
		setErrors(errorInitialState);
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
