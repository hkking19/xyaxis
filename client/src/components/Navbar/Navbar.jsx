import React, { useContext, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import AuthContext from '../../context/auth/AuthContext';
import { ReactComponent as CogIcon } from './icons/cog.svg';
import './Navbar.css';

function NavItem(props) {
	const [open, setOpen] = useState(false);

	return (
		<li className='nav-item'>
			<label href='#' className=' pointer' onClick={() => setOpen(!open)}>
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
		if (location.pathname === path) {
			return { color: 'rgb(140, 104, 199)' };
		} else {
			return { color: '#fff' };
		}
	};
	return (
		<ul className='navbar'>
			<Link to='/' style={linkStyle}>
				<li>
					<i className='fas fa-home white' style={isActive('/')}></i>
				</li>
			</Link>
			<Link to='/search' style={linkStyle}>
				<li>
					<i
						className='fas fa-search white'
						style={isActive('/search')}></i>
				</li>
			</Link>
			<Link to='/chats' style={linkStyle}>
				<li>
					<i
						className='far fa-comments white'
						style={isActive('/chats')}></i>
				</li>
			</Link>
			<Link to='/notification' style={linkStyle}>
				<li>
					<i
						className='fas fa-bell white'
						style={isActive('/notification')}></i>
				</li>
			</Link>
			<Link to='/profile' style={linkStyle}>
				<li>
					<i
						className='fas fa-user white'
						style={isActive('/profile')}></i>
				</li>
			</Link>
			<NavItem icon='fas fa-ellipsis-h white'>
				<DropdownMenu></DropdownMenu>
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
				<span className='icon-right'>{props.rightIcon}</span>
			</p>
		);
	}

	return (
		<div className='dropdown' style={{ height: 180 }}>
			<div className='menu'>
				<DropdownItem leftIcon={<i className='fas fa-user white' />}>
					My Profile
				</DropdownItem>
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
