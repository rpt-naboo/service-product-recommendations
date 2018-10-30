import React from 'react';
import axios from 'axios';
import SuggestItem from './suggestItem';
import PageHandler from './page-handler';
import css from './css/style.css';

const GET_PATH = 'http://localhost:8080/api/suggestions/products/';
const PRODUCT_GET_PATH = 'http://localhost:8080/api/products/';

class Suggest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '2',
      data: [],
      displayData: [],
      currentPageNumber: 1,
      itemPerPage: 4,
      widgetWidth: 0,
    };

    this.get = this.get.bind(this);
    this.handlePageActionClick = this.handlePageActionClick.bind(this);
    this.getDisplayData = this.getDisplayData.bind(this);
    this.handleResize = this.handleResize.bind(this);
  }

  componentDidMount() { 
    this.setState({id: this.props.id}, () => {
      this.get();
    });    
    this.handleResize();
  }

  getDisplayData(currentPageNumber, itemPerPage, data) {
    const fromId = (currentPageNumber - 1) * itemPerPage;
    const toId = (currentPageNumber) * itemPerPage;
    const displayData = data.slice(fromId, toId);
    return displayData;
  }

  handlePageActionClick(num) {
    const currentPageNumber = this.state.currentPageNumber + Number(num);
    const itemPerPage = this.state.itemPerPage;
    const data = this.state.data;
    const displayData = this.getDisplayData(currentPageNumber, itemPerPage, data);
    //console.log(currentPageNumber,displayData)
    this.setState({displayData: displayData, currentPageNumber: currentPageNumber});
  }

  handleResize() {
    window.addEventListener("resize", () => {
      const widgetWidth = document.getElementById('widget-suggestions').clientWidth;
      console.log(widgetWidth);
    });
  }

  get() {
    const _this = this;
    const id = _this.state.id;
    const currentPageNumber = _this.state.currentPageNumber;
    const itemPerPage = _this.state.itemPerPage;    
    const widgetWidth = document.getElementById('widget-suggestions').clientWidth;
    
    axios.get(GET_PATH+id)
    .then((res) => {
      return res.data
    })
    .then((suggestions) => {      
      let promises = [];
      for (var i = 0; i < suggestions.length; i++) {
        var suggestProductPath = PRODUCT_GET_PATH+suggestions[i].suggestProductId;
        promises.push(axios.get(suggestProductPath));
      }
      axios.all(promises)
        .then(axios.spread((...args) => {
          let data = [];
          for (var j = 0; j < args.length; j++) {
            data.push(args[j].data[0]);
          }
          return data;
        }))
        .then((data) => {
          _this.setState({data: data, widgetWidth: widgetWidth}, () => {
            const displayData = _this.getDisplayData(currentPageNumber, itemPerPage, data);
            _this.setState({displayData: displayData});
          })          
        })
        .catch((err) => {
          console.log(err);
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
        <div id="widget-suggestions" className="suggestions-widget">     
          <PageHandler actionLabel="<" actionClassName='previous' pageNum="-1" clickHandler={this.handlePageActionClick}/>
          <div className="items">
            {
              this.state.displayData.map((item) => 
                <SuggestItem item={item} key={item.id}/>
              )          
            }
          </div>
          <PageHandler actionLabel=">" actionClassName='next' pageNum="1" clickHandler={this.handlePageActionClick}/>
        </div>
      </div>
    );
  }
}

export default Suggest;