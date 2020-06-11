// app
import moment from 'moment'

/**
 * date in moment format
 * @param date
 * @returns {moment.Moment}
 */
function dateInMoment(date) {
	return !date ? moment() : moment(date);
}

/**
 * date in string form
 * @param date
 * @returns {string}
 */
function dateInString(date) {
	return date.toString();
}

/**
 * date format 1
 * MM/DD/YYYY
 * @param date
 * @returns {string}
 */
function dateFormat1(date) {
	const d = !date ? moment() : date;
	return dateInString(moment(d).format('MM/DD/YYYY'));
}

/**
 * date format 1
 * DD/MM/YYYY
 * @param date
 * @returns {string}
 */
function dateFormat2(date) {
	const d = !date ? moment() : date;
	return dateInString(moment(d).format('DD/MM/YYYY'));
}

// export functions
export {
	dateInMoment,
	dateInString,
	dateFormat1,
	dateFormat2
};
