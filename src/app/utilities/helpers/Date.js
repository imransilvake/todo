// app
import moment from 'moment';
import AppOptions from '../../../app.config';
import firebase from '../../../firebase';

/**
 * date in moment
 * @param date
 * @returns {moment.Moment}
 */
const dateInMoment = (date) => (date ? moment(date) : moment());

/**
 * date in string
 * @param date
 * @returns {string}
 */
const dateInString = (date) => date.toString();

/**
 * date format
 * MM/DD/YYYY
 * @param date
 * @param format
 * @returns {string}
 */
const dateFormat = (date, format = AppOptions.date.formats.one) => {
	const d = !date ? moment() : date;
	return dateInString(moment(d).format(format));
};

/**
 * validate: is same date
 * @param date1
 * @param date2
 * @param granularity
 * @returns {boolean}
 */
const dateIsSame = (date1, date2, granularity) => {
	return moment(date1).isSame(date2 || moment(), granularity);
};

/**
 * validate: is before date
 * @param date1
 * @param date2
 * @param granularity
 * @returns {boolean}
 */
const dateIsBefore = (date1, date2, granularity) => {
	return moment(date1).isBefore(date2 || moment(), granularity);
};

/**
 * validate: is after date
 * @param date1
 * @param date2
 * @param granularity
 * @returns {boolean}
 */
const dateIsAfter = (date1, date2, granularity) => {
	return moment(date1).isAfter(date2 || moment(), granularity);
};

/**
 * firebase: timestamp to datetime
 * @param timestamp
 * @returns {moment.Moment}
 */
const fbTimestampToDatetime = (timestamp) => {
	const ts = timestamp || firebase.firestore.Timestamp.now().seconds;
	return moment(ts * 1000);
};

/**
 * firebase: datetime to timestamp
 * @param date
 * @returns {firebase.firestore.Timestamp}
 */
const fbDatetimeToTimestamp = (date) => {
	return date
		? firebase.firestore.Timestamp.fromDate(moment(date).toDate())
		: firebase.firestore.Timestamp.now();
};

export {
	dateInMoment,
	dateInString,
	dateFormat,
	dateIsSame,
	dateIsBefore,
	dateIsAfter,
	fbTimestampToDatetime,
	fbDatetimeToTimestamp
};
