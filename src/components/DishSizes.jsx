import React, { useState, useEffect, useRef } from 'react'
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from 'react-native'
import { COLORS, FONTS, SIZES } from '../../constants'

const DishSizes = ({onlyRegular,selected, editOrder}) => {

    const Item = ({ title, onPress, styleItem, styleText }) => {
        return(
            <TouchableOpacity onPress={onPress} style={styleItem}>
                <Text style={styleText}>{title}</Text>
            </TouchableOpacity>
        )
    }

    if (onlyRegular) {
        return (
            <View style={styles.container}>
                <Item
                    title={'Regular'}
                    onPress={()=>editOrder('size','Regular')}
                    styleItem={[
                        styles.item,
                        styles.itemLeft,
                        styles.itemRight,
                        styles.itemSelectedColor
                    ]}
                    styleText={[
                        styles.itemText,
                        styles.textSelectedColor
                    ]}
                >
                </Item>
            </View>
        )
    }
    return (
        <View style={styles.container}>
            <Item
                title={'Regular'}
                onPress={()=>editOrder('size','Regular')}
                styleItem={[
                    styles.itemLeft,
                    styles.item,
                    selected == 'Regular' ? styles.itemSelectedColor : styles.itemUnselectedColor
                ]}
                styleText={[
                    styles.itemText,
                    selected == 'Regular' ? styles.textSelectedColor : styles.textUnselectedColor
                ]}
            >
            </Item>
            <Item
                title={'Zague'}
                onPress={()=>editOrder('size','Zague')}
                styleItem={[
                    styles.itemRight,
                    styles.item,
                    selected == 'Zague' ? styles.itemSelectedColor : styles.itemUnselectedColor
                ]}
                styleText={[
                    styles.itemText,
                    selected == 'Zague' ? styles.textSelectedColor : styles.textUnselectedColor
                ]}
            >
            </Item>
        </View>
    )
}

export default DishSizes

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: COLORS.black
    },
    item: {
        height: SIZES.height * 0.05,
        paddingHorizontal: SIZES.padding,
        marginHorizontal: 5,
        justifyContent: 'center',
    },
    itemLeft: {
        borderTopLeftRadius: SIZES.padding * 2,
        borderBottomLeftRadius: SIZES.padding * 2,
    },
    itemRight: {
        borderTopRightRadius: SIZES.padding * 2,
        borderBottomRightRadius: SIZES.padding * 2,
    },
    itemSelectedColor: {
        backgroundColor: COLORS.primary,
    },
    textSelectedColor: {
        color: COLORS.black,
    },
    itemUnselectedColor: {
        backgroundColor: COLORS.lightGray2,
    },
    textUnselectedColor: {
        color: COLORS.white,
    },
    itemText: {
        textAlign: 'center',
        paddingHorizontal: SIZES.padding * 2,
        ...FONTS.body4
    },

})