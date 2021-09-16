import React from 'react';
import PropTypes from 'prop-types';
import './Alert.css';

const Alert = ({ message, type }) => {
	const icon = {
		danger: 'exclamation',
		success: 'check-circle',
	};
	return (
		<div className={`errorMessage ${type}`}>
			<span className='errorText'>
				<i className={`fas fa-${icon[type]} mr-1`} />
				{message}
			</span>
		</div>
	);
};

Alert.propTypes = {
    message: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired
}

export default Alert;
