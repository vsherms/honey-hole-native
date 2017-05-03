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
import { Card, ListItem } from 'react-native-elements';
import dateFormat from 'dateformat';


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
      <View style={{flex:1, backgroundColor:'#f7f7f7'}}>
          {map}
          <ScrollView>
          <View style={styles.container} >
            <Text style={styles.title}><Text style={{fontSize: 20, fontWeight: "bold"}}>{this.props.location.title}!</Text></Text>
          </View>
          <View style={styles.container} >
            <Text style={styles.title}><Text style={{fontWeight: "bold"}}>Date:</Text> {dateFormat(this.props.location.date,"dd/mm/yy")}</Text>
          </View>
          <View style={styles.container} >
            <Text style={styles.title}><Text style={{fontWeight: "bold"}}>Latitude:</Text> {Math.round(this.props.location.coordinates.latitude * 1000000)/1000000}</Text>
          </View>
          <View style={styles.container} >
            <Text style={styles.title}><Text style={{fontWeight: "bold"}}>Longitude:</Text> {Math.round(this.props.location.coordinates.longitude * 1000000)/1000000}</Text>
          </View>
          <View style={styles.container} >
            <Text style={styles.title}><Text style={{fontWeight: "bold"}}>Weather Conditions:</Text> {this.props.location.weather.conditions}</Text>
          </View>
          <View style={styles.container} >
            <Text style={styles.title}><Text style={{fontWeight: "bold"}}>Temperature:</Text> {Math.floor((this.props.location.weather.temp)* (9/5) - 459.67)} degrees</Text>
          </View>
          <View style={styles.container} >
            <Text style={styles.title}><Text style={{fontWeight: "bold"}}>Wind:</Text> {Math.floor((this.props.location.weather.windSpeed) * 2.2369)} mph, {this.props.location.weather.windDir} degrees</Text>
          </View>
          <View style={styles.container} >
            <Text style={styles.title}><Text style={{fontWeight: "bold"}}>Notes:</Text> {this.props.location.notes}</Text>
          </View>
          </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'rgba(0, 0, 0, .1)',
    paddingVertical: 10,
    paddingHorizontal: 14,
  },

  title: {
    fontSize: 16,
    color: '#333',
    margin: 2,
  },

});


HoneyHole.propTypes = {
  locationStore: React.PropTypes.object,
  location: React.PropTypes.object,
};

export default inject('locationStore')(observer(HoneyHole));
