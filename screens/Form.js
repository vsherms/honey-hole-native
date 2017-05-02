import React from 'react';
import { inject, observer } from 'mobx-react';
import Router from '../navigation/Router';

// import HoneyHole from './HoneyHole';
import {
  Image,
  Linking,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

import { FormLabel, Text, FormInput } from 'react-native-elements';
import { Button } from 'react-native-elements';



class Form extends React.Component {
  constructor(){
    super();
    this.state = {
      title: '',
      notes: '',
      honeyHole: false
    };
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleNotesChange = this.handleNotesChange.bind(this);
    this.handleSaveFieldNotes = this.handleSaveFieldNotes.bind(this);
  }



  handleTitleChange(e) {
    this.setState({title: e.nativeEvent.text});
    console.log(this.state.title);
  }


  handleNotesChange(e) {
    this.setState({notes: e.nativeEvent.text});
    console.log(this.state.notes);
  }

  handleSaveFieldNotes(){
    this.props.locationStore.saveFieldNotes(this.props.locationStore.currentLocation._id, this.state.title, this.state.notes);
    this.props.locationStore.loggedLocation = false;
    this.setState({title: '', notes: ''});
    this.props.locationStore.navigator.push(Router.getRoute('links'));
  }

  render(){
    let form = (
      <View style={{flex:1, backgroundColor:'#f7f7f7'}}>
        <FormLabel>Title</FormLabel>
        <FormInput
        onChange={this.handleTitleChange}
        value={this.state.title}
        />
        <FormLabel>Notes</FormLabel>
        <FormInput
        value={this.state.notes}
        onChange={this.handleNotesChange}
        />
        <Button onPress={this.handleSaveFieldNotes}
         title="Save Your Field Notes"
         borderRadius={10}
         large={true}
         backgroundColor='#1aa3ff'
         icon={{name: 'map-o', type: 'font-awesome'}}
         />

      </View>
    );

    return(
      <View style={{flex:1}}>
        {form}
      </View>
    );
  }
}

Form.propTypes = {
  locationStore: React.PropTypes.object
};

export default inject('locationStore')(observer(Form));
