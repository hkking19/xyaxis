import React, { Fragment } from 'react'
import { isAuth } from '../../helpers/auth';
import './Profile.css'

const Profile = () => {
    const user = isAuth();
    return (
        <Fragment>
                <div className="profile-top">
                    <img className="background-image" src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80" alt="" />
                    <div className="profile">
                        <img className="profile-image" src={user && user.image} alt="" />
                    </div>
                </div>
                <div className="profile-bottom">
                    <div className="profile-info" id="same-font">
                        <div>
                            <p className="Name">Harshal Kaigaonkar<br />(User Name)</p>
                            <p className="Desc">Description</p>
                            <p className="Email">Email</p>
                        </div>
                        <div className="status">
                            <p id="status">8 Followers</p>
                            <p id="status">8 Following</p>
                        </div>
                    </div>
                </div>
                <hr/>
        </Fragment>
            );
}

            export default Profile
