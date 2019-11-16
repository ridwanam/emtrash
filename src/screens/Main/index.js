import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Button,
  StatusBar,
  Image,
  FlatList
} from 'react-native';
import MyBinFeatures from '../../components/molecules/MyBinFeatures'
import firebase from 'react-native-firebase'

class MainScreen extends Component {
  constructor(props){
    super(props)
    this.state = {
      list: []
    }
  }

  componentDidMount() {

    firebase.database().ref('bins').on('value', (data) => {
      if (data.val())
      {
        this.setState({list:data.val()})
        console.log(data.val())
      }
      console.log(data)
    })
  }

  
  render(){
    return (
        <View style={{flex:1,backgroundColor: '#4eadfe'}}>
          <View style={styles.container}>
          {/* <View style={{flexDirection:'row',justifyContent:'flex-end'}}>
            <View style={[styles.boxIconTop,{marginRight:18}]}></View>
            <View style={styles.boxIconTop}></View>
          </View> */}
          <View style={{marginTop:24,marginBottom:36}}>
            <Text style={styles.heading2}>You're in</Text>
            <Text style={styles.heading1}>Dashboard</Text>
          </View>
          <Text style={styles.heading2}>My Bin</Text>
          {/* My Bin Section */}
          <FlatList 
              contentContainerStyle={{marginTop:16,marginBottom:24,marginHorizontal:-18}}
              showsHorizontalScrollIndicator={false}
              horizontal
              data={this.state.list}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({item}) =>  
              <MyBinFeatures          
                onPress={() => this.props.navigation.navigate('BinDetail', { item })}       
                nameBin={item.nama_bin}
                alamatBin={item.alamat_bin}
                valueBin={item.sensor1}
              />}                
            />  
        </View>
        {/* Bin Option Section */}
          <View style={styles.containerBinOption}>
            <TouchableOpacity style={{flexDirection: 'row',width:'100%'}} onPress={() => this.props.navigation.navigate('BinOption')}>
                <View style={{flex:1, flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                <View style={{width: 70, height: 70}}>
                  <Image
                    style={{width: '100%', height: '100%'}}
                    source={require('../../components/assets/logo/logo.png')}
                  />
                  </View>
                  <Text style={{marginLeft:16,fontSize:14,fontFamily: 'Quicksand-SemiBold'}}>Bin Option</Text>
                </View>
            </TouchableOpacity>
            <View style={{alignItems:'center',marginTop:40}}>
              <Text style={[styles.textContent,{marginBottom:8}]}>Dikembangkan oleh Ridwan</Text>
              <Text style={styles.textContent}>Universitas Nasional</Text>
            </View>
          </View>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    paddingHorizontal: 18,
    paddingTop:18,
    fontFamily: 'Roboto',
    flex:1
  },
  containerBinOption:{
    paddingHorizontal:18,
    paddingTop:32,
    backgroundColor:'#FFF',
    height:210,
    borderTopStartRadius:45,
    borderTopEndRadius:45
  },
  heading1:{
    fontSize:24,
    color:'#FFF',
    fontWeight:'900',
    fontFamily: 'Quicksand-SemiBold'
  },
  heading2:{
    fontSize:16,
    color:'#FFF',
    fontFamily: 'Quicksand-SemiBold'
  },
  textContent:{
    fontSize:14,
    color:'#868686',
    fontFamily: 'Quicksand-Light'
  },
  boxIconTop: {
    width:26,
    height:26,
    backgroundColor:'#fff'
  },
  btn:{
    backgroundColor:'#06EBFE',
    borderRadius:20,
    width:100,
    height:40
  }
});

export default MainScreen;