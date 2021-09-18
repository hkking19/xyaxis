import React from "react";
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import './Logo.css';

const Logo = ({styles}) => (
	<Link to='/'>
		<div style={styles} className='main-logo'>
		<svg
			version='1.0'
			xmlns='http://www.w3.org/2000/svg'
			width='27.000000pt'
			height='27.000000pt'
			viewBox='0 0 189.000000 216.000000'
			preserveAspectRatio='xMidYMid meet'>
			<g
				transform='translate(0.000000,216.000000) scale(0.100000,-0.100000)'
				fill='rgb(140, 104, 199)'
				stroke='none'>
				<path
					d='M1413 1850 c-117 -24 -197 -115 -211 -241 l-7 -60 -95 -43 c-52 -24
				-189 -87 -303 -139 l-208 -96 -47 33 c-62 44 -112 59 -181 54 -229 -17 -328
				-293 -163 -454 93 -90 235 -98 343 -18 l47 34 305 -141 305 -141 12 -49 c25
				-103 97 -174 200 -195 115 -23 216 18 278 114 31 49 37 67 40 128 6 116 -42
				200 -145 250 -98 49 -225 31 -296 -41 -37 -38 -69 -91 -76 -129 -4 -17 -10
				-31 -15 -30 -4 1 -138 61 -297 135 -231 106 -288 136 -283 149 4 8 14 40 22
				71 12 49 12 63 -1 110 -8 30 -17 61 -21 70 -5 12 28 31 161 94 92 43 224 104
				292 137 68 32 127 58 132 58 4 0 21 -24 37 -53 34 -60 98 -108 170 -127 81
				-21 210 21 261 86 47 60 63 111 59 189 -3 67 -7 79 -43 131 -62 90 -169 135
				-272 114z'
				/>
			</g>
		</svg>
	</div>
	</Link>
);

Logo.propTypes = {
	styles: PropTypes.string.isRequired
}

export default Logo;
