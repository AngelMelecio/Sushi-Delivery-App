import React, { useState, useEffect, useRef } from 'react'
import {
    View,
    Text,
    Image, TouchableOpacity
} from 'react-native'

import { images, COLORS, FONTS, SIZES } from '../../constants'
import {useCasaMaki} from '../context/CasaMakiContext'

const DishInfo = ({ quantity, item, setQuantity }) => {

    const {textStyles} = useCasaMaki()

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
                        <Text style={{ ...textStyles.h1,  color: COLORS.white }}>-</Text>
                    </TouchableOpacity>
                    <View
                        style={{
                            width: 50,
                            backgroundColor: COLORS.lightGray2,
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <Text style={{ ...textStyles.h2, color: COLORS.white }}>{quantity}</Text>
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
                        <Text style={{...textStyles.h1, color: COLORS.white }}>+</Text>
                    </TouchableOpacity>
                </View>
            </View>
            {/* Name And Description */}
            <View
                style={{
                    width: '100%',
                    alignItems: 'center',
                    padding: SIZES.padding,
                    marginTop: SIZES.padding*2,
                    //backgroundColor: COLORS.red
                }}
            >
                <Text
                    style={{ ...textStyles.h1, marginVertical: 5,color: COLORS.white,}}
                >
                    {item?.name}
                </Text>
                <Text
                    style={{...textStyles.body1, marginVertical: 5,color: COLORS.white,}}
                >
                    {item?.ingredients}
                </Text>
            </View>
        </View>
    )
}

export default DishInfo