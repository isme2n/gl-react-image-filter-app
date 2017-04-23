import React , {Component} from 'react';
import FilterBox from '../FilterBox/FilterBox';

class FilterList extends Component {
    changeIndex(index){
      this.props.changeIndex(index);
    }
    render(){
      return (
        <div style={{display:'inlineBlock'}}>
          {this.props.img ? Object.keys(this.props.filter).map((key,i) => <span key={i} onClick={this.changeIndex.bind(this,key)} ><FilterBox name={key} img={this.props.img} filter={this.props.filter[key]}/></span>):null}
        </div>
  );
  }
};

export default FilterList;
