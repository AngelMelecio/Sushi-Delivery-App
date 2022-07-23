import React, { useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, SafeAreaView } from 'react-native'
import { icons, COLORS, FONTS, SIZES } from '../../constants'

import {CustomInput, Loader} from '../components'

import {LogIn} from '../../database/backend'

import { useCasaMaki } from '../context/CasaMakiContext'

const LoginPage = ({ navigation }) => {
    
    const [email, setEmail] = useState(undefined)
    const [password, setPassword] = useState(undefined)

    const { isLoading, setIsLoading } = useCasaMaki()


    const handleLogin = async () => {
        setIsLoading(true)
        await LogIn( email,password ) 
        setIsLoading(false)
        setPassword('')
    }

    return (
        <>
            { isLoading && <Loader />}
            <SafeAreaView
                style={{ flex: 1, backgroundColor: COLORS.black }}
            >
                <View
                    style={{
                        width: '100%',
                        height: 50,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <Text style={{ color: COLORS.white, ...FONTS.h3 }} >Inicia Sesión</Text>
                </View>
                <ScrollView
                    contentContainerStyle={{
                        flex: 1,
                        padding: 30,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <Text style={styles.label} >Correo Electrónico</Text>
                    <CustomInput placeholder={'elrubius@gmail.com'} onChange={setEmail} value={email} />

                    <Text style={styles.label} >Contraseña</Text>
                    <CustomInput isPassword={true} onChange={setPassword} value={password} />

                    <TouchableOpacity
                        onPress={handleLogin}
                        style={{
                            backgroundColor: COLORS.primary,
                            ...styles.button
                        }}
                    >
                        <Text style={{ textAlign: 'center', color: COLORS.black, ...FONTS.h3 }} >Ingresar</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => navigation.navigate('Registro')}
                        style={{
                            borderWidth: 1.5,
                            borderColor: COLORS.primary,
                            ...styles.button
                        }}
                    >
                        <Text style={{ textAlign: 'center', fontSize: 20, color: COLORS.white }} >Crear Una Cuenta</Text>
                    </TouchableOpacity>

                </ScrollView>
            </SafeAreaView>
        </>
    )
}

export default LoginPage

const styles = StyleSheet.create({
    label: {
        color: COLORS.white,
        alignSelf: 'flex-start'

    },
    button: {
        width: '100%',
        padding: 10,
        marginVertical: 10,
        borderRadius: 10,
    }
})