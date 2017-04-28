import React, {Component} from 'react';
import { MapView } from 'expo';
import { View, Text } from 'react-native';
import Location from './Location';

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
        <Text style={{textAlign:'center', fontSize:30}}>Welcome to Honey Hole</Text>
        <Location/>

      </View>
    );
  }
}

export default Map;
