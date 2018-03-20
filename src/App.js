import firebase from 'firebase';
import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Header, Button, Spinner, Card, CardSection } from './components/common';
import LoginForm from './components/LoginForm';

class App extends Component {
  state = { loggedIn: null };
  componentWillMount() {
    // intialise firebase
    firebase.initializeApp({
      apiKey: 'AIzaSyCbs-_E_phSk4Y-F5VmZsZOjhTuA0r3pLU',
      authDomain: 'auth-93b97.firebaseapp.com',
      databaseURL: 'https://auth-93b97.firebaseio.com',
      projectId: 'auth-93b97',
      storageBucket: 'auth-93b97.appspot.com',
      messagingSenderId: '22307601626'
    });

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ loggedIn: true });//signed in to the app
      } else {
        this.setState({ loggedIn: false });//NOT signed in to the app
      }
    });
  }

  renderContent() {
    switch(this.state.loggedIn) {
      case true:
        return (
          <CardSection>
            <Button onPress={() => firebase.auth().signOut()}>
              Log Out
            </Button>
          </CardSection>
        );
      case false:
        return <LoginForm />;
      default:
        return <Spinner size="large" />
    }
  }

  render() {
    return (
      <View>
        <Header headerText='Authentication' />
        {this.renderContent()}
      </View>
    );
  }
}

const styles = {
  buttonStyle: {
    height: 240,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  }
}

export default App;