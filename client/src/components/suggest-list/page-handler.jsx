import React from 'react';

const PageHandler = (props) => {
  function handleClick() {
    props.clickHandler(props.pageNum);
  }

  return (
    <div className="col-1" onClick={handleClick}>
      { props.actionTitle }
    </div>
  );
};

export default PageHandler;
