import React, { useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, SafeAreaView } from 'react-native'
import { COLORS } from '../../constants'

import { CustomInput, Loader } from '../components'

import { LogIn } from '../../database/backend'

import { useCasaMaki } from '../context/CasaMakiContext'
import CustomModal from '../components/CustomModal'

const LoginPage = ({ navigation }) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { isLoading, setIsLoading, textStyles } = useCasaMaki()

    const [modalVisible, setModalVisible] = useState(false)
    const [response, setResponse] = useState(null)

    const handleLogin = async () => {
        setIsLoading(true)
        try {
            await LogIn(email, password)
        } catch (e) {
            setModalVisible(true)
            setResponse(e)
        } finally {
            setIsLoading(false)
            setPassword('')
        }
    }

    return (
        <>
            <CustomModal
                visible={modalVisible}
                setVisible={setModalVisible}
                title={'ERROR'}
                message={response}

            />
            {isLoading && <Loader />}
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
                    <Text style={{ ...textStyles.h2,color: COLORS.primary }} >Inicia Sesión</Text>
                </View>
                <ScrollView
                    contentContainerStyle={{
                        flex: 1,
                        padding: 30,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <Text style={[textStyles.body3, styles.label]} >Correo Electrónico</Text>
                    <CustomInput placeholder={'elrubius@gmail.com'} onChange={setEmail} value={email} />

                    <Text style={[textStyles.body3, styles.label]} >Contraseña</Text>
                    <CustomInput isPassword={true} onChange={setPassword} value={password} />

                    <TouchableOpacity
                        onPress={handleLogin}
                        style={{
                            backgroundColor: COLORS.primary,
                            ...styles.button
                        }}
                    >
                        <Text style={{ ...textStyles.h4, textAlign: 'center', color: COLORS.black }} >Ingresar</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => navigation.navigate('Registro')}
                        style={{
                            borderWidth: 1.5,
                            borderColor: COLORS.primary,
                            ...styles.button
                        }}
                    >
                        <Text style={{ ...textStyles.h4, textAlign: 'center', color: COLORS.white }} >Crear Una Cuenta</Text>
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
        alignSelf: 'flex-start',
        marginTop: 5,
    },
    button: {
        width: '100%',
        padding: 8,
        marginVertical: 10,
        borderRadius: 10,
    }
})