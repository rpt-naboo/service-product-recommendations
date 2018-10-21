import React from 'react';
import ReactDOM from 'react-dom';
import Suggest from './components/suggest-list/suggest.jsx';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    	'text': 'Hello world'
    }
  }

  render() {    
    return (
      <div className="container">
      	<p>{this.state.text}</p>
        <Suggest/>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));