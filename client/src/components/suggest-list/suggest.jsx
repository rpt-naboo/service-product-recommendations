import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import SuggestItem from './suggestItem.jsx';

const GET_PATH = '/api/suggestProducts/';

class Suggest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    	'text': 'Suggests',
      'id': '5bc966caa6944b44e5edf886',
      'data': [],
      'widgetWidth': 0
    }
    this.get = this.get.bind(this);
  }

  componentDidMount() {
    this.get();    
    this.handleResize();
  }

  handleResize() {
    window.addEventListener("resize", () => {
      const widgetWidth = document.getElementById('widget').clientWidth;
      console.log(widgetWidth)
    })
  }

  get() {
    const _this = this;
    const id = _this.state.id;
    const widgetWidth = document.getElementById('widget').clientWidth;
    axios.get(GET_PATH+id)
    .then((res) => {
      _this.setState({data: res.data, widgetWidth: widgetWidth})
    })
    .catch((err) => {
      console.log(err);
    });
  }

  render() {
    return (
      <div>
        <h1>Total suggest items: {this.state.data.length}</h1>
        <div id="widget">
          {
            this.state.data.map((item) => 
              <SuggestItem item={item.suggestedProduct} key={item._id}/>
            )          
          }
        </div>
      </div>
    );
  }
}

export default Suggest;