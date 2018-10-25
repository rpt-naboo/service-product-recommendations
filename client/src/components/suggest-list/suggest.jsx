import React from 'react';
import axios from 'axios';
import SuggestItem from './suggestItem';
import PageHandler from './page-handler';

const GET_PATH = '/api/suggestions/';
const PRODUCT_GET_PATH = '/api/products';

class Suggest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '5bc966caa6944b44e5edf886',
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
    this.get();
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
      const widgetWidth = document.getElementById('widget').clientWidth;
      console.log(widgetWidth);
    });
  }

  get() {
    const _this = this;
    const id = _this.state.id;
    const currentPageNumber = _this.state.currentPageNumber;
    const itemPerPage = _this.state.itemPerPage;    
    const widgetWidth = document.getElementById('widget').clientWidth;
    
    axios.get(GET_PATH+id)
    .then((res) => {
      return res.data
    })
    .then((suggestions) => {      
      for (var i = 0; i < suggestions.length; i++) {
        var suggestProductId = suggestions[i].suggestProductId;
        
      }
    })
    .catch((err) => {
      console.log(err);
    });
  }

  // const suggestions = res.data;

  // _this.setState({data: res.data, widgetWidth: widgetWidth}, () => {
  //   const displayData = _this.getDisplayData(currentPageNumber, itemPerPage, res.data);
  //   _this.setState({displayData: displayData});
  // })

  render() {
    return (
      <div>
        <h1>Total suggest items: {this.state.data.length}</h1>
        <div id="widget" className="row align-items-center">     
          <PageHandler actionTitle='Prev' pageNum="-1" clickHandler={this.handlePageActionClick}/>
            {
              this.state.displayData.map((item) => 
                <SuggestItem item={item.suggestedProduct} key={item._id}/>
              )          
            }
          <PageHandler actionTitle='Next' pageNum="1" clickHandler={this.handlePageActionClick}/>
        </div>
      </div>
    );
  }
}

export default Suggest;