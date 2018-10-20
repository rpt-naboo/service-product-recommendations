import React from 'react';
import ReactDOM from 'react-dom';

const SuggestItem = (props) => {
	return (
		<div>
			<div>{props.item.name}</div>
			<div>
				<img src={props.item.desktop_square_image_url}/>
			</div>
		</div>		
	)
}

export default SuggestItem;