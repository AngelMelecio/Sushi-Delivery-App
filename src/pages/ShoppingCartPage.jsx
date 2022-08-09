import React, { useEffect, useState } from 'react'
import { FlatList, View, Text, Image, SafeAreaView, TouchableOpacity, ScrollView, StyleSheet } from 'react-native'
import { COLORS, SIZES, FONTS, icons } from '../../constants'
import CustomButton from '../components/CustomButton'
import CustomSelector from '../components/CustomSelector'
import Loader from '../components/Loader'
import Field from '../components/Field'
import { useCasaMaki } from '../context/CasaMakiContext'
import { createOrder, writeChat, setActive } from '../../database/backend'

const ShoppingCartPage = ({ navigation }) => {

    const {
        getCartItems,
        removeCartItem,
        clearCart,
        getCartTotal,
        user,
        textStyles,
        isLoading,
        setIsLoading,
        setActiveOrder,
    } = useCasaMaki()

    let cartItems = getCartItems()

    const [address, setAddress] = useState('')
    const [phone, setPhone] = useState('')
    const [comment, setComment] = useState('')
    const [orderType, setOrderType] = useState(0)

    useEffect(() => {
        setAddress(user.address)
        setPhone(user.phone)
    }, [user])

    const handleCreateOrder = async () => {
        setIsLoading(true)
        let email = user.email
        // Write the user comments in the chat and a default message from the server
        if (comment.trim().length > 0)
            await writeChat(email, email, comment)


        
        const serverMessage = cartItems.reduce((string, i) => {
            return string + (
                '\n\n'
                + i.name
                + ' x' + i.quantity
                + '\nTamaño: ' + i.size
                + (i.empanizado ? '\nEmpanizado: ' + i.empanizado : '')
                )
            }, '')
            await writeChat('admin@gmail.com', email,
            'Gracias por tu compra!! En este momento estamos procesando tu orden:'
            + serverMessage 
            + '\nTotal: $' + getCartTotal().toFixed(2) )

        // Create order and setting it active
        await createOrder(user, cartItems, getCartTotal() )
        setActiveOrder(true)
        clearCart()
        setIsLoading(false)
        navigation.jumpTo('Orden', { isOrder: true })
    }

    const cartItem = ({ item, index }) => {
        return (
            <View
                style={{
                    marginVertical: 7,
                    backgroundColor: COLORS.lightGray2,
                    padding: SIZES.padding,
                    borderRadius: 15
                }}>
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        width: '100%',
                    }}
                >
                    <View >
                        <View
                            style={{
                                flexDirection: 'row',
                            }}
                        >
                            {/* Circular Image */}
                            <Text style={{ ...textStyles.body4, color: COLORS.white }}>{item.name}</Text>
                            <Text style={{ ...textStyles.body5, color: COLORS.white }}> x{item.quantity}</Text>
                        </View>
                        <Text style={{ ...textStyles.body5, color: COLORS.white, }}>Tamaño: {item.size}</Text>

                        {item.empanizado !== null &&
                            <Text style={{ ...textStyles.body5, color: COLORS.white, }}>Empanizado: {item.empanizado}</Text>}
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                        <Text style={{ ...textStyles.body3, color: COLORS.white, }}>
                            $ {item.total}
                        </Text>
                        <TouchableOpacity
                            onPress={() => removeCartItem(index)}
                            style={styles.img}>
                            <Image
                                source={icons.trash}
                                resizeMode='cover'
                                style={{
                                    tintColor: COLORS.white,
                                    height: 19,
                                    width: 19,
                                }}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
    return (
        <>
            {isLoading && <Loader />}
            <SafeAreaView
                style={{
                    flex: 1,
                    backgroundColor: COLORS.black,
                }}
            >
                <Text style={[textStyles.h3, styles.txt]}>Detalles de la Orden</Text>
                <View style={{ maxHeight: SIZES.height * 0.30 }}>
                    <FlatList
                        data={cartItems}
                        renderItem={cartItem}
                        contentContainerStyle={{ paddingHorizontal: 10 }}
                    />
                </View>
                {
                    cartItems.length > 0 ?
                        <CustomButton
                            action={handleCreateOrder}
                            text={'Ordenar'}
                            total={getCartTotal()}
                        />
                        : <></>
                }
                <ScrollView style={{ paddingVertical: SIZES.padding, marginBottom: SIZES.padding * 8 }}>
                    <Text style={[textStyles.h3, styles.txt]}>Datos de Entrega</Text>
                    <CustomSelector
                        data={[
                            { index: 0, name: 'Entrega a Domicilio' },
                            { index: 1, name: 'Pasar a Recoger' },
                        ]}
                        selected={orderType}
                        setSelected={setOrderType}
                    />
                    {orderType === 0 ? <Field
                        title={'Domicilio'}
                        value={address}
                        onChange={setAddress}
                    /> : <></>}
                    <Field
                        title={'Telefono'}
                        value={phone}
                        onChange={setPhone}
                        isNumber={true}
                    />
                    <Field
                        title={'Comentarios u Alergias'}
                        value={comment}
                        onChange={setComment}
                    />

                </ScrollView>
            </SafeAreaView>
        </>
    )
}

export default ShoppingCartPage

const styles = StyleSheet.create({
    txt: {
        textAlign: 'center',
        color: COLORS.white,
        marginVertical: SIZES.padding / 2,
    },
    img: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.red,
        marginLeft: 10,
        padding: 8,
        borderRadius: 10
    }
}) 