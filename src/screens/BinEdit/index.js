import React,{Component} from 'react';
import {View, StyleSheet, Image, Text, TextInput, TouchableOpacity} from 'react-native';
import firebase from 'react-native-firebase'

class BinDetail extends Component {    
    constructor(props){
        super(props)
        this.state = {
          list: [],
          text: ''
        }
      }
    
      componentDidMount() {
    
        firebase.database().ref('bins').on('value', (data) => {
          if (data.val())
          {
            this.setState({list:data.val()})
            console.log(data.val())
          }
        })
      }

    render(){      
      const item = this.props.navigation.getParam('item', null)
        return(
            <View style={{backgroundColor:'#4eadfe',flex:1}}>
              <View style={{flex:1}}>
                
                <Text style={{
                  alignSelf:'center',
                  fontSize:20,
                  color:'#fff',
                  marginTop:32,                  
                }}>
                  Hello my hero!</Text>
                  <Text style={{
                  alignSelf:'center',
                  textAlign: 'center',
                  paddingHorizontal:16,
                  fontSize:16,
                  color:'#fff',
                  marginTop:16,                  
                }}>
                  Don't forget to pay attention to the location of your Smart Bin</Text>
              </View>
              <View style={{
                  height:507,                  
                  backgroundColor:'#fff',
                  borderTopStartRadius:30,
                  borderTopEndRadius:30,
                  paddingTop:16,
                  paddingHorizontal:26}}>
                    <View style={{flexDirection:'row'}}>
                        <View style={{width:80,height:80,backgroundColor:'gray'}}></View>
                        <View style={{marginLeft:12,justifyContent: 'center',}}>
                            <Text style={[styles.heading2,{marginBottom:6}]}>{item.nama_bin}</Text>
                            <Text style={styles.textContent}>{item.alamat_bin}</Text>
                        </View>
                    </View>    
                    <TextInput                
                    >
                      </TextInput>               
                    <View style={{marginTop:34}}>
                      <Text style={[styles.heading2,{marginBottom:6}]} >Status</Text>
                      <Text style={[styles.textContent, {marginBottom:24}]}>{item.sensor1}%</Text>
                      <Text style={[styles.heading2,{marginBottom:6}]} >Terakhir Dibersihkan</Text>
                      <Text style={[styles.textContent, {marginBottom:24}]}>2 Jam yang lalu</Text>
                      <Text style={[styles.heading2,{marginBottom:6}]} >Task</Text>
                      <Text style={[styles.textContent, {marginBottom:24}]}>Segera Dibersihkan</Text>
                    </View>
                    <TouchableOpacity style={[styles.btn,{marginTop:30,backgroundColor:'#4eadfe',justifyContent: 'center',alignItems:'center',width:'100%'}]} onPress={() => this.props.navigation.navigate('MainScreen')}>
                        <Text style={[styles.heading2,{fontWeight:'bold',color:'#fff'}]}>Save</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{marginTop:25,color:'#e74c3c',justifyContent: 'center',alignItems:'center',width:'100%'}} onPress={() => this.props.navigation.navigate('MainScreen')}>
                        <Text style={[styles.heading2,{fontWeight:'bold',color:'#e74c3c'}]}>Discard</Text>
                    </TouchableOpacity>
              </View>
            </View>
        )
    }

}

const styles = StyleSheet.create({
  heading2:{
    fontSize:16,
    color:'#424242'
  },
  textContent:{
    fontSize:14,
    color:'#868686'
  },
  btn:{
    backgroundColor:'#06EBFE',
    borderRadius:20,
    width:100,
    height:50
  }
})

export default BinDetail;