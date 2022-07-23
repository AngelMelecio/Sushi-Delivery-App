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
import DishSizes from '../components/DishSizes'
import EmpanizadoOptions from '../components/EmpanizadoOptions'
import CustomSelector from '../components/CustomSelector'

const DishPage = ({ route, navigation }) => {

    const { addCartitem } = useCasaMaki()

    const [DishObj, setDishObj] = useState(null)
    
    const [quantity, setQuantity] = useState(1)
    const [size, setSize] = useState(0)
    const [empanizado, setEmpanizado] = useState(null)
    const [total, setTotal] = useState(0)


    function handleAddToCart() {
        //addCartitem(dishInfo)
        navigation.navigate('Carrito')
    }

    useEffect(() => {
        let { item } = route.params;
        setDishObj(item)
        setTotal( item.sizes[0].info )
    }, [])

    useEffect(()=>{
        let sum = quantity * DishObj?.sizes[size]?.info
        + (empanizado !== null ? (9 * quantity) : 0)
        setTotal(sum.toFixed(2))
    },[quantity,size,empanizado])


    const RenderHeader = () => {
        
        return (
            <View
                style={{
                    position: 'absolute',
                    padding: SIZES.padding,
                    backgroundColor: 'transparent',
                    justifyContent: 'center',
                    //marginTop: StatusBar.currentHeight
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
                {/*<Text style={{ ...FONTS.h2, color: COLORS.primary }}>Precio: ${getSum()}</Text>*/}
            </View>
        )
    }
    const OrderButton = () => {
        return (
            <TouchableOpacity
                onPress={() => handleAddToCart()}
                style={{
                    position: 'absolute',
                    width: '80%',
                    bottom: 20,
                    left: SIZES.width * 0.1,
                    padding: 10,
                    borderRadius: SIZES.radius,
                    backgroundColor: COLORS.primary,
                    justifyContent: 'center',
                }}
            >
                <Text
                    style={{
                        textAlign: 'center',
                        color: COLORS.black,
                        ...FONTS.h2,
                    }}
                >
                    Añadir Al Carrito
                </Text>
            </TouchableOpacity>
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

                <Text style={styles.subTitle}>Tamaño</Text>
                <CustomSelector
                    data={DishObj?.sizes}
                    selected={size}
                    setSelected={setSize}
                />
                <Text style={styles.subTitle}>Empanizado</Text>
                <CustomSelector
                    data={empanizados}
                    selected={empanizado}
                    setSelected={setEmpanizado}
                />
                <Text style={styles.subTitle} >${total}</Text>
            </ScrollView>
            
            <OrderButton 
            />
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
        ...FONTS.h3,
        marginVertical:5,
        padding: SIZES.padding,
        color: COLORS.white
    }
})