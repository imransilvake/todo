/**
 * form validation
 * @param values
 * @constructor
 */
const TodoFormValidation = (values) => {
	const errors = {};

	// field: text
	if (!values.text) {
		errors.text = 'text is required!';
	}

	// field: expire date
	if (!values.expireDate) {
		errors.expireDate = 'expireDate is required!';
	}

	return errors;
};
export default TodoFormValidation;
