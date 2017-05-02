import React from 'react';
import { observer, inject } from 'mobx-react';
import SignUp from './SignUp';
import Router from '../navigation/Router';

import {
  Image,
  Linking,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TouchableHighlight
} from 'react-native';

let styles = StyleSheet.create({
  backgroundImage: {
    width: null,
    height: 150

  }
});

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
    this.goToSignUp = this.goToSignUp.bind(this);
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

  goToSignUp(){
    this.props.navigator.push(Router.getRoute('signup'));
  }

  render(){
    let signUpButton = (
      <TouchableOpacity onPress={this.goToSignUp}>
      <Text style={{textAlign: 'center', color: '#1aa3ff', padding:20}}>Sign Up</Text>
      </TouchableOpacity>
      );
    let logInMessage = (
      <Text>
      Welcome to Honey Hole!  Go ahead and log in!
      </Text>
    );
    let invalidUser = <Text>Please enter valid username and password.</Text>;
    let loginForm = (
      <View>
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
           borderRadius={10}
           large={true}
           backgroundColor='#1aa3ff'
           icon={{name: 'sign-in', type: 'font-awesome'}}
           />
          {this.props.userStore.failedLogin ? invalidUser : null}
        </View>
      );
    return(
        <View style={{flex:1, backgroundColor:'#f7f7f7'}}>
          <Image source={require('../assets/images/montana-fly-fishing.jpg')}
            style={styles.backgroundImage}/>
            {loginForm}
            {!this.props.userStore.userCreated ? signUpButton : null}
            {this.props.userStore.userCreated ? logInMessage : null}
        </View>
    );
  }
}


Login.propTypes = {
  userStore: React.PropTypes.object,
  locationStore: React.PropTypes.object
}

export default inject('userStore', 'locationStore')(observer(Login));
