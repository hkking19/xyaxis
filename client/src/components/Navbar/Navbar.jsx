/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useContext, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import AuthContext from '../../context/auth/AuthContext';
import { isAuth } from '../../helpers/auth';
import { ReactComponent as CogIcon } from './icons/cog.svg';
import './Navbar.css';

function NavItem(props) {
	const [open, setOpen] = useState(false);

	return (
		<li>
			<label
				href='#'
				className=' pointer'
				onClick={() => setOpen(!open)}
				onAuxClick={() => setOpen(!open)}>
				<i className={props.icon} />
			</label>
			{open && props.children}
		</li>
	);
}

const Navbar = () => {
	const linkStyle = { textDecoration: 'none' };
	const location = useLocation();
	const isActive = (path) => {
		if (path === '/' && location.pathname === '/')
			return { color: 'rgb(140, 104, 199)' };
		if (location.pathname.includes(path.slice(1)) && path !== '/') {
			return { color: 'rgb(140, 104, 199)' };
		} else {
			return { color: '#fff' };
		}
	};
	return (
		<ul className='navbar'>
			<Link to='/' style={linkStyle}>
				<li>
					<i className='fas fa-home white' style={isActive('/')} />
				</li>
			</Link>
			<Link to='/search' style={linkStyle}>
				<li>
					<i
						className='fas fa-search white'
						style={isActive('/search')}
					/>
				</li>
			</Link>
			<Link to='/chats' style={linkStyle}>
				<li>
					<i
						className='far fa-comments white'
						style={isActive('/chats')}
					/>
				</li>
			</Link>
			<Link to='/notification' style={linkStyle}>
				<li>
					<i
						className='fas fa-bell white'
						style={isActive('/notification')}
					/>
				</li>
			</Link>
			<Link to='/profile' style={linkStyle}>
				<li>
					<i
						className='fas fa-user white'
						style={isActive('/profile')}
					/>
				</li>
			</Link>
			<NavItem icon='fas fa-ellipsis-h white'>
				<DropdownMenu />
			</NavItem>
		</ul>
	);
};

export default Navbar;

function DropdownMenu() {
	const authContext = useContext(AuthContext);
	const { logout } = authContext;
	const onClick = () => {
		logout();
		document.location.assign('/');
	};

	function DropdownItem(props) {
		return (
			<p className='menu-item pointer' onClick={props.onClick}>
				<span className='icon-button'>{props.leftIcon}</span>
				{props.children}
			</p>
		);
	}

	return (
		<div className='dropdown' style={{ height: 160 }}>
			<div className='menu'>
				<Link to='/profile'>
					<DropdownItem
						leftIcon={
							<img
								className='img-round dropdown-profile-img'
								src={isAuth().image}
								alt='user profile'
							/>
						}>
						Profile
					</DropdownItem>
				</Link>
				<DropdownItem leftIcon={<CogIcon />}>settings</DropdownItem>
				<DropdownItem
					leftIcon={<i className='fas fa-sign-out-alt' />}
					onClick={onClick}>
					signout
				</DropdownItem>
			</div>
		</div>
	);
}
