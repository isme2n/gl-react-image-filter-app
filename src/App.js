import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Container, Button, Header, Image } from 'semantic-ui-react';
import ImageFilter from "gl-react-imagefilters";
import {Surface} from 'gl-react-dom'
const {Image: GLImage} = require('gl-react-image');
import FilterList from './components/FilterList/FilterList';


var filter = [
  {
    name: 'origin',
    sepia : 0,
    hue : 0,
    blur: 0,
    sharpen:0,
    negative:0,
    contrast:1,
    saturation:1,
    brightness:1,
    temparature:6500
  },
  {
    name:'sample1',
    sepia : 0,
    hue : 0.00379752802194977,
    blur: 0,
    sharpen:0.14914415229748545,
    negative:0,
    contrast:1,
    saturation:1.7986548115091614,
    brightness:1,
    temparature:8725
  },
  {
    name:'sample2',
    sepia : 0,
    hue : 0,
    blur: 0,
    sharpen:1,
    negative:1,
    contrast:2,
    saturation:1,
    brightness:1,
    temparature:6500
  },
  {
    name:'sample3',
    sepia : 0,
    hue : 0,
    blur: 0,
    sharpen:0,
    negative:0,
    contrast:1,
    saturation:2,
    brightness:2,
    temparature:5500
  }
]

class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      index:0,
      img : null
    }

    this.changeIndex = this.changeIndex.bind(this);

  }
  imageLoad(e){
    if(e.target.files.length === 1){
      this.setState({
        img: null
      })
      // for(let i=5;i<10;i++){
      //   filter[i] = {
      //     name:'sample'+i,
      //     sepia :0 ,
      //     hue :Math.random()/8,
      //     blur: 0,
      //     sharpen:Math.random()+1,
      //     negative:0,
      //     contrast:1,
      //     saturation:1+Math.random(),
      //     brightness:0.5+Math.random(),
      //     temparature:Math.floor((Math.random() * 4000) + 8000)
      //   }
      // }
      // console.log(filter);

      var file = e.target.files[0];
      var fileReader = new FileReader();

      var self = this;
      fileReader.onload = function (e) {
            self.setState({
              index:0,
              img : e.target.result
            })
      };
      fileReader.readAsDataURL(file);
    }
      else{

      }
  }

  changeIndex(index){
    this.setState({
      index : index
    })
  }

  exportFile(){
    this.surface.captureFrame({
      type: 'png'}).then((data) => { this.setState({uploaded:data})})
    }

  render() {
    return (
      <div className="App">
        <div className="App-header">
            <Header as='h2' style={{color:'#fff'}}>GL React Image Filter</Header>
        </div>
        <div id="bodyImage">
          <Surface ref={(ref) => { this.surface = ref; }} width={window.innerWidth} height={window.innerHeight*3/5}>
            <ImageFilter sepia={filter[this.state.index].sepia} hue={filter[this.state.index].hue} blur={filter[this.state.index].blur} sharpen={filter[this.state.index].sharpen} negative={filter[this.state.index].negative} contrast={filter[this.state.index].contrast} saturation={filter[this.state.index].saturation} brightness={filter[this.state.index].brightness} temparature={filter[this.state.index].temparature}>
              <GLImage
                id="aaa"
                source={{
                  uri: this.state.img ? this.state.img :"http://placehold.it/600x400&text=Input+Your+Image",
                  width: window.innerWidth,
                  height: window.innerWidth*3/5
                }}
                resizeMode="cover"
              />
            </ImageFilter>
          </Surface>
          <br/>
          <input id="loadButton" onChange={this.imageLoad.bind(this)} type="file" accept="image/*"/>
          <Button onClick={this.exportFile.bind(this)}>export</Button>
        </div>
        <div>
          {this.state.img?<FilterList changeIndex={this.changeIndex} filter={filter} img={this.state.img}/>:null}
        </div>
        <div>
          {this.state.uploaded? <a href={this.state.uploaded} download="myFilter.png" target="_blank">
          이미지 다운로드
        </a> : null}
        </div>
      </div>
    );
  }
}

export default App;
