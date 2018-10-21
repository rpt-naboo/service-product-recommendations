import React from 'react';
import ReactDOM from 'react-dom';

const divStyle = {
	width: '200px',
	'marginRight': '10px'
}

const SuggestItem = (props) => {

	return (
		<div className="card" style={divStyle}>
			<img className="card-img-top" src={props.item.desktop_square_image_url}/>
			<div className="card-body">
				<h5 className="card-title">{props.item.name}</h5>
				<a href="#" className="btn btn-outline-primary btn-block">Add</a>
			</div>
		</div>		
	)
}

export default SuggestItem;