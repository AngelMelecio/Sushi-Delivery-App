import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useRef, useState } from 'react'
import { COLORS, FONTS, icons, SIZES } from '../../constants'
import { useCasaMaki } from '../context/CasaMakiContext'

const Field = ({ title, value, onChange, onEdit, editable=true, isNumber = false }) => {

    const {textStyles} = useCasaMaki()

    const ref = useRef(null);

    function change(t) {
        onEdit && onEdit(true)
        onChange(t)
    }

    return (
        <View style={styles.row}>
            <Text style={[textStyles.body4,styles.text]}>{title}:</Text>
            <TextInput
                ref={ref}
                onChangeText={(t) => change(t)}
                style={[styles.text, FONTS.body4,]}
                value={value}
                selectionColor={COLORS.primary}
                keyboardType={
                    isNumber ? 'number-pad' : 'default'
                }
                editable={editable}
            >
            </TextInput>

            { editable ? <TouchableOpacity
                onPress={() => ref.current.focus()}
                style={{
                    justifyContent: 'center',
                    right: 10,
                    alignItems: 'center',
                    paddingVertical: 10,
                    position: 'absolute'
                }}>
                <Image
                    style={{ alignSelf: 'flex-end', width: 20, height: 20, tintColor: COLORS.white }}
                    resizeMode='cover'
                    source={icons.edit}
                />
            </TouchableOpacity> : <></>}

        </View>
    )
}

export default Field

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
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
    }
})