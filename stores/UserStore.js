import {extendObservable} from 'mobx';
import React from 'react';
import {
  createRouter,
  NavigationProvider,
  StackNavigation,
  withNavigation
} from '@expo/ex-navigation';
import Router from '../navigation/Router';


export default class UserStore {
  constructor(){
    extendObservable(this, {
      firstName: "",
      email: "",
      password: "",
      token: "",
      admin: false,
      isLoggedIn: false,
      failedLogin: false,
      userId: "",
      userCreated: false,
      failedEmailPassword: false
    });
    this.authUser = this.authUser.bind(this);
    this.setUser = this.setUser.bind(this);
    this.logUserOut = this.logUserOut.bind(this);
    this.displayWelcome = this.displayWelcome.bind(this);
  }


  authUser(user, navigator) {
    fetch('https://honeyhole.herokuapp.com/api/authenticate', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: user.email,
        password: user.password
      })
    })
    .then(result => result.json())
    .then(res => {
      this.token = res.token;
      this.userId = res.userId;
      this.firstName = res.firstName;
      if(res.token){
        this.isLoggedIn = true;
        console.log("SUCCESS!!!!");
        navigator.push(Router.getRoute('rootNavigation'));
      } else {
        this.failedLogin = true;
        console.log("failed!");
      }
    });
  }

  setUser(user) {
    this.email = user.email;
    this.password = user.password;
  }

  displayWelcome(){
    this.userCreated = true;
  }

  logUserOut() {
    this.token = "";
    this.isLoggedIn = false;
    this.admin = false;
    this.firstName= "";
    this.email= "";
    this.password= "";
    this.failedLogin= false;
    this.userId= "";
    browserHistory.replace("/");
    location.reload();
  }
}
