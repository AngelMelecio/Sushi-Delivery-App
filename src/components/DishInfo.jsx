import React, { useState, useEffect, useRef } from 'react'
import {
    View,
    Text,
    Image, TouchableOpacity
} from 'react-native'


import { images, COLORS, FONTS, SIZES } from '../../constants'

const DishInfo = ({ quantity, item, setQuantity }) => {
    return (
        <View style={{ backgroundColor: COLORS.black }}>
            {/* Image And Quantity */}
            <View>
                <Image
                    source={images.sushi}
                    resizeMode='cover'
                    style={{
                        width: '100%',
                        height: SIZES.height * 0.40,
                        justifyContent: 'center'
                    }}
                />
                <View
                    style={{
                        position: 'absolute',
                        bottom: -20,
                        width: SIZES.width,
                        height: 50,
                        justifyContent: 'center',
                        flexDirection: 'row',
                        backgroundColor: 'transparent'
                    }}
                >
                    <TouchableOpacity
                        onPress={() => setQuantity((curr) => curr > 1 ? curr - 1 : curr)}
                        style={{
                            width: 50,
                            backgroundColor: COLORS.lightGray2,
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderTopLeftRadius: 25,
                            borderBottomLeftRadius: 25
                        }}
                    >
                        <Text style={{ ...FONTS.body1, color: COLORS.white }}>-</Text>
                    </TouchableOpacity>
                    <View
                        style={{
                            width: 50,
                            backgroundColor: COLORS.lightGray2,
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <Text style={{ ...FONTS.h2, color: COLORS.white }}>{quantity}</Text>
                    </View>
                    <TouchableOpacity
                        onPress={() => setQuantity((curr) => curr + 1)}
                        style={{
                            width: 50,
                            backgroundColor: COLORS.lightGray2,
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderTopRightRadius: 25,
                            borderBottomRightRadius: 25
                        }}
                    >
                        <Text style={{ ...FONTS.body1, color: COLORS.white }}>+</Text>
                    </TouchableOpacity>
                </View>
            </View>
            {/* Name And Description */}
            <View
                style={{
                    width: '100%',
                    alignItems: 'center',
                    marginTop: 20,
                    padding: SIZES.padding,
                    marginVertical: SIZES.margin,
                    //backgroundColor: COLORS.red
                }}
            >
                <Text
                    style={{
                        ...FONTS.h2,
                        marginVertical: 5,
                        color: COLORS.white,
                    }}
                >
                    {item?.name}
                </Text>
                <Text
                    style={{
                        ...FONTS.body3,
                        marginVertical: 5,
                        color: COLORS.white,
                    }}
                >
                    {item?.ingredients}
                </Text>
            </View>
        </View>
    )
}

export default DishInfo