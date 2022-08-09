import React, { useState, useEffect } from 'react'
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    Image, TouchableOpacity, ScrollView
} from 'react-native'
import { icons, COLORS, FONTS, SIZES } from '../../constants'
import { useCasaMaki } from '../context/CasaMakiContext'
import empanizados from '../data/empanizados.js'

import DishInfo from '../components/DishInfo'
import CustomSelector from '../components/CustomSelector'
import CustomButton from '../components/CustomButton'

const DishPage = ({ route, navigation }) => {


    const { addCartitem, textStyles, activeOrder } = useCasaMaki()

    const [DishObj, setDishObj] = useState(null)

    const [quantity, setQuantity] = useState(1)
    const [size, setSize] = useState(0)
    const [empanizado, setEmpanizado] = useState(null)
    const [total, setTotal] = useState(0)


    const handleAddToCart = () => {
        addCartitem({
            name: DishObj.name,
            quantity: quantity,
            size: DishObj.sizes[size].name,
            empanizado: empanizado !== null ? empanizados[empanizado].name : null,
            total: total,
        })
        
        navigation.navigate('Carrito')
    }

    useEffect(() => {
        let { item } = route.params;
        setDishObj(item)
        setTotal( item.sizes[0].info )
    }, [])

    useEffect(() => {
        DishObj && (
            setTotal(
                (quantity * DishObj.sizes[size].info
                    + (empanizado !== null ? (9 * quantity) : 0))
            )
        )
    }, [quantity, size, empanizado])


    const RenderHeader = () => {

        return (
            <View
                style={{
                    position: 'absolute',
                    padding: SIZES.padding,
                    backgroundColor: 'transparent',
                    justifyContent: 'center',
                }}
            >
                <TouchableOpacity
                    style={{
                        width: 32,
                        height: 32,
                        borderRadius: 16,
                        backgroundColor: COLORS.black,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                    onPress={() => navigation.goBack()}
                >
                    <Image
                        source={icons.backArrow}
                        reziseMode="contain"
                        style={{
                            width: 20,
                            height: 20,
                            tintColor: COLORS.white
                        }}
                    />
                </TouchableOpacity>
            </View>
        )
    }
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.black }}>
            <DishInfo
                quantity={quantity}
                item={DishObj}
                setQuantity={setQuantity}
            />
            <RenderHeader />
            <ScrollView>

                <Text style={[ textStyles.h3, styles.subTitle]}>Tamaño</Text>
                <CustomSelector
                    data={DishObj?.sizes}
                    selected={size}
                    setSelected={setSize}
    
                />
                <Text style={[ textStyles.h3, styles.subTitle]}>Empanizado</Text>
                <CustomSelector
                    data={empanizados}
                    selected={empanizado}
                    setSelected={setEmpanizado}
                
                />

            </ScrollView>
            {!activeOrder && <CustomButton
                action={handleAddToCart}
                text={'Añadir Al Carrito'}
                total={total}
            />}
            
        </SafeAreaView>
    )
}

export default DishPage

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    subTitle: {
        textAlign: 'center',
        marginVertical:10,
        color: COLORS.white
    }
})