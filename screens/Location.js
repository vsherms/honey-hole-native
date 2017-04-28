import React, { Component } from 'react';
import { Platform, Text, View, StyleSheet } from 'react-native';
import { Constants, Location, Permissions, MapView } from 'expo';
import Button from 'react-native-button';


export default class App extends Component {
  state = {
    location: null,
    errorMessage: null,
  };

  componentWillMount() {
    if (Platform.OS === 'android' && !Constants.isDevice) {
      this.setState({
        errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
      });
    } else {
      this._getLocationAsync();
    }
  }

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }

    let location = await Location.getCurrentPositionAsync({});
    this.setState({ location });
    console.log
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
      console.log(mylatitude);
    }
    let map = (
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
    )

    return (
      <View style={{flex:1}}>
        {this.state.location ? map : null}
        <Button
          containerStyle={{padding:50, height: 155, overflow:'hidden', backgroundColor: 'red'}}
          style={{fontSize: 30, color: 'white'}}
          onPress={this.logLocation}
        >Log Your Honey</Button>
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
