import React, { useEffect, useRef } from 'react'
import {
    Text,
    StyleSheet,
    TouchableOpacity, FlatList
} from 'react-native'
import { COLORS, FONTS, SIZES } from '../../constants'

function EmpanizadoOptions({ selected, editOrder, data }) {

    const FlatListRef = useRef(null)

    useEffect(() => {
        FlatListRef.current.scrollToIndex({ animated: true, index: selected })
    }, [selected])

    const Item = ({ title, onPress, styleItem, styleText }) => (
        <TouchableOpacity onPress={onPress} style={ styleItem }>
            <Text style={ styleText }>{title}</Text>
        </TouchableOpacity>
    );

    const _renderItem = ({ item }) => {
        return (
            <Item
                title={item.name}
                item={item}
                onPress={() => editOrder('empanizado', selected === item.id ? {id:null,name:null} : item)}
                styleItem={[
                    styles.item,
                    styles.itemLeft,
                    styles.itemRight,
                    selected === item.id ? styles.itemSelectedColor : styles.itemUnselectedColor
                ]}
                styleText={[
                    styles.itemText,
                    selected === item.id ? styles.textSelectedColor : styles.textUnselectedColor
                ]}
            />
        )
    }
    return (
        <FlatList
            ref={FlatListRef}
            horizontal
            data={data}
            renderItem={_renderItem}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ marginBottom: SIZES.padding }}
        />
    )
}

export default EmpanizadoOptions

const styles = StyleSheet.create({
    item: {
        height: 40,
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
        ...FONTS.body4,
    },
})