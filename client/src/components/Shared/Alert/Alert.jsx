import React from 'react';
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

export default Alert;
