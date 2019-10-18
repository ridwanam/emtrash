import React from 'react';
import {View, StyleSheet, Image, Text} from 'react-native';

const EditMyBin = ({nameBin, alamatBin}) => {
    return(
        <View style={styles.myBinStyle}>
          <View style={styles.binItem}>
              <View style={{width:50,height:60, backgroundColor:'#ACACAC',marginBottom:24,borderRadius:5,}}></View>
                <View>
                    <Text style={styles.h2}>{nameBin}</Text>
                </View>
                <View>
                    <Text style={styles.h3}>{alamatBin}</Text>
                </View>
                <View style={{alignSelf:'center'}}>
                    <View style={{width:30,height:30,backgroundColor:'gray'}}></View>
              </View>
          </View>
      </View>
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
});


export default  EditMyBin;