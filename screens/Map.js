import React, {Component} from 'react';
import { MapView } from 'expo';
import { View, Text } from 'react-native';
import LocationComponent from './LocationComponent';

class Map extends React.Component {
  constructor(){
    super();

  }

  logLocation(){
    return "hi";
  }

  render() {
    return (
      <View style={{flex:1}}>
        <LocationComponent />

      </View>
    );
  }
}

export default Map;
