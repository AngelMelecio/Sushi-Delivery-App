import React, { useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView, SafeAreaView } from 'react-native'
import { icons, COLORS, FONTS, SIZES, userValidation } from '../../constants'
import CustomInput from '../components/CustomInput'
import { StackActions } from '@react-navigation/native';

import Loader from '../components/Loader'

import { useCasaMaki } from '../context/CasaMakiContext'
import { SignUp } from '../../database/backend';
import CustomModal from '../components/CustomModal';

const popAction = StackActions.pop(1);

const SignUpPage = ({ navigation }) => {

    const { isLoading, setIsLoading, textStyles } = useCasaMaki()

    const [userName, setUserName] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [address, setAddress] = useState("")
    const [password, setPassword] = useState("")
    const [password2, setPassword2] = useState("")

    const [modalVisible, setModalVisible] = useState(false)
    const [response, setResponse] = useState(null)

    const handleCreateAccound = async (userName='', email='', phone='', address='', password='', password2='') => {
        
        {/* Input Validation */} 
        const validation = userValidation(userName, email, phone, address, password, password2)
        if( validation !== true ){
            
            setModalVisible(true)
            setResponse(validation)
            return
        }
        {/* Creating User and Saving Profile */}
        setIsLoading(true)
        
        try{
            await SignUp( userName, email, phone, address, password )
            
        }catch(e){
            console.log( 'cachamos:',e )
            setModalVisible(true)
            setResponse(e)
        }
        setIsLoading(false)
    }

    return (
        <>
            <CustomModal
                visible={modalVisible}
                setVisible={setModalVisible}
                title={'ERROR'}
                message={response?response:''}
            />
            {isLoading ? <Loader /> : <></>}
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
                    <Text style={{ ...textStyles.h2, color: COLORS.primary }}>Registrate Gratis</Text>
                </View>
                <ScrollView
                    contentContainerStyle={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: 30
                    }}
                >
                    <Text style={[textStyles.body3,styles.label]} >Nombre De Usuario:</Text>
                    <CustomInput
                        placeholder={'Abel Garcia'}
                        isName={true}
                        onChange={setUserName}
                        value={userName}
                    />
                    <Text style={[textStyles.body3,styles.label]} >E-mail:</Text>
                    <CustomInput
                        placeholder={'elrubius@gmail.com'}
                        onChange={setEmail}
                        isEmail={true}
                        value={email}
                    />
                    <Text style={[textStyles.body3,styles.label]} >Num. Celular: (opcional)</Text>
                    <CustomInput
                        placeholder={'445 457 2505'}
                        onChange={setPhone}
                        isNumber={true}
                        value={phone}
                    />
                    <Text style={[textStyles.body3,styles.label]} >Dirección: (opcional)</Text>
                    <CustomInput
                        placeholder={'Rio Bravo #105 int. #2'}
                        onChange={setAddress}
                        value={address}
                    />
                    <Text style={[textStyles.body3,styles.label]} >Contraseña:</Text>
                    <CustomInput
                        isPassword={true}
                        onChange={setPassword}
                        value={password}
                    />
                    <Text style={[textStyles.body3,styles.label]} >Confirmar Contraseña:</Text>
                    <CustomInput
                        isPassword={true}
                        onChange={setPassword2}
                        value={password2}
                    />

                    <TouchableOpacity
                        onPress={() => handleCreateAccound(
                            userName, email, phone, address, password, password2)}
                        style={{ width: '100%', padding: 5, marginTop: 15, borderRadius: 10, backgroundColor: COLORS.primary }}
                    >
                        <Text style={{ ...textStyles.h4, textAlign: 'center', color: COLORS.black }} >Crear Cuenta</Text>
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