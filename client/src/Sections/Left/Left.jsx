import React from 'react';
import Navbar from '../../components/Navbar/Navbar';
import Logo from '../../components/Shared/Logo/Logo';

const Left = () => {
	const styles = {
		margin: '10px 0 0 12px',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		// height: '30px',
		// width: '30px',
	};
	return (
		<>
			<Logo styles={styles} />
			<Navbar />
		</>
	);
};

export default Left;
