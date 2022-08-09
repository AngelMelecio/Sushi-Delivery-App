import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS, FONTS, SIZES } from '../../constants'
import { useCasaMaki } from '../context/CasaMakiContext'

const ChatMessage = ({ text, sender, time }) => {
    const { textStyles, user } = useCasaMaki()
    return (
        <View style={[styles.container, sender === user.email ? styles.right : styles.left]} >
            <View style={[sender === user.email ? styles.cornerUpR : styles.cornerUpL]}></View>
            <View style={[sender === user.email ? styles.ColorRight : styles.ColorLeft, styles.content]} >
                <Text
                    style={[
                        FONTS.body4,
                        sender === user.email ? styles.textColorRight : styles.textColorLeft
                    ]}
                >{text}
                </Text>
            </View>
            <View style={styles.corner}>
                <Text style={{ ...textStyles.body6, color: COLORS.white }}>{time}</Text>
            </View>
        </View>
    )
}

export default ChatMessage

const styles = StyleSheet.create({
    container: {
        maxWidth: '90%',
        marginVertical: 5,
    },
    content: {
        maxWidth: '80%',
        paddingVertical: SIZES.padding / 1.2,
        paddingHorizontal: SIZES.padding * 1.3,
        justifyContent: 'center',
        alignItems: 'center',

    },
    right: {
        flexDirection: 'row-reverse',
        alignSelf: 'flex-end'
    },
    left: {
        flexDirection: 'row'
    },
    ColorRight: {
        backgroundColor: COLORS.secondary,
        borderRadius: 18,
        borderTopRightRadius: 0,
    },
    ColorLeft: {
        backgroundColor: COLORS.lightGray2,
        borderRadius: 18,
        borderTopLeftRadius: 0,
    },
    textColorRight: {
        color: COLORS.black
    },
    textColorLeft: {
        color: COLORS.white
    },
    corner: {
        paddingHorizontal: 5,
        justifyContent: 'flex-end'
    },
    cornerUpR: {
        width: 0,
        height: 0,
        backgroundColor: "transparent",
        borderStyle: "solid",
        borderRightWidth: 8,
        borderTopWidth: 12,
        borderRightColor: "transparent",
        borderTopColor: COLORS.secondary,
        borderTopRightRadius: 3,

    },
    cornerUpL: {
        width: 0,
        height: 0,
        backgroundColor: "transparent",
        borderStyle: "solid",
        borderLeftWidth: 8,
        borderTopWidth: 12,
        borderRightColor: "transparent",
        borderTopColor: COLORS.lightGray2,
        borderTopLeftRadius: 3,
    }
})