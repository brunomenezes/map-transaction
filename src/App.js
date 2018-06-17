import React, { Component } from 'react';
import Map from './Map';
import Location from './Location';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {locations:{}, centerMap: {lat:51.3, lng:0.7}};
  }
  newLocations(locations) {
    this.setState({locations});
  }

  render() {    
    return (
      <div className="App">
        <Location updateLocation={this.newLocations.bind(this)}/>
        <Map center={this.state.centerMap} locations={this.state.locations}/>
      </div>
    );
  }
}

export default App;
