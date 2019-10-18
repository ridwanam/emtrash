import React, {Component} from 'react';
import Router from './src/config/routes';

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
  render() {
    return(
      <Router/>
    )
  };
}

export default App;