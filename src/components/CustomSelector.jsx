import React, { useState, useEffect, useRef } from 'react'
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    FlatList,
} from 'react-native'
import { COLORS, FONTS, SIZES } from '../../constants'

const CustomSelector = ({ data, selected, setSelected }) => {

    if (data?.length === 1) {
        return (
            <View style={[styles.itemUnique]}>
                <Text style={[styles.textSelected, styles.textBold]}>{data[0].name}</Text>
                {data[0].info && <Text style={styles.textSelected} >${data[0].info}</Text>}
            </View>
        )
    }
    if (data?.length === 2) {
        return (
            <View style={{ justifyContent: 'center', flexDirection: 'row' }}>
                <TouchableOpacity
                    onPress={() => setSelected(0)}
                    style={[
                        styles.itemCenter,
                        styles.leftRadius,
                        styles.width,
                        selected === 0 ? styles.itemSelected : styles.itemUnSelected
                    ]}
                >
                    <Text style={[selected === 0 ? styles.textSelected : styles.textUnSelected, styles.textBold]}>
                        {data[0].name}
                    </Text>
                    {
                        data[0].info &&
                        <Text style={selected === 0 ? styles.textSelected : styles.textUnSelected}>
                            ${data[0].info}
                        </Text>
                    }
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => setSelected(1)}
                    style={[
                        styles.itemCenter,
                        styles.rightRadius,
                        styles.width,
                        selected === 1 ? styles.itemSelected : styles.itemUnSelected
                    ]}
                >
                    <Text style={[selected === 1 ? styles.textSelected : styles.textUnSelected, styles.textBold]}>
                        {data[1].name}
                    </Text>
                    {
                        data[1].info &&
                        <Text style={selected === 1 ? styles.textSelected : styles.textUnSelected} >
                            ${data[1].info}
                        </Text>
                    }
                </TouchableOpacity>
            </View>
        )
    }
    const FlatListRef = useRef(null)

    useEffect(() => {
        data &&
            FlatListRef.current.scrollToIndex({ animated: true, index: selected ? selected : null })
    }, [selected])


    const _renderItem = ({ item }) => {
        return (
            <TouchableOpacity
                onPress={() => setSelected((curr) => item.index === curr ? null : item.index)}
                style={[
                    styles.itemCenter,
                    styles.rightRadius,
                    styles.leftRadius,
                    item.index === selected ? styles.itemSelected : styles.itemUnSelected,
                ]}
            >
                <Text style={[selected === item.index ? styles.textSelected : styles.textUnSelected,
                styles.textBold]}>
                    {item.name}
                </Text>
                {item.info && <Text style={styles.textSelected} >{item.info}</Text>}
            </TouchableOpacity>

        )
    }
    return (
        <FlatList
            ref={FlatListRef}
            horizontal
            data={data}
            renderItem={_renderItem}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ height: SIZES.height * 0.07 }}
        />
    )

}

export default CustomSelector

const styles = StyleSheet.create({
    itemCenter: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: SIZES.padding,
        paddingHorizontal: SIZES.padding * 2,
        marginHorizontal: 5,
        //width: SIZES.width * 0.25
    },
    itemUnique: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: SIZES.padding,
        marginHorizontal: 5,
        width: SIZES.width * 0.25,
        borderRadius: SIZES.radius,
        backgroundColor: COLORS.primary,
    },
    leftRadius: {
        borderTopLeftRadius: SIZES.radius,
        borderBottomLeftRadius: SIZES.radius,
    },
    rightRadius: {
        borderTopRightRadius: SIZES.radius,
        borderBottomRightRadius: SIZES.radius,
    },
    itemSelected: {
        backgroundColor: COLORS.primary,
    },
    itemUnSelected: {
        backgroundColor: COLORS.lightGray2,
    },
    width: {
        width: SIZES.width * 0.30
    },
    textSelected: {
        ...FONTS.h4,
        marginVertical: 2.5,
        color: COLORS.black
    },
    textUnSelected: {
        ...FONTS.h4,
        marginVertical: 2.5,
        color: COLORS.white
    },
    textBold: {
        ...FONTS.bold
    }
})