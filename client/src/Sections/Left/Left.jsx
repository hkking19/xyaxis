import React from 'react';
import Navbar from '../../components/Navbar/Navbar';
import Logo from '../../components/Shared/Logo/Logo';

const Left = () => {
	const styles = {
		margin: '20px 0 0 40px',
	};
	return (
		<>
			<Logo styles={styles} />
			<Navbar />
		</>
	);
};

export default Left;
