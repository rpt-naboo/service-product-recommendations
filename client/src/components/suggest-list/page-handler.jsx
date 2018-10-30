import React from 'react';

const PageHandler = (props) => {
  function handleClick() {
    props.clickHandler(props.pageNum);
  }

  return (
    <div className="pageHandler">
      <div className={"pageHandler-button "+props.actionClassName} onClick={handleClick}>
        {props.actionLabel}
      </div>    	
    </div>
  );
};

export default PageHandler;
