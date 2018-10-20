import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

const GET_PATH = '/api/suggestProducts/';

class Suggest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    	'text': 'Suggests',
      'id': '5bc966caa6944b44e5edf886',
      'data': []
    }
    this.get = this.get.bind(this);
  }

  componentDidMount() {
    this.get();
  }

  get() {
    const _this = this;
    const id = _this.state.id;
    axios.get(GET_PATH+id)
    .then((res) => {
      _this.setState({data: res.data})
    })
    .catch((err) => {
      console.log(err);
    });
  }

  render() {
    return (
      <div>Total suggest items: {this.state.data.length}</div>
    );
  }
}

export default Suggest;