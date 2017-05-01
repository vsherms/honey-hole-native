import React from 'react';
import { observer, inject } from 'mobx-react';

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

import { FormLabel, Button, FormInput } from 'react-native-elements';


class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: ""
    };
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleUserAuth = this.handleUserAuth.bind(this);
  }

  handleEmailChange(e) {
    this.setState({email: e.nativeEvent.text});
  }
  handlePasswordChange(e) {
    this.setState({password: e.nativeEvent.text});
  }

  handleUserAuth(event){
    console.log(this.state.email + " " + this.state.password)
    event.preventDefault();
    let user = {email: this.state.email, password: this.state.password};
    let navigator = this.props.navigator;
    this.props.locationStore.navigator = navigator;
    this.props.userStore.authUser(user, navigator);
    this.props.userStore.setUser(user);
    this.setState({email: "", password: ""});

  }
  render(){
    let invalidUser = <Text>Please enter valid username and password.</Text>;
    let loginForm = (
      <View>
        <Text>Sign Up</Text>
        <View style={{marginBottom:10}}>
          <FormLabel>Email</FormLabel>
          <FormInput
            onChange={this.handleEmailChange}
            value={this.state.email}
            />
        </View>
        <View style={{marginBottom:10}}>
          <FormLabel>Password</FormLabel>
          <FormInput
            onChange={this.handlePasswordChange}
            value={this.state.password}
            />
          </View>
            <Button onPress={this.handleUserAuth}
             title="Log In"
             />
            {this.props.userStore.failedLogin ? invalidUser : <Text></Text>}
        </View>
      );
    return(
        <View>
          {loginForm}
        </View>
    );
  }
}

Login.propTypes = {
  userStore: React.PropTypes.object,
  locationStore: React.PropTypes.object
}

export default inject('userStore', 'locationStore')(observer(Login));
