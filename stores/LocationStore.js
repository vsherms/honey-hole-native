import React from 'react';
import { extendObservable } from 'mobx';
// const dateFormat = require('dateformat');

export default class LocationStore {
  constructor(){
    extendObservable(this, {
      location: '',
      zoom: 11,
      currentLocation: {},
      weather: {
        conditions: '',
        temp: '',
        windSpeed: '',
        windDir:'',
      },
      locations:[],
      defaultTitle: 'New Honey Hole',
      honeyHoleClicked: false,
      navigator: '',
      loggedLocation: false
    });

    this.savePosition = this.savePosition.bind(this);
    this.getWeatherInfo = this.getWeatherInfo.bind(this);
    this.saveFieldNotes = this.saveFieldNotes.bind(this);
    this.loadLocationsFromServer = this.loadLocationsFromServer.bind(this);
    this.honeyHoleClick = this.honeyHoleClick.bind(this);
    this.deleteLocation = this.deleteLocation.bind(this);
  }

  savePosition(ownerId) {
    let coordinates = {
      latitude: this.location.coords.latitude,
      longitude: this.location.coords.longitude
    };
    let weather = {
      temp: this.weather.temp,
      conditions: this.weather.conditions,
      windSpeed: this.weather.windSpeed,
      windDir: this.weather.windDir
    };
    let title = this.defaultTitle;
    fetch('https://honeyhole.herokuapp.com/location/locations', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        date: new Date,
        title: title,
        coordinates: coordinates,
        weather: weather,
        owner: ownerId
      })
    })
    .then(result => result.json())
    .then(result => this.currentLocation = result)
    .then(result => this.locations.push(result));
  }

  getWeatherInfo() {
    fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${this.location.coords.latitude}&lon=${this.location.coords.longitude}&APPID=72c2e10afa58ce6e31b103d41b7125b8`)
       .then(result => result.json())
       .then(data => this.weather = {conditions: data.weather[0].description, temp: data.main.temp, windSpeed: data.wind.speed, windDir: data.wind.deg });
  }

  saveFieldNotes(locationId, title, notes){
    if(title == ''){
      title = "New Honey Hole";
    }
    fetch('https://honeyhole.herokuapp.com/location/locations/' + locationId, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: title,
        notes: notes
      })
    })
    .then(result => result.json())
    .then(result => this.currentLocation = result)
    .then(result => this.locations[this.locations.length - 1] = result);
  }

  loadLocationsFromServer(ownerId) {
    fetch('https://honeyhole.herokuapp.com/location/locations/' + ownerId)
       .then(result => result.json())
       .then(locations => this.locations = locations);
  }

  deleteLocation(locationId) {
    console.log(locationId);
    let newList = this.locations.filter(l => l._id !== locationId);
    this.locations = newList;
    fetch('https://honeyhole.herokuapp.com/location/locations/' + locationId, {
      method: 'DELETE'
    });
  }

  honeyHoleClick(){
    this.honeyHoleClicked = false;
  }
}
