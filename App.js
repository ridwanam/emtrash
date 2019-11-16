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
  constructor(props){
    super(props)
    this.notificationListener = null
    this.notificationOpenedListener = null
    this.FCM = firebase.messaging()
    this.FCN = firebase.notifications()
  }

  async componentDidMount() {
    
    this.checkPermission();
    this.notificationListener = await this.FCN.onNotification((notification) => {
      const { title, body } = notification;
      console.log(notification)
      this.showAlert(title, body);
    });

    /*
    * If your app is in background, you can listen for when a notification is clicked / tapped / opened as follows:
    * */
    this.notificationOpenedListener = await this.FCN.onNotificationOpened((notificationOpen) => {
        const { title, body } = notificationOpen.notification;
        this.showAlert(title, body);
    });

    /*
    * If your app is closed, you can check if it was opened by a notification being clicked / tapped / opened as follows:
    * */
    const notificationOpen = await this.FCN.getInitialNotification();
    if (notificationOpen) {
        const { title, body } = notificationOpen.notification;
        console.log(notificationOpen.notification)
    }
    /*
    * Triggered for data only payload in foreground
    * */
    this.messageListener = await this.FCM.onMessage((message) => {
      //process data message
      console.log(JSON.stringify(message));
    });
  }
  
    //1
  async checkPermission() {
    const enabled = await this.FCM.hasPermission();
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
        fcmToken = await this.FCM.getToken();
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
        await this.FCM.requestPermission();
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

showAlert(title, body) {
  Alert.alert(
    title, body,
    [
        { text: 'Close', onPress: () => console.log('OK Pressed') },
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