import React from 'react';
import './FaceRecognition.css';

const FaceRecognition = ({imgUrl, box}) => {
	return (
    <div className="center ma">
			<div className="absolute mt2"> 
				<img id="inputimage" src={imgUrl} alt='img' width="500px" height='auto'/>
				<div className="bounding-box" style={{top: box.toprow, right: box.rightcol, bottom: box.botrow, left: box.leftcol}}></div>
			</div>
		</div>
	);
}

export default FaceRecognition;