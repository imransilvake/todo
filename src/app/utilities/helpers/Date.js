// app
import moment from 'moment';
import * as firebase from 'firebase';

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
const dateFormat = (date) => {
	const d = !date ? moment() : date;
	return dateInString(moment(d).format('MM/DD/YYYY'));
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

/**
 * firebase: timestamp to datetime
 * @param timestamp
 * @returns {moment.Moment}
 */
const fbTimestampToDatetime = (timestamp) => {
	const ts = timestamp || firebase.firestore.Timestamp.now().seconds;
	return moment(ts * 1000);
}

/**
 * firebase: datetime to timestamp
 * @param value
 * @returns {firebase.firestore.Timestamp}
 */
const fbDatetimeToTimestamp = (value) => {
	return value
		? firebase.firestore.Timestamp.fromDate(moment(value).toDate())
		: firebase.firestore.Timestamp.now();
}

export {
	dateInMoment,
	dateInString,
	dateFormat,
	dateIsSame,
	dateIsBefore,
	fbTimestampToDatetime,
	fbDatetimeToTimestamp
};
