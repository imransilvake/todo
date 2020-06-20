// app
import moment from 'moment';
import AppOptions from '../../../app.config';
import firebase from '../../../firebase';

/**
 * date in string form
 * @param date
 * @returns {string}
 */
const dateInString = (date) => {
	return date.toString();
};

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
 * @param date
 * @param granularity
 * @returns {boolean}
 */
const dateIsSame = (date, granularity) => {
	return moment(date).isSame(moment(), granularity);
};

/**
 * validate: is before date
 * @param date
 * @param granularity
 * @returns {boolean}
 */
const dateIsBefore = (date, granularity) => {
	return moment(date).isBefore(moment(), granularity);
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
 * @param value
 * @returns {firebase.firestore.Timestamp}
 */
const fbDatetimeToTimestamp = (value) => {
	return value
		? firebase.firestore.Timestamp.fromDate(moment(value).toDate())
		: firebase.firestore.Timestamp.now();
};

export {
	dateInString,
	dateFormat,
	dateIsSame,
	dateIsBefore,
	fbTimestampToDatetime,
	fbDatetimeToTimestamp
};
