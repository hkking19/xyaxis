import React, { useReducer } from 'react';
import axios from 'axios';
import { getCookie } from '../../helpers/auth';
import setAuthToken from '../../Utils/setAuthToken';
import { SET_USER_PROFILE } from '../type';
import UserContext from './UserContext';
import UserReducer from './UserReducer';

const UserState = (props) => {
	const initialState = {
		userProfile: null,
	};

	const [state, dispatch] = useReducer(UserReducer, initialState);

	const getUser = async (username) => {
		const token = getCookie('token');
		if (token) {
			setAuthToken(token);
			try {
				const res = await axios.get(
					`http://localhost:3001/api/user/profile?username=${username}`
				);
				dispatch({ type: SET_USER_PROFILE, payload: res.data });
			} catch (error) {
				if (error.response) {
					// const msg = {
					// 	message: error.response.data.error,
					// 	type: 'danger',
					// };
				}
				console.log(error);
			}
		}
	};

	return (
		<UserContext.Provider
			value={{
				userProfile: state.userProfile,
				getUser,
			}}>
			{props.children}
		</UserContext.Provider>
	);
};

export default UserState;
