import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state ={
      images: []
    };
  }

  componentWillMount(){
    this.getImages("1")
  }

  async getImages(categoryId) {
    try {
      let response = await fetch(
        'https://api.thecatapi.com/v1/images/search?category_ids='+categoryId+'&limit=50', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'x-api-key': 'ABC123',
        }
      });
      let responseJson = await response.json();
      console.log(responseJson[0].url);
      this.setState({
        images: responseJson
      })
    } catch (error) {
      console.error(error);
    }
  }

  card(data){
    return(
      <div className="card" style={{background: 'url('+data.url+')'}}></div>
    )
  }

  render() {
    return(
      <div className="flex" style={{display: 'flex'}}>
        <div className="flex sidebar">
          <p>Category</p>
          <p className="category" onClick={() => this.getImages("1")}>
            Hats
          </p>
          <p className="category" onClick={() => this.getImages("5")}>
            Boxes
          </p>
          <p className="category" onClick={() => this.getImages("7")}>
            Ties
          </p>
        </div>
        <div className="flex content-wrapper">
          {this.state.images.map((data, index) => {
            return(
              this.card(data)
            )
          })}
        </div>
      </div>
    )
  }
}

export default App;
