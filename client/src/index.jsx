import React from 'react';
import ReactDOM from 'react-dom';
import Suggest from './components/suggest-list/suggest';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="container">
        <Suggest id={32}/>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
