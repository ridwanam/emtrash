import React,{Component} from 'react';
import {View, StyleSheet, Image, Text, TextInput, TouchableOpacity, Alert} from 'react-native';
import firebase from 'react-native-firebase'

class BinDetail extends Component {    
    constructor(props){
        super(props)
        const { navigation } = this.props
        const item = navigation.getParam('item', null)
        this.state = {
          list: [],
          text: '',  
          namaBin: item.nama_bin,
          alamatBin: item.alamat_bin        
        }
      }
  
    handleName = (text) => {
        this.setState({ namaBin: text })
    }
    handleAlamat = (text) => {
        this.setState({ alamatBin: text })
    }
    upadateBin = (namaBin, alamatBin) =>{
      const index = this.props.navigation.getParam('index', null)
      firebase.database().ref('bins/'+index).update({
        nama_bin:namaBin, alamat_bin:alamatBin})
        Alert.alert(
          'Update Data Berhasil!',
          'Data tempat sampah anda berhasil diubah',
          [            
            {text: 'OK', onPress: () => this.props.navigation.goBack()},
          ],
          {cancelable: false},
        );
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
      const { namaBin, alamatBin} = this.state
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
                        <View style={{width:80,height:80}}
                        >
                          <Image
                          style={{width: '100%', height: '100%'}}
                          source={require('../../components/assets/logo/logo.png')}
                        />
                        </View>
                        <View style={{marginLeft:12,justifyContent: 'center',}}>
                            <Text style={[styles.heading2,{marginBottom:6}]}>{namaBin}</Text>
                            <Text style={styles.textContent}>{alamatBin}</Text>
                        </View>
                    </View>                                 
                    <View style={{marginTop:34}}>
                      <TextInput style = {[styles.input,{marginBottom: 16}]}
                        underlineColorAndroid = "transparent"
                        value = {namaBin}
                        placeholderTextColor = "#ACACAC"
                        autoCapitalize = "words"
                        onChangeText = {this.handleName}
                        />
                        <TextInput style = {styles.input}
                        underlineColorAndroid = "transparent"
                        value = {alamatBin}
                        placeholderTextColor = "#ACACAC"
                        autoCapitalize = "words"
                        onChangeText = {this.handleAlamat}
                        />
                    </View>
                    <TouchableOpacity style={[styles.btn,{marginTop:30,backgroundColor:'#4eadfe',justifyContent: 'center',alignItems:'center',width:'100%'}]} 
                       onPress = {
                          () => this.upadateBin(this.state.namaBin, this.state.alamatBin)
                        }>
                        <Text style={[styles.heading2,{fontWeight:'bold',color:'#fff'}]}>Save</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{marginTop:25,color:'#e74c3c',justifyContent: 'center',alignItems:'center',width:'100%'}} onPress={() => this.props.navigation.navigate('BinOption')}>
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
    color:'#424242',
    fontFamily: 'Quicksand-SemiBold'
  },
  textContent:{
    fontSize:14,
    color:'#868686',
    fontFamily: 'Quicksand-Light'
  },
  btn:{
    backgroundColor:'#06EBFE',
    borderRadius:20,
    width:100,
    height:50
  },
  input: {    
    height: 50,
    borderColor: '#ACACAC',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 8
 }
})

export default BinDetail;