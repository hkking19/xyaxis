import React from 'react';
import PropTypes from 'prop-types'
import Form from '../Shared/Form/Form';
import Logo from '../Shared/Logo/Logo';
import styles from './Auth.module.css';

const Auth = ({ children, formTitle }) => {
	const logoStyle = {
		marginBottom: '20px',
	};

	return (
		<div className={styles.authPage}>
			<Logo styles={logoStyle} />
			<Form title={formTitle}>
				{children}
			</Form>
		</div>
	);
};

Auth.propTypes = {
    formTitle: PropTypes.string.isRequired,
    children: PropTypes.func.isRequired
}

export default Auth;
