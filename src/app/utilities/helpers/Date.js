// app
import moment from 'moment'

/**
 * date in moment format
 * @param date
 * @returns {moment.Moment}
 */
const dateInMoment = (date) => {
	return !date ? moment() : moment(date);
}

/**
 * date in string form
 * @param date
 * @returns {string}
 */
const dateInString = (date) => {
	return date.toString();
}

/**
 * date format 1
 * MM/DD/YYYY
 * @param date
 * @returns {string}
 */
const dateFormat1 = (date) => {
	const d = !date ? moment() : date;
	return dateInString(moment(d).format('MM/DD/YYYY'));
}

/**
 * date format 1
 * DD/MM/YYYY
 * @param date
 * @returns {string}
 */
const dateFormat2 = (date) => {
	const d = !date ? moment() : date;
	return dateInString(moment(d).format('DD/MM/YYYY'));
}

/**
 * validate: is same date
 * @param date
 * @param granularity
 * @returns {boolean}
 */
const dateIsSame = (date, granularity) => {
	return moment(date).isSame(moment(), granularity)
}

/**
 * validate: is before date
 * @param date
 * @param granularity
 * @returns {boolean}
 */
const dateIsBefore = (date, granularity) => {
	return moment(date).isBefore(moment(), granularity)
}

export {
	dateInMoment,
	dateInString,
	dateFormat1,
	dateFormat2,
	dateIsSame,
	dateIsBefore
};
