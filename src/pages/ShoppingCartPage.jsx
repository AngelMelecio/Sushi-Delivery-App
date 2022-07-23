import React, { useEffect, useState } from 'react'
import { FlatList, View, Text, Image, SafeAreaView,TouchableOpacity } from 'react-native'
import { COLORS, SIZES } from '../../constants'
import { useCasaMaki } from '../context/CasaMakiContext'

const ShoppingCartPage = () => {

    const { getCartItems, removeCartItem } = useCasaMaki()
    let cartItems = getCartItems()

    const cartItem = ({ item, index }) => {
        return (
            <View style={{ 
                    marginVertical: 7, 
                    backgroundColor:COLORS.lightGray2,
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
                            <Text style={{ color: COLORS.white }}>{item.name}</Text>
                            <Text style={{ color: COLORS.white }}> x{item.quantity}</Text>
                        </View>
                        <Text style={{ color: COLORS.white }}>Tamaño: {item.size}</Text>

                        {item.empanizado.id !== null &&
                            <Text style={{ color: COLORS.white }}>Empanizado: {item.empanizado.name}</Text>}
                    </View>
                    <View style={{flexDirection:'row', alignItems:'center',}}>
                        <Text style={{ color: COLORS.white }}> 
                            $ {(item.quantity * item.price 
                            + (item.empanizado.id !== null ? (9*item.quantity) : 0)).toFixed(2)} 
                        </Text>
                        <TouchableOpacity 
                            onPress ={ () => removeCartItem(index) }
                            style={{
                                backgroundColor: COLORS.red,
                                marginLeft:10, 
                                paddingHorizontal:14,
                                paddingVertical:7, 
                                borderRadius:5
                            }}>
                            <Text style={{color: COLORS.white,}}>x</Text>
                        </TouchableOpacity>
                    </View>
                </View>


            </View>
        )
    }
    return (
        <SafeAreaView
            style={{
                flex: 1,
                backgroundColor: COLORS.black,
            }}
        >
            <FlatList
                data={cartItems}
                renderItem={cartItem}
                contentContainerStyle={{ paddingHorizontal: 10 }}
            />
        </SafeAreaView>
    )
}

export default ShoppingCartPage