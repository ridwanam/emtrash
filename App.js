import React, {Component} from 'react';
import { View, Alert } from 'react-native';
import Router from './src/config/routes';
import AsyncStorage from '@react-native-community/async-storage';
import firebase from 'react-native-firebase';

// import * as firebase from 'firebase';

// const firebaseConfig = {
//   apiKey: "AIzaSyBKlUh1IR2KnS5P3HvIqDyu-Kdu7HIOwCI",
//   authDomain: "smarbin-ridwan.firebaseapp.com",
//   databaseURL: "https://smarbin-ridwan.firebaseio.com",
//   projectId: "smarbin-ridwan",
//   storageBucket: "smarbin-ridwan.appspot.com",
//   messagingSenderId: "814524367454",
//   appId: "1:814524367454:web:de4e82188d5cd797396acf"
// };
// firebase.initializeApp(config);


class App extends Component {
  async componentDidMount() {
    this.checkPermission();
    this.createNotificationListeners();
  }
  
    //1
  async checkPermission() {
    const enabled = await firebase.messaging().hasPermission();
    console.log('--->',enabled);
    if (enabled) {
      // this.requestPermission();
        this.getToken();
    } else {
        this.requestPermission();
    }
  }
  
    //3
  async getToken() {
    let fcmToken = await AsyncStorage.getItem('fcmToken');
    console.log('-->2token',fcmToken)

    if (!fcmToken) {
        fcmToken = await firebase.messaging().getToken();
        console.log('-->2token',fcmToken)

        if (fcmToken) {
          console.log('-->token',fcmToken)
            // user has a device token
            await AsyncStorage.setItem('fcmToken', fcmToken);
        }
    }
  }
  
    //2
  async requestPermission() {
    try {
        await firebase.messaging().requestPermission();
        // User has authorised
        this.getToken();
        console.log('bb');
    } catch (error) {
        // User has rejected permissions
        console.log('permission rejected');
    }
  }

 //Remove listeners allocated in createNotificationListeners()
 componentWillUnmount() {
  this.notificationListener();
  this.notificationOpenedListener();
}

async createNotificationListeners() {
  /*
  * Triggered when a particular notification has been received in foreground
  * */
  this.notificationListener = firebase.notifications().onNotification((notification) => {
      const { title, body } = notification;
      this.showAlert(title, body);
  });

  /*
  * If your app is in background, you can listen for when a notification is clicked / tapped / opened as follows:
  * */
  this.notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen) => {
      const { title, body } = notificationOpen.notification;
      this.showAlert(title, body);
  });

  /*
  * If your app is closed, you can check if it was opened by a notification being clicked / tapped / opened as follows:
  * */
  const notificationOpen = await firebase.notifications().getInitialNotification();
  if (notificationOpen) {
      const { title, body } = notificationOpen.notification;
      this.showAlert(title, body);
  }
  /*
  * Triggered for data only payload in foreground
  * */
  this.messageListener = firebase.messaging().onMessage((message) => {
    //process data message
    console.log(JSON.stringify(message));
  });
}

showAlert(title, body) {
  Alert.alert(
    title, body,
    [
        { text: 'OK', onPress: () => console.log('OK Pressed') },
    ],
    { cancelable: false },
  );
}

  render() {
    return(
      <Router/>
    )
  };
}

export default App;