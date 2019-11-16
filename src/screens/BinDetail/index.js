import React, { Component } from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity } from 'react-native';
import firebase from 'react-native-firebase'

class BinDetail extends Component {
    constructor(props) {
        super(props)
        this.state = {
            list: []
        }
    }

    componentDidMount() {

        firebase.database().ref('bins').on('value', (data) => {
            if (data.val()) {
                this.setState({ list: data.val() })
                console.log(data.val())
            }
        })
    }

    render() {
        const item = this.props.navigation.getParam('item', null)
        return (
            <View style={{ backgroundColor: '#4eadfe', flex: 1 }}>
                <View style={{ flex: 1 }}>

                    <Text style={{
                        alignSelf: 'center',
                        fontSize: 40,
                        color: '#fff',
                        marginTop: 30,
                    }}>
                        Hay!</Text>
                </View>
                <View style={{
                    height: 507,
                    backgroundColor: '#fff',
                    borderTopStartRadius: 30,
                    borderTopEndRadius: 30,
                    paddingTop: 32,
                    paddingHorizontal: 26
                }}>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={
                            { width: 80, height: 80 }
                        } >
                            <Image style={{ width: '100%', height: '100%' }}
                                source={require('../../components/assets/logo/logo.png')} />
                        </View>
                        <View style={{ marginLeft: 12, justifyContent: 'center', }}>
                            <Text style={[styles.heading2, { marginBottom: 6 }]}>{item.nama_bin}</Text>
                            <Text style={styles.textContent}>{item.alamat_bin}</Text>
                        </View>
                    </View>
                    <View style={{ marginTop: 34 }}>
                        <Text style={[styles.heading2, { marginBottom: 6 }]} >Status</Text>
                        <Text style={[styles.textContent, { marginBottom: 24 }]}>{item.sensor1}%</Text>
                        <Text style={[styles.heading2, { marginBottom: 6 }]} >Terakhir Dibersihkan</Text>
                        <Text style={[styles.textContent, { marginBottom: 24 }]}>2 Jam yang lalu</Text>
                        <Text style={[styles.heading2, { marginBottom: 6 }]} >Task</Text>
                        <Text style={[styles.textContent, { marginBottom: 24 }]}>Segera Dibersihkan</Text>
                    </View>
                    <TouchableOpacity style={[styles.btn, { marginTop: 30, backgroundColor: '#4eadfe', justifyContent: 'center', alignItems: 'center', width: '100%' }]} onPress={() => this.props.navigation.navigate('MainScreen')}>
                        <Text style={[styles.heading2, { fontWeight: 'bold', color: '#fff' }]}>Beranda</Text>
                    </TouchableOpacity>
                    {/* <TouchableOpacity style={{marginTop:25,color:'#e74c3c',justifyContent: 'center',alignItems:'center',width:'100%'}} onPress={() => this.props.navigation.navigate('MainScreen')}>
                        <Text style={[styles.heading2,{fontWeight:'bold',color:'#e74c3c'}]}>Ah Later</Text>
                    </TouchableOpacity> */}
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    heading2: {
        fontSize: 16,
        color: '#424242'
    },
    textContent: {
        fontSize: 14,
        color: '#868686'
    },
    btn: {
        backgroundColor: '#06EBFE',
        borderRadius: 20,
        width: 100,
        height: 50
    }
})
export default BinDetail;