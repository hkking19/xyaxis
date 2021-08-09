import React, { useReducer,useContext } from 'react';
import axios from 'axios';
import AuthContext from './AuthContext';
import AuthReducer from './AuthReducer';
import ErrorContext from '../error/ErrorContext';
import setAuthToken from '../../Utils/setAuthToken';
import { USER_REGISTER, USER_LOGIN, GET_USER, USER_LOGOUT, PUSH_USER, REMOVE_USER } from '../type';
import { authenticate, getCookie, setCookie, unAuthenticate } from '../../helpers/auth';



const AuthState = (props) => {

    const errorContext = useContext(ErrorContext);
    const {Seterror} = errorContext;

    const initialState = {
        isAuthenticated: false,
        user: null,
        token: localStorage.getItem('token'),
        inRoom: false,
        loading: true,
    }

    const [state, dispatch] = useReducer(AuthReducer, initialState);

    const loadUser = async () => {
        const token = getCookie('token')
        if(token) {
            setAuthToken(token)
            try {
                const res = await axios.get('http://localhost:3001/auth/');
                authenticate(res)
                if (res.data) {
                    dispatch({ type: GET_USER, payload: res.data });
                }
            } catch (error) {
            console.log(error)
            unAuthenticate()
        }
        }
        
    }

    const register = async (data) => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        if (!data) {
            return;
        }
        try {
            const res = await axios.post('http://localhost:3001/auth/signup', data, config);
            console.log(res)
            if (res.data) {
                dispatch({ type: USER_REGISTER, payload: res.data.token })
                setCookie('token',res.data.token)
                loadUser();
                return true;
            }
        } catch (error) {
            if(error.response) {
                const msg = {
                    message: error.response.data.error,
                    type:'danger'
                }
                Seterror(msg)
                return false
            }
        }
    }

    const signin = async (data) => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        if (!data) {
            return;
        }

        try {
            const res = await axios.post('http://localhost:3001/auth/signin', data, config);
            if (res.data) {
                dispatch({ type: USER_LOGIN, payload: res.data.token })
                setCookie('token',res.data.token)
                loadUser();
                return true;
            }   
        } catch (error) {
            if(error.response) {
                console.log(error.response.data.error)
                const msg = {
                    message: error.response.data.error,
                    type:'danger'
                }
                Seterror(msg)
                return false
            }
        }
    }
    const pushUser = () => {
        dispatch({ type: PUSH_USER })
    }
    const removeUser = () => {
        dispatch({ type: REMOVE_USER })
    }
    const logout = () => {
        unAuthenticate()
        dispatch({ type: USER_LOGOUT })
    }

    return (
        <AuthContext.Provider
            value={{
                user: state.user,
                token: state.token,
                isAuthenticated: state.isAuthenticated,
                inRoom: state.inRoom,
                error: state.error,
                loading: state.loading,
                register,
                signin,
                pushUser,
                removeUser,
                logout
            }}
        >
            {props.children}
        </AuthContext.Provider>
    )
}


export default AuthState;