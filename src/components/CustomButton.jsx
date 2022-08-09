import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { COLORS, FONTS, SIZES } from '../../constants'
import { useCasaMaki } from '../context/CasaMakiContext'

const CustomButton = ({ action, text, total = null }) => {
    const { textStyles } = useCasaMaki()
    return (
        <TouchableOpacity
            onPress={action}
            style={{
                position: 'absolute',
                width: '80%',
                bottom: 20,
                left: SIZES.width * 0.1,
                padding: SIZES.padding,
                borderRadius: SIZES.radius,
                backgroundColor: COLORS.primary,
                justifyContent: 'center',
            }}
        >
            <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                <Text
                    style={{
                        ...textStyles.h2,
                        textAlign: 'center',
                        color: COLORS.black,
                    }}
                >
                    {text}
                </Text>
                {total ? <Text
                    style={{
                        paddingTop:3,
                        ...textStyles.h4,
                        textAlign: 'center',
                        color: COLORS.green
                    }}
                >
                    ${total.toFixed(2)} </Text> : <></>}
            </View>
        </TouchableOpacity>
    )
}

export default CustomButton

const styles = StyleSheet.create({})