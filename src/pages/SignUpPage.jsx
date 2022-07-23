import React, { useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView, SafeAreaView } from 'react-native'
import { icons, COLORS, FONTS, SIZES, mailFormat } from '../../constants'
import CustomInput from '../components/CustomInput'
import { StackActions } from '@react-navigation/native';

import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile
} from "firebase/auth";

import { auth, DB, doc, setDoc } from '../../database/firebase-config'

import Loader from '../components/Loader'

import { useCasaMaki } from '../context/CasaMakiContext'

const popAction = StackActions.pop(1);

const SignUpPage = ({ navigation }) => {

    const { isLoading, setIsLoading } = useCasaMaki()

    const [userName, setUserName] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [address, setAddress] = useState("")
    const [password, setPassword] = useState("")
    const [password2, setPassword2] = useState("")

    const handleCreateAccound = async (userName, email, phone, address, password, password2) => {
        
        {/* Input Validation */} 
        if (userName.length < 3) {
            alert("Ingresa un nombre de usuario mas largo!")
            return
        }
        if (!email.match(mailFormat)) {
            alert("Correo electrónico no válido!")
            return
        }
        if (phone.length > 0 && phone.length != 10) {
            alert("Número telefónico no válido!")
            return
        }
        if (password.length < 8) {
            alert("Ingresa 8 caracteres en tu contraseña como minimo!")
            return
        }
        if (password != password2) {
            alert("Las contraseñas no coinciden!")
            return
        }
        {/* Creating User and Saving Profile */}
        setIsLoading(true)
        await createUserWithEmailAndPassword(auth, email.trim(), password)
            .then((userCredential) => {
                const user = userCredential.user
                setDoc(doc(DB, 'userProfile', email),{
                    name: userName,
                    email: email,
                    phone: phone,
                    address: address,
                })

                navigation.goBack()
                //navigation.dispatch(popAction);
                //navigation.replace('HomeScreen')
            })
            .catch((error) => {
                const errorCode = error.code;
                let errorMessage
                if( errorCode === 'auth/email-already-in-use' )
                    errorMessage = 'El Correo Electrónico ya Está en Uso!'
                alert(errorMessage)
                // ..
            })
            .finally(() => { setIsLoading(false) })
    }

    return (
        <>
            {isLoading && <Loader />}
            <SafeAreaView
                style={{
                    flex: 1,
                    backgroundColor: COLORS.black
                }}
            >
                <View
                    style={{
                        position: 'relative',
                        width: '100%',
                        height: 50,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        style={{
                            position: 'absolute',
                            height: 30,
                            width: 30,
                            marginLeft: 10,
                            padding: 10,
                            justifyContent: 'center',
                            alignSelf: 'flex-start'
                        }}
                    >
                        <Image
                            source={icons.backArrow}
                            resizeMode='cover'
                            style={{
                                tintColor: COLORS.white,
                                height: 20,
                                width: 20,
                            }}

                        />
                    </TouchableOpacity>
                    <Text style={{ color: COLORS.white, ...FONTS.h3 }}>Registrate Gratis</Text>
                </View>
                <ScrollView
                    contentContainerStyle={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: 30
                    }}
                >
                    <Text style={styles.label} >Nombre De Usuario:</Text>
                    <CustomInput
                        placeholder={'Abel Garcia'}
                        isName={true}
                        onChange={setUserName}
                        value={userName}
                    />
                    <Text style={styles.label} >E-mail:</Text>
                    <CustomInput
                        placeholder={'elrubius@gmail.com'}
                        onChange={setEmail}
                        isEmail={true}
                        value={email}
                    />
                    <Text style={styles.label} >Num. Celular: (opcional)</Text>
                    <CustomInput
                        placeholder={'445 457 2505'}
                        onChange={setPhone}
                        isNumber={true}
                        value={phone}
                    />
                    <Text style={styles.label} >Dirección: (opcional)</Text>
                    <CustomInput
                        placeholder={'Rio Bravo #105 int. #2'}
                        onChange={setAddress}
                        value={address}
                    />
                    <Text style={styles.label} >Contraseña:</Text>
                    <CustomInput
                        isPassword={true}
                        onChange={setPassword}
                        value={password}
                    />
                    <Text style={styles.label} >Confirmar Contraseña:</Text>
                    <CustomInput
                        isPassword={true}
                        onChange={setPassword2}
                        value={password2}
                    />

                    <TouchableOpacity
                        onPress={() => handleCreateAccound(
                            userName, email, phone, address, password, password2)}
                        style={{ width: '100%', padding: 10, marginTop: 15, borderRadius: 10, backgroundColor: COLORS.primary }}
                    >
                        <Text style={{ textAlign: 'center', fontSize: 20, color: COLORS.black }} >Crear Cuenta</Text>
                    </TouchableOpacity>


                </ScrollView>
            </SafeAreaView>
        </>
    )

}

export default SignUpPage

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        justifyContent: 'center',
        width: '100%',
        height: 45,
        marginVertical: 10,
    },
    label: {
        alignSelf: 'flex-start',
        color: COLORS.white

    }
})