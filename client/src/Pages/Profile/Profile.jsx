import React, { Fragment, useContext, useEffect } from 'react';
import { useParams } from 'react-router';
import UserContext from '../../context/user/UserContext';
import { isAuth } from '../../helpers/auth';
import './Profile.css';

const Profile = () => {
	const user = isAuth();

	const userContext = useContext(UserContext);
	const { getUser, userProfile } = userContext;

	const username = useParams().username;
	useEffect(() => {
		getUser(username, (userName) => {
			document.title = `${userName} | Xyaxis`;
		});
	}, []);
	return (
		<Fragment>
			<div className='profile-top'>
				<img
					className='background-image'
					src='https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80'
					alt=''
				/>
			</div>
			<div className='profile-bottom'>
				<div>
					<img
						className='profile-image'
						src={userProfile && userProfile.image}
						alt=''
					/>
				</div>
				<div className='profile-info' id='same-font'>
					<div>
						<p className='Name'>
							{userProfile && userProfile.name}
						</p>
						<h5>{userProfile && userProfile.username}</h5>
						<p className='Desc'>Description</p>
					</div>
					<div className='status'>
						<p id='status'>8 Followers</p>
						<p id='status'>8 Following</p>
					</div>
				</div>
			</div>
			<hr />
		</Fragment>
	);
};

export default Profile;
