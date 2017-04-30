import React, { Component } from 'react';
import { Platform, Text, View, StyleSheet } from 'react-native';
import { Constants, Location, Permissions, MapView } from 'expo';
import Button from 'react-native-button';
import Router from '../navigation/Router';
import { inject, observer } from 'mobx-react';
import Form from './Form';

class LocationComponent extends Component {
  constructor(){
    super();
    this.state = {
      location: null,
      errorMessage: null,
    };
    this.handleSavePosition = this.handleSavePosition.bind(this);
  }

  componentWillMount() {
    if (Platform.OS === 'android' && !Constants.isDevice) {
      this.setState({
        errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
      });
    } else {
      this._getLocationAsync();
    }
  }

  handleSavePosition(){
    this.props.locationStore.savePosition(this.props.userStore.userId);
    this.props.locationStore.loggedLocation = true;
  }

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }

    let location = await Location.getCurrentPositionAsync({});
    this.props.locationStore.location = location;
    // this.props.locationStore.getWeatherInfo();
    this.setState({ location: location });
  };

  render() {
    let text = 'Waiting..';
    if (this.state.errorMessage) {
      text = this.state.errorMessage;
    } else if (this.state.location) {
      text = JSON.stringify(this.state.location);
    }
    let mylatitude = 0;
    let mylongitude = 0;
    let coords = {latitude: 0, longitude: 0};
    if(this.state.location){
      mylatitude = this.state.location.coords.latitude;
      mylongitude = this.state.location.coords.longitude;
      coords = this.state.location.coords;
      console.log(coords);
    }
    let map = (
      <View style={{flex:1}}>
        <MapView style={{flex:1}}
        initialRegion={{
        latitude: mylatitude,
        longitude: mylongitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}>
        <MapView.Marker
        styles={{zIndex: 1000}}
        coordinate={coords}/>
       </MapView>
       <Button
         containerStyle={{padding:50, height: 155, overflow:'hidden', backgroundColor: 'red'}}
         style={{fontSize: 25, color: 'white'}}
         onPress={this.handleSavePosition}
       >Save Your Honey Hole!</Button>
     </View>
    )


    return (
      <View style={{flex:1}}>
      {this.state.location && !this.props.locationStore.loggedLocation ? map : null}
      {this.props.locationStore.loggedLocation ? <Form/> : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    textAlign: 'center',
  },
});

LocationComponent.propTypes = {
  locationStore: React.PropTypes.object,
  userStore: React.PropTypes.object
}

export default inject('locationStore', 'userStore')(observer(LocationComponent));
