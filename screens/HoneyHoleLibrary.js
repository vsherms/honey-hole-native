import React from 'react';
import { inject, observer } from 'mobx-react';
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
      title: 'Library'
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
    this.setState({location: location});
  }

  handleDelete(location, e){
    this.props.locationStore.deleteLocation(location._id);
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
        <View key={index}>
          <ListItem
           title={location.date}
           description={location.title}
           onPress={this.handleHoneyDetails.bind(null, location)}
           />
        </View>
      ));
    //
    // let markers = this.props.locationStore.locations.map((location, index) =>
    //   (
    //     <Marker key={index} position={[location.coordinates.latitude, location.coordinates.longitude]}>
    //       <Popup>
    //         <span style={{textAlign:'center'}}>{location.title}</span>
    //       </Popup>
    //     </Marker>
    //   ));

    let library = (
        <View style={{flex:1}}>
          <MapView style={{flex:1}}
          initialRegion={{
          latitude: position[0],
          longitude: position[1],
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
          }}>
            <MapView.Marker
            styles={{zIndex: 1000}}
            coordinate={this.props.locationStore.location.coords}/>
           </MapView>
         </View>
      );

    return(
      <View style={{flex:1}}>
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
