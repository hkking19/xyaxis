import moment from 'moment';

// eslint-disable-next-line import/prefer-default-export
export const getTime = (time) => {
	return moment(time).format('h:mm a');
};
