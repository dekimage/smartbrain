import React from 'react';
import Tilt from 'react-tilt';
import './Logo.css';
import brain from './brain.png';

const Logo = () => {
	return (
		<div className="ma4 mt0">
			
			<Tilt className="Tilt br2 shadow-2" options={{ max : 35 }} style={{ height: 150, width: 150 }} >
 				<div className="Tilt-inner"> <img src={brain} alt="logo" style={{height: 120, width: 120, paddingTop: 20}}/> </div>
			</Tilt>
		</div>
	);
}
export default Logo;