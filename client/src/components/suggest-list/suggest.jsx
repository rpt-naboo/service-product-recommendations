import React from 'react';
import ReactDOM from 'react-dom';

class Suggest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    	'text': 'Suggests'
    }
  }

  render() {
    return (
      <div>{this.state.text}</div>
    );
  }
}

export default Suggest;