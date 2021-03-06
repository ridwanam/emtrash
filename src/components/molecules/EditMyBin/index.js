import React from 'react';
import {View, StyleSheet, Image, Text, TouchableOpacity} from 'react-native';

const EditMyBin = ({nameBin,alamatBin,valueBin,onPress}) =>{
    return(
      <TouchableOpacity  
      onPress={onPress}
      style={valueBin >= 90 ? styles.myBinStyleRed : styles.myBinStyle}>
          <View style={styles.binItem}>
          <View style={{width:60,height:60,marginBottom:24,borderRadius:5,}}>
              <Image
                    style={{width: '100%', height: '100%'}}
                    source={require('../../assets/logo/logo.png')}
                  />
              </View>
                <View>
                    <Text style={valueBin >= 90 ? styles.h2Red : styles.h2}>{nameBin}</Text>
                </View>
                <View>
                    <Text style={valueBin >= 90 ? styles.h3Red : styles.h3}>{alamatBin}</Text>
                </View>
                <View style={{alignSelf:'center'}}>
                    <View style={{width:30,height:30}}>
                    <Image
                    style={{width: '100%', height: '100%'}}
                    source={require('../../assets/logo/ic_rivise.png')}
                  />
                    </View>
                </View>
          </View>
      </TouchableOpacity>
    )
  };

const styles = StyleSheet.create({
    myBinStyle:{
        position: 'relative',
        height:200,
        width:150,
        borderRadius:10,
        backgroundColor:'#fff', 
        marginLeft:18
      },
      myBinStyleRed:{
        position: 'relative',
        height:200,
        width:150,
        borderRadius:10,
        backgroundColor:'#e74c3c',
        color:'#fff',
        marginLeft:18
      },
    binItem:{
        padding: 16,
        height:'100%',
        width:'100%',
        position:'absolute'
    },
    h1:{
        fontSize:18,
        fontWeight:'bold',
        color: "gray",
        marginBottom:8
    },
    h2:{
        fontSize:14,
        fontWeight:'bold',
        color: "gray",
        marginBottom:8
    },
    h3:{
        fontSize:12,
        fontWeight:'normal',
        color: "gray",
        marginBottom:8
    },
    h1Red:{
        fontSize:18,
        fontWeight:'bold',
        color: "white",
        marginBottom:8
    },
    h2Red:{
        fontSize:14,
        fontWeight:'bold',
        color: "white",
        marginBottom:8
    },
    h3Red:{
        fontSize:12,
        fontWeight:'normal',
        color: "white",
        marginBottom:8
    }
});

export default  EditMyBin;
