import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Image, TextInput } from 'react-native'
import { icons, COLORS, FONTS, SIZES, userValidation } from '../../constants'
import { updateUser } from '../../database/backend'
import { auth } from '../../database/firebase-config'
import { signOut } from "firebase/auth";
import { useCasaMaki } from '../context/CasaMakiContext'
import Field from '../components/Field';
import CustomButton from '../components/CustomButton'
import CustomModal from '../components/CustomModal';
import Loader from '../components/Loader';

const ProfilePage = ({ navigation }) => {

    const { user, setUser, textStyles } = useCasaMaki()

    const [name, setName] = useState(null)
    const [email, setEmail] = useState(null)
    const [phone, setPhone] = useState(null)
    const [address, setAddress] = useState(null)

    const [edited, setEdited] = useState(false)

    const { isLoading, setIsLoading } = useCasaMaki()
    const [modalVisible, setModalVisible] = useState(false)
    const [response, setResponse] = useState(null)

    useEffect(() => {
        setName(user?.name)
        setEmail(user?.email)
        setPhone(user?.phone)
        setAddress(user?.address)
    }, [])

    const handleLogout = async () => {
        await signOut(auth).then(() => {

        }).catch((error) => {
            alert(error.message)
        });
    }
    const handleUpdateUser = async () => {

        const validation = userValidation(name, email, phone, address)
        if (validation !== true) {
            setModalVisible(true)
            setResponse(validation)
            return
        }
        setIsLoading(true)
        try {
            await updateUser(name, email, phone, address)
            setUser({
                name: name,
                email: email,
                phone: phone,
                address: address
            })
            setEdited(false)
        }
        catch(e) {
            console.log( 'Catched: ', e )
            setModalVisible(true)
            setResponse(e)
        }
        finally {
            setIsLoading(false)
        }
    }
    const RenderHeader = () => {
        return (
            <View
                style={{
                    padding: SIZES.padding,
                    backgroundColor: 'transparent',
                    justifyContent: 'center',
                }}
            >
                <TouchableOpacity
                    style={{
                        width: 32,
                        height: 32,
                        borderRadius: 16,
                        backgroundColor: COLORS.black,
                        justifyContent: 'center',
                        alignItems: 'center',
                        position:'absolute',
                        top:8,
                        left:12,

                    }}
                    onPress={() => navigation.goBack()}
                >
                    <Image
                        source={icons.backArrow}
                        reziseMode="contain"
                        style={{
                            width: 20,
                            height: 20,
                            tintColor: COLORS.white
                        }}
                    />
                </TouchableOpacity>
                <View style={styles.container}>
                    <Text style={{...textStyles.h2, color:COLORS.primary}}>Perfil</Text>
                </View>
            </View>
        )
    }

    return (
        <>
            {isLoading ? <Loader /> : <></>}
            <CustomModal
                visible={modalVisible}
                setVisible={setModalVisible}
                title={'ERROR'}
                message={response}

            />
            <View
                style={{ flex: 1, backgroundColor: COLORS.black }}
            >
                <RenderHeader />

                <Field
                    title={'Email'}
                    value={email}
                    editable={false}
                />
                <Field
                    title={'Nombre'}
                    value={name}
                    onChange={setName}
                    onEdit={setEdited}
                />

                <Field
                    title={'Telefono'}
                    value={phone}
                    onChange={setPhone}
                    onEdit={setEdited}
                    isNumber={true}
                />

                <Field
                    title={'Direccion'}
                    value={address}
                    onChange={setAddress}
                    onEdit={setEdited}
                />

                <View style={{ ...styles.container, marginTop: 15 }}>
                    <TouchableOpacity
                        onPress={handleLogout}
                        style={[styles.container, styles.button1 ]}
                    >
                        <Text style={[styles.text, textStyles.h4]}>Cerrar Sesión</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        //onPress={handleLogout}
                        style={[styles.container, styles.button2 ]}
                    >
                        <Text style={[styles.text, textStyles.h4]}>Eliminar Cuenta</Text>
                    </TouchableOpacity>

                </View>
                {
                    edited ? <CustomButton
                        text={'Guardar'}
                        action={handleUpdateUser}
                    /> : <></>
                }
            </View>
        </>
    )
}

export default ProfilePage

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection:'row',
    },
    row: {

        position: 'relative',
        marginVertical: 10,
        justifyContent: 'center',
        width: '95%',
        borderBottomWidth: 1,
        borderBottomColor: COLORS.lightGray2,
        paddingHorizontal: SIZES.padding,
        marginHorizontal: SIZES.padding,
    },
    text: {
        color: COLORS.white,
        marginVertical: 5,
    },
    button1:{
        paddingTop:2,
        paddingHorizontal: SIZES.padding*2,
        marginHorizontal:5,
        borderRadius: SIZES.radius/2,
        borderWidth:2,
        borderColor:COLORS.red

    },
    button2:{
        paddingTop:2,
        paddingHorizontal: SIZES.padding*2,
        marginHorizontal:5,
        borderRadius: SIZES.radius/2,
        backgroundColor:COLORS.red,
    }
})