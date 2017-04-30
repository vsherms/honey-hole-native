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
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { FormLabel, FormInput } from 'react-native-elements';
import Button from 'react-native-button';



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
      <View>
        <Text>Enter Field Notes</Text>
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
        <Button
          containerStyle={{padding:50, height: 155, overflow:'hidden', backgroundColor: 'red'}}
          style={{fontSize: 25, color: 'white'}}
          onPress={this.handleSaveFieldNotes}
        >Save Your Field Notes!</Button>
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