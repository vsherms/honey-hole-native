import React from 'react';
import { observer, inject } from 'mobx-react';
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
} from 'react-native';

import { FormLabel, Button, FormInput } from 'react-native-elements';

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      password: ""
    };
    this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
    this.handleLastNameChange = this.handleLastNameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.addUserToDatabase = this.addUserToDatabase.bind(this);
  }

  static route = {
    navigationBar: {
      title: 'Honey Hole',
      backgroundColor: '#e6e9ed',
    },
  };


  handleFirstNameChange(e) {
    console.log(e.nativeEvent.text);
    this.setState({firstName: e.nativeEvent.text});
  }

  handleLastNameChange(e) {
    this.setState({lastName: e.nativeEvent.text});
  }

  handleEmailChange(e) {
    this.setState({email: e.nativeEvent.text});
  }

  handlePasswordChange(e) {
    this.setState({password: e.nativeEvent.text});
  }

  addUserToDatabase(e){
    console.log(this.state.firstName + " " + this.state.firstName + this.state.firstName + this.state.firstName);
    // this.props.userStore.userCreated = false;
    // this.props.userStore.failedEmailPassword = false;
    e.preventDefault();
    fetch('https://honeyhole.herokuapp.com/newuser', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        email: this.state.email,
        password: this.state.password,
      })

    })
    .then(result => console.log(result));
    if(this.state.email && this.state.password){
      this.props.userStore.displayWelcome();
      this.props.navigator.push(Router.getRoute('entry'));
      this.setState({firstName: "", lastName: "", email: "", password: "",});
    } else {
      this.props.userStore.failedEmailPassword = true;
    }
  }


  render() {
    let logInMessage = (
      <Text>
      Welcome to Honey Hole!  Go ahead and log in!
      </Text>
    );

    let noEmail = (
      <Text>
        Please enter a valid e-mail and password.
      </Text>
    );

    let signUpForm = (
      <View>
        <View style={{marginBottom:10}}>
          <FormLabel>First Name</FormLabel>
          <FormInput
            onChange={this.handleFirstNameChange}
            value={this.state.firstName}
            />
        </View>
        <View style={{marginBottom:10}}>
          <FormLabel>Last Name</FormLabel>
          <FormInput
            onChange={this.handleLastNameChange}
            value={this.state.lastName}
            />
        </View>
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
          <Button
           onPress={this.addUserToDatabase}
           title="Sign Up"
           borderRadius={10}
           large={true}
           backgroundColor='#1aa3ff'
           icon={{name: 'user-plus', type: 'font-awesome'}}
           />
          {this.props.userStore.failedEmailPassword ? noEmail: null}
      </View>
    );
    return(
        <View style={{flex:1, backgroundColor:'#f7f7f7'}}>
          {signUpForm}
        </View>
    );
  }
}

SignUp.propTypes = {
  userStore: React.PropTypes.object
}

export default inject('userStore')(observer(SignUp));
