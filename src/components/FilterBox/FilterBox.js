import React , {Component} from 'react';
import ImageFilter from "gl-react-imagefilters";
import {Surface} from 'gl-react-dom'
const {Image: GLImage} = require('gl-react-image');

class FilterBox extends Component {
    render(){
      const { filter, name } = this.props;
      return (
        <div style={{float:'left'}}>
        <span>{name}</span>
        <Surface width={window.innerWidth/4} height={window.innerWidth/6}>
          <ImageFilter sepia={filter.sepia} hue={filter.hue} blur={filter.blur} sharpen={filter.sharpen} negative={filter.negative} contrast={filter.contrast} saturation={filter.saturation} brightness={filter.brightness} temparature={filter.temparature}>
            <GLImage
              source={{
                uri: this.props.img ? this.props.img :"https://unsplash.it/450/350",
                width: window.innerWidth/4,
                height: window.innerWidth/6
              }}
              resizeMode="cover"
            />
          </ImageFilter>
        </Surface>
        </div>
    );
  }
};

export default FilterBox;
