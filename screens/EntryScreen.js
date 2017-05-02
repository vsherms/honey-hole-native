import React from 'react';
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
import SignUp from './SignUp';
import Login from './Login';

import { MonoText } from '../components/StyledText';

export default class EntryScreen extends React.Component {
  static route = {
    navigationBar: {
      title: 'Honey Hole',
      backgroundColor: '#e6e9ed',
    
    },
  };



  render() {
    return (
      <View style={styles.container}>
        <Login navigator={this.props.navigator}/>
      </View>
    );
  }


}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
