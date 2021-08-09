import React from 'react';
import { Route, Redirect } from 'react-router';
import { isAuth } from '../../helpers/auth';

const PrivateRoute = ({ component: Component, ...rest }) => {
	return (
		<Route
			{...rest}
			render={(props) =>
				isAuth() ? <Component {...props} /> : <Redirect to='/signin' />
			}
		/>
	);
};

export default PrivateRoute;
