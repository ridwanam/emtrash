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
import EditMyBin from '../../components/molecules/EditMyBin'
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
        // const datas = []
        // Object.values(data.val()).forEach(o => datas.push({
        //   alamat_bin: o.alamat_bin,
        //   nama_bin: o.nama_bin,
        //   sensor1: o.sensor1,
        // }))
        this.setState({list:data.val()})
        console.log(data.val())
      }
    })
  }

  render(){
    return (
        <View style={{flex:1,backgroundColor: '#4eadfe'}}>
          <View style={styles.container}>
          <View style={{flexDirection:'row',justifyContent:'flex-end'}}>
            <View style={[styles.boxIconTop,{marginRight:18}]}></View>
            <View style={styles.boxIconTop}></View>
          </View>
          <View style={{marginTop:24,marginBottom:36}}>
            <Text style={styles.heading2}>You're in</Text>
            <Text style={styles.heading1}>Bin Option</Text>
          </View>
          <Text style={styles.heading2}>My Bin</Text>

          
          {/* My Bin Section */}
          <View>
          <FlatList 
              contentContainerStyle={{marginTop:16,marginBottom:24,marginHorizontal:-18}}
              showsHorizontalScrollIndicator={false}
              horizontal
              data={this.state.list}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({item}) =>  
              <EditMyBin 
                nameBin={item.nama_bin}
                alamatBin={item.alamat_bin}
              />}                
            />  
         <Text style={[styles.textQuote,{marginTop:48}]}>
          Just select your smart bin and Boom! you just edited
          </Text>
          </View>
        </View>
        {/* Bin Option Section */}
          <View style={styles.containerBinOption}>
            <View style={{alignItems:'center'}}>
              <TouchableOpacity style={[styles.btn,{backgroundColor:'#06ebfe',justifyContent: 'center',alignItems:'center',width:'100%'}]} onPress={() => this.props.navigation.navigate('MainScreen')}>
                  <Text style={styles.heading2}>Home</Text>
              </TouchableOpacity>
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
    height:100,
    borderTopStartRadius:35,
    borderTopEndRadius:35
  },
  heading1:{
    fontSize:24,
    color:'#FFF',
    fontWeight:'bold'
  },
  heading2:{
    fontSize:16,
    color:'#FFF'
  },
  textContent:{
    fontSize:14,
    color:'#868686'
  },
  textQuote:{
    fontSize:18,
    textAlign:'center',
    color:'#FFF',
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
    height:50
  }
});

export default MainScreen;