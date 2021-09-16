/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
// import axios from 'axios';
import { Link } from 'react-router-dom';
// import styles from './Auth.module.css';
// import AuthContext from '../../context/auth/AuthContext';
import Auth from './Auth';

const Signup = () => {
	const [User, setUser] = useState({
		name: '',
		email: '',
		password: '',
		username: '',
	});
	const [SubmitButton, setSubmitButton] = useState({
		ButtonText: 'Sign Up',
		clicked: false,
		disabled: false,
	});

	// eslint-disable-next-line no-unused-vars
	const [newUserName, setnewUserName] = useState({
		available: true,
	});

	// const authContext = useContext(AuthContext);
	// const { register } = authContext;

	const onInputChange = (e) => {
		setUser({ ...User, [e.target.name]: e.target.value });
	};

	const onFormSubmit = async () => {
		// const data = {
		// 	name: User.name.trim(),
		// 	email: User.email.trim(),
		// 	password: User.password.trim(),
		// 	username: User.username.trim(),
		// };
		setSubmitButton({
			ButtonText: 'Signing Up',
			clicked: true,
			disabled: true,
		});
		// const res = await register(data);
		const res = true;
		if (res) {
			return setUser({ name: '', email: '', password: '', username: '' });
		}
		return setSubmitButton({
			ButtonText: 'Sign Up',
			clicked: false,
			disabled: false,
		});
	};

	return (
		<Auth formTitle='Sign Up'>
			<div className='login-form'>
				<div className='input-group'>
					<label>Name</label>
					<input
						type='text'
						placeholder='Enter your Name'
						name='name'
						onChange={onInputChange}
					/>
				</div>
				<div className='input-group'>
					<label>Email</label>
					<input
						type='email'
						placeholder='Enter your Email'
						name='email'
						onChange={onInputChange}
					/>
				</div>
				<div className='input-group'>
					<label>Username</label>
					<input
						type='text'
						placeholder='Enter Username'
						name='username'
						onChange={onInputChange}
					/>
				</div>
				<div className='input-group'>
					<label>Password</label>
					<input
						type='password'
						placeholder='Enter Password'
						name='password'
						onChange={onInputChange}
					/>
				</div>
				<div className='input-group submit'>
					<button
                        type='submit'
						className='submit-btn'
						disabled={SubmitButton.disabled}
						onClick={onFormSubmit}>
						<span>{SubmitButton.ButtonText}</span>
						{SubmitButton.clicked && (
							<img src='/images/tenor.gif' alt='dotdot' />
						)}
					</button>
				</div>
				<footer className='form-footer'>
					<Link to='/signin'>
						<label className='pointer'>
							Already have an account? Sign In
						</label>
					</Link>
				</footer>
			</div>
		</Auth>
	);
};

export default Signup;
