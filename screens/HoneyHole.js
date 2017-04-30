import React from 'react';
import { inject, observer } from 'mobx-react';
import {
  Image,
  Linking,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Constants, Location, Permissions, MapView } from 'expo';



class HoneyHole extends React.Component{
  constructor(){
    super();
  }


  // backToLibrary(){
  //   this.props.locationStore.honeyHoleClick();
  //   browserHistory.replace("/library");
  // }

  render(){
    let map = (
      <View style={{flex:1}}>
        <MapView style={{flex:1}}
        initialRegion={{
        latitude: this.props.location.coordinates.latitude,
        longitude: this.props.location.coordinates.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
        }}>
          <MapView.Marker
          styles={{zIndex: 1000}}
          coordinate={this.props.location.coordinates}/>
         </MapView>
       </View>
    );
    return(
      <View style={{flex:1}}>
          {map}
          <Text>{this.props.location.title}!</Text>
          <Text>Date: {this.props.location.date} </Text>
          <Text>Latitude: {Math.round(this.props.location.coordinates.latitude * 1000000)/1000000}</Text>
          <Text>Longitude: {Math.round(this.props.location.coordinates.longitude * 1000000)/1000000}</Text>
          <Text>Weather Conditions: {this.props.location.weather.conditions}</Text>
          <Text>Temperature: {Math.floor((this.props.location.weather.temp)* (9/5) - 459.67)} degrees</Text>
          <Text>Wind: {Math.floor((this.props.location.weather.windSpeed) * 2.2369)} mph, {this.props.location.weather.windDir} degrees</Text>
          <Text>Notes: {this.props.location.notes} </Text>
      </View>
    );
  }
}

HoneyHole.propTypes = {
  locationStore: React.PropTypes.object,
  location: React.PropTypes.object,
};

export default inject('locationStore')(observer(HoneyHole));
