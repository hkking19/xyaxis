/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from "react";
import { Link } from 'react-router-dom';
import Auth from './Auth';

const Signin = () => {
	// eslint-disable-next-line no-undef
	document.title = 'Sign In | Xyaxis';
	const [User, setUser] = useState({
		email: '',
		password: '',
	});

	const [SubmitButton, setSubmitButton] = useState({
		ButtonText: 'Sign In',
		clicked: false,
		disabled: false,
	});

	// const authContext = useContext(AuthContext);
	// const { signin } = authContext;

	const onInputChange = (e) => {
		setUser({ ...User, [e.target.name]: e.target.value });
	};

	const onFormSubmit = async () => {
		// const data = {
		// 	email: User.email.trim(),
		// 	password: User.password.trim(),
		// };
		setSubmitButton({
			ButtonText: 'Signing In',
			clicked: true,
			disabled: true,
		});
		const res = true;
		if (res) {
			return setUser({ email: '', password: '' });
		}
        return setSubmitButton({
            ButtonText: 'Sign In',
            clicked: false,
            disabled: false
        });
	};

	return (
		<Auth formTitle='Sign In'>
			<div className='login-form'>
				<div className='input-group'>
					<label>Email</label>
					<input
						type='text'
						placeholder='Email'
						name='email'
						onChange={onInputChange}
					/>
				</div>
				<div className='input-group'>
					<label>Password</label>
					<input
						type='password'
						placeholder='Password'
						name='password'
						onChange={onInputChange}
					/>
				</div>
				<div className='input-group submit'>
					<button
                        type="submit"
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
					Forgot Password
					<Link to='/signup'>
						<label className='pointer'>
							Do not have an account? Sign Up
						</label>
					</Link>
				</footer>
			</div>
		</Auth>
	);
};

export default Signin;
