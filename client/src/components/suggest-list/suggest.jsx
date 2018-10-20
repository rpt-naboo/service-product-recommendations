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
      'displayData': [],
      'currentPageNumber': 1,
      'itemPerPage': 4,
      'widgetWidth': 0
    }
    this.get = this.get.bind(this);
    this.getDisplayData = this.getDisplayData.bind(this);
  }

  componentDidMount() {
    this.get();    
    this.handleResize();
  }

  handleResize() {
    window.addEventListener("resize", () => {
      const widgetWidth = document.getElementById('widget').clientWidth;
      console.log(widgetWidth);
    })
  }

  getDisplayData() {
    const fromId = (this.state.currentPageNumber - 1) * this.state.itemPerPage;
    const toId = (this.state.currentPageNumber) * this.state.itemPerPage;
    const displayData = this.state.data.slice(fromId, toId);
    return displayData;
  }

  get() {
    const _this = this;
    const id = _this.state.id;
    const widgetWidth = document.getElementById('widget').clientWidth;
    axios.get(GET_PATH+id)
    .then((res) => {
      _this.setState({data: res.data, widgetWidth: widgetWidth}, () => {
        const displayData = _this.getDisplayData();
        _this.setState({displayData: displayData});
      })
    })
    .catch((err) => {
      console.log(err);
    });
  }

  render() {
    return (
      <div>
        <h1>Total suggest items: {this.state.data.length}</h1>
        <div id="widget" className="row">                
          {
            this.state.displayData.map((item) => 
              <SuggestItem item={item.suggestedProduct} key={item._id}/>
            )          
          }
        </div>
      </div>
    );
  }
}

export default Suggest;