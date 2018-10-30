import React from 'react';


const SuggestItem = (props) => {
  return (
    <div className="item">
      <img src={props.item.imageUrl} />
      <div>
        <p>{props.item.name}</p>
        <a href="#">Add</a>
      </div>
    </div>
  );
};

export default SuggestItem;
