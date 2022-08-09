import { connectFirestoreEmulator } from 'firebase/firestore'
import React, { useState, useEffect, useRef } from 'react'
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    FlatList,
} from 'react-native'
import { COLORS, FONTS, SIZES } from '../../constants'
import {useCasaMaki} from '../context/CasaMakiContext'


const CustomSelector = ({ data, selected, setSelected }) => {
    const {textStyles} = useCasaMaki()

    if (data?.length === 1) {
        return (
            <View style={{ justifyContent: 'center', flexDirection: 'row' }}>
                <View style={[styles.itemUnique]}>
                    <Text style={[ textStyles.body1, styles.textSelected ]}>{data[0].name}</Text>
                    {data[0].info && <Text style={[textStyles.body2,styles.textSelected]} >${data[0].info}</Text>}
                </View>
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
                    <Text style={[textStyles.body1, selected === 0 ? styles.textSelected : styles.textUnSelected]}>
                        {data[0].name}
                    </Text>
                    {
                        data[0].info &&
                        <Text style={[ textStyles.body2, selected === 0 ? styles.textSelected : styles.textUnSelected,]}>
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
                    <Text style={[textStyles.body1,selected === 1 ? styles.textSelected : styles.textUnSelected]}>
                        {data[1].name}
                    </Text>
                    {
                        data[1].info &&
                        <Text style={[textStyles.body2,selected === 1 ? styles.textSelected : styles.textUnSelected]} >
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
                textStyles.body2]}>
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
        paddingHorizontal: SIZES.padding * 2,
        marginHorizontal: 5,
        paddingBottom: 5,
        //width: SIZES.width * 0.25
    },
    itemUnique: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: SIZES.padding/2,
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
        minWidth: SIZES.width*0.30
    },
    textSelected: {
        color: COLORS.black
    },
    textUnSelected: {
        color: COLORS.white
    },

})