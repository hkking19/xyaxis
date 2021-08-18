import { SET_USER_PROFILE } from '../type';

const UserReducer = (state, action) => {
	switch (action.type) {
		case SET_USER_PROFILE:
			return {
				...state,
				userProfile: action.payload,
			};
		default:
			return state;
	}
};

export default UserReducer;
