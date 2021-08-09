import { USER_REGISTER, USER_LOGIN, GET_USER, USER_LOGOUT, PUSH_USER, REMOVE_USER } from '../type';


const AuthReducer = (state, action) => {
    switch (action.type) {
        case USER_REGISTER:
        case USER_LOGIN:
            return {
                ...state,
                ...action.payload,
                isAuthenticated: true,
                loading: false
            };
        case GET_USER:
            return {
                ...state,
                user: action.payload,
                isAuthenticated: true,
                loading: false
            };
        case PUSH_USER:
            return {
                ...state,
                inRoom: true
            };
        case REMOVE_USER:
            return {
                ...state,
                inRoom: false,
                socket: null,
            };
        case USER_LOGOUT:
            return {
                ...state,
                user: null,
                isAuthenticated: false,
                loading: false
            };
        default:
            return state;
    }
}

export default AuthReducer;