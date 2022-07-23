import React, { useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet} from 'react-native'
import { icons, COLORS, FONTS, SIZES } from '../../constants'
import { auth } from '../../database/firebase-config'
import { signOut } from "firebase/auth";
import {useCasaMaki} from '../context/CasaMakiContext'

const ProfilePage = ({navigation}) => {

    const {user} = useCasaMaki()

    const handleLogout = async() => {
        await signOut(auth).then(() => {
          
        }).catch((error) => {
            alert(error.message)
        });
    }

    return (
        <View
            style={{ flex: 1, backgroundColor: COLORS.black }}
        >
            <View style={styles.container}>
                <View 
                    style={{
                        height:150,
                        width:150,
                        borderRadius:75,
                        backgroundColor:COLORS.primary
                    }}
                >
                </View>
                <Text style={{color:COLORS.white, marginVertical:15, ...FONTS.h2}}>{user?.name}</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.text}>Email:</Text>
                <Text style={[styles.text, FONTS.body4]}>{user?.email}</Text>
            </View>
        
            <View style={styles.row}>
                <Text style={styles.text}>Telefono:</Text>
                <Text style={[styles.text, FONTS.body4]}>{user?.phone}</Text>
            </View>
        
            <View style={styles.row}>
                <Text style={styles.text}>Direccion:</Text>
                <Text style={[styles.text, FONTS.body4]}>{user?.address}</Text>
            </View>
            <View style={{...styles.container, marginTop:30}}>
                <TouchableOpacity
                    onPress={handleLogout}
                    style={{...styles.container, backgroundColor:COLORS.red, width:80,borderRadius:15}}
                >
                    <Text style={[styles.text, FONTS.h2]}>Salir</Text>
                </TouchableOpacity>

            </View>
        </View>
    )
}

export default ProfilePage

const styles = StyleSheet.create({
    container:{
        justifyContent:'center',
        alignItems:'center',
    },
    row:{
        marginHorizontal:15,
        marginVertical:5,
        //width: '100%',
        paddingHorizontal:SIZES.padding,
        justifyContent:'space-between',
        borderWidth:1,
        borderColor: COLORS.black,
        borderBottomColor: COLORS.lightGray2
        
    },
    text:{
        color: COLORS.white,
        marginVertical:5,
    }
})