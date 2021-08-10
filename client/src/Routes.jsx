import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PrivateRoute from './components/Routes/PrivateRoute';
import AuthState from './context/auth/AuthState.jsx';
import ChannelState from './context/channel/ChannelState.jsx';
import ErrorState from './context/error/ErrorState.jsx';
import { verifyToken } from './helpers/auth';
import Layout from './Layout/Layout';
import Signin from './Pages/Auth/Signin';
import Signup from './Pages/Auth/Signup';
import Chats from './Pages/Chats/Chats';
import Home from './Pages/Home/Home';
import Notification from './Pages/Notification/Notification';
import Profile from './Pages/Profile/Profile';
import Search from './Pages/Search/Search';

verifyToken();

const Routes = () => (
	<ErrorState>
		<AuthState>
			<ChannelState>
				<Router>
					<Switch>
						<Layout>
							<PrivateRoute exact path='/' component={Home} />
							<PrivateRoute
								exact
								path='/search'
								component={Search}
							/>
							<PrivateRoute
								exact
								path='/notification'
								component={Notification}
							/>
							<PrivateRoute
								exact
								path='/profile'
								component={Profile}
							/>
							<PrivateRoute
								exact
								path='/chats'
								component={Chats}
							/>
							<Route exact path='/signin'>
								{' '}
								<Signin />{' '}
							</Route>
							<Route exact path='/signup'>
								{' '}
								<Signup />{' '}
							</Route>
						</Layout>
					</Switch>
				</Router>
			</ChannelState>
		</AuthState>
	</ErrorState>
);

export default Routes;
