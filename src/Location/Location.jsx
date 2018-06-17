import React, { Component } from 'react';
import './Location.css';

const geocodeAPI = 'https://maps.googleapis.com/maps/api/geocode/json?&address=';
class Location extends Component {
    constructor(props) {
        super(props);        
        this.state = { from: '', to: '' };
    }

    locationChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    show() {
        if (this.state.from && this.state.to) {
            const fromP = fetch(`${geocodeAPI}${this.state.from}`).then(r => r.json());
            const toP = fetch(`${geocodeAPI}${this.state.to}`).then(r => r.json());
            Promise
                .all([fromP, toP])
                .then(requests => {
                    const locations = {};
                    requests.forEach((data, index) => {                        
                        const result = data.status === 'OK'? data.results[0] : null;
                        
                        if(!result) {
                            console.log(data);
                            return
                        }                        
                        const address = result.formatted_address;
                        const location = result.geometry.location;

                        if(index === 0) {    
                            locations.from = {address, location};                            
                        } else {
                            locations.to = {address, location};
                        }
                    });
                    this.props.updateLocation(locations);
                });
        }
    }

    render() { 
        return (
            <form id='location__form'>
                <div className='group'>
                    <input type="text" name='from' onKeyUp={this.locationChange.bind(this)} placeholder='From...' />
                    <input type="text" name='to' onKeyUp={this.locationChange.bind(this)} placeholder='to...' />
                    <button type='button' name='find' onClick={this.show.bind(this)}>Show</button>
                </div>
            </form>
        );
    }
}

export default Location;