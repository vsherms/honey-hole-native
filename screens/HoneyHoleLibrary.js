import React from 'react';
import { inject, observer } from 'mobx-react';
import { Button } from 'react-native-elements';
import HoneyHole from './HoneyHole';
import ListItem from './ListItem';
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
import Router from '../navigation/Router';
import dateFormat from 'dateformat';
import Swipeout from 'react-native-swipeout';


class HoneyHoleLibrary extends React.Component{
  constructor(){
    super();
    this.state = {
      location: {}
    };
    this.handleHoneyDetails = this.handleHoneyDetails.bind(this);
    this.resetLibrary = this.resetLibrary.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }
  static route = {
    navigationBar: {
      visible: true,
      title: 'Library',
      backgroundColor: '#e6e9ed',
    },
  };

  componentDidMount(){
    this.resetLibrary();
  }

  resetLibrary(){
    this.props.locationStore.honeyHoleClicked = false;
  }

  handleHoneyDetails(location, e){
    this.props.locationStore.honeyHoleClicked = true;
    this.props.locationStore.currentLocation = location;
    this.setState({location: location});
    this.props.locationStore.navigator.push(Router.getRoute('librarylink'));
  }

  handleDelete(location, e){
    console.log('hi');
    // if (confirm('Are you sure you want to delete the honey?')) {
      this.props.locationStore.deleteLocation(location._id);
    // } else {
    //   return null;
    // }
 }

  render(){
    const position = (this.props.locationStore.location == '' && this.props.locationStore.locations.length > 0 ?
    [this.props.locationStore.locations[0].coordinates.latitude, this.props.locationStore.locations[0].coordinates.longitude] :
    [this.props.locationStore.location.coords.latitude, this.props.locationStore.location.coords.longitude]);
    // const bounds = latLngBounds([position[0] - 0.01, position[1] - 0.01], [position[0] + 0.01, position[1] + 0.01]);
    // let latsLongs = [];
    // this.props.locationStore.locations.forEach(location =>
    //   latsLongs.push({latLng: [location.coordinates.latitude, location.coordinates.longitude]}));
    // latsLongs.forEach((data) => {
    //   bounds.extend(data.latLng);
    // });

    let locations = this.props.locationStore.locations.map((location, index) =>
      (
        <Swipeout key={index} right={[
            {
              text: 'Delete',
              backgroundColor:'red',
              onPress:this.handleDelete.bind(null, location)
            }
          ]}
          autoClose={true}
        >
          <ListItem
           title={location.title}
           description={dateFormat(location.date,"mm/dd/yy")}
           onPress={this.handleHoneyDetails.bind(null, location)}
           />
        </Swipeout>
      ));

    let markers = this.props.locationStore.locations.map((location, index) =>
      (
        <MapView.Marker key={index}
          styles={{zIndex: 1000}}
          coordinate={location.coordinates}
        />
      ));

    let library = (
        <View style={{flex:1}}>
          <MapView style={{flex:1}}
          initialRegion={{
          latitude: position[0],
          longitude: position[1],
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
          }}>
          {markers}
            <MapView.Marker
            styles={{zIndex: 1000}}
            coordinate={this.props.locationStore.location.coords}/>
           </MapView>
         </View>
      );

    return(
      <View style={{flex:1, backgroundColor:'#f7f7f7'}}>
        {library}
      <ScrollView>
        {locations}
      </ScrollView>
      </View>
    );
  }
}

HoneyHoleLibrary.propTypes = {
  locationStore: React.PropTypes.object
};

export default inject('locationStore')(observer(HoneyHoleLibrary));
