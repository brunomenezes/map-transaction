import React, { Component } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './Map.css';

class Map extends Component {
    constructor(props) {
        super(props);
        this.state = { map: {} };
    }

    drawPath(locations) {
        if (locations.from && locations.to) {
            const circle = L.circle([locations.from.location.lat, locations.from.location.lng], {
                color: 'white',
                fillColor: '#0ad',
                fillOpacity: 1,
                radius: 50
            });            
            const latLngs = [
                [locations.from.location.lat, locations.from.location.lng],
                [locations.to.location.lat, locations.to.location.lng]
            ];

            const polyline = L.polyline(latLngs, {color:'#0ad'}); 
            polyline.addTo(this.state.map);
            circle.addTo(this.state.map);
            this.state.map.fitBounds(polyline.getBounds());
        }
    }

    componentDidMount() {
        const map = new L.Map('map__container');
        const minZoom = 8;
        const maxZoom = 20;
        const osmUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
        const attribution = 'Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors';
        const osm = new L.TileLayer(osmUrl, { minZoom, maxZoom, attribution });
        map.setView(new L.LatLng(this.props.center.lat, this.props.center.lng), 13);
        map.addLayer(osm);
        this.setState({ map });
    }

    render() {
        this.drawPath(this.props.locations);        
        return (
            <div id='map__container'>
            </div>
        );
    }
}

export default Map;
