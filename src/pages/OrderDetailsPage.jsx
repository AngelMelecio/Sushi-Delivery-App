import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { COLORS, icons, SIZES } from '../../constants'
import { useCasaMaki } from '../context/CasaMakiContext'

const OrderDetailsPage = ({route, navigation}) => {
    const {textStyles} = useCasaMaki()
    const [orderProducts, setOrderProducts] = useState(null)
    const [client, setClient] = useState(null)
    const [total, setTotal] = useState(null)

    useEffect(()=>{ 
        let {item} = route.params
        setOrderProducts(item.products)
        setClient({
            name:item.name,
            email:item.email,
            address:item.address,
            phone:item.phone,
        })
        setTotal( item.total )
    },[])
    const Header = () => {
        return (
          <View style={styles.header}>
            <TouchableOpacity 
              onPress={()=>{navigation.goBack()}}
              style={styles.back}>
              <Image
                source={icons.backArrow}
                resizeMode='cover'
                style={styles.backImage}
              />
            </TouchableOpacity>
          </View>
        )
      }
      const ClientData = ()=>{
        return (
            <View style={{padding:10}}>
                <Text style={[ textStyles.h2, styles.txt]}>{client?.name}</Text>
                <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center', paddingVertical:5}}>
                    <View style={{alignItems:'flex-start'}} >
                        <Text style={[ textStyles.h4, styles.txt]}>{client?.address}</Text>
                        <Text style={[ textStyles.body6, styles.txt]}>{client?.email}</Text>
                    </View>
                    <Text style={[ textStyles.body4, styles.txt]}>{client?.phone}</Text>
                </View>
            </View>
        )
      }
    const OrderItem = ({ item, index }) => {
        return (
            <View
                style={{
                    marginVertical: 7,
                    backgroundColor: COLORS.lightGray2,
                    padding: SIZES.padding,
                    borderRadius: 15
                }}>
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        width: '100%',
                    }}
                >
                    <View >
                        <View
                            style={{
                                flexDirection: 'row',
                            }}
                        >
                            {/* Circular Image */}
                            <Text style={{ ...textStyles.body4, color: COLORS.white }}>{item.name}</Text>
                            <Text style={{ ...textStyles.body5, color: COLORS.white }}> x{item.quantity}</Text>
                        </View>
                        <Text style={{ ...textStyles.body5, color: COLORS.white, }}>Tamaño: {item.size}</Text>

                        {item.empanizado !== null &&
                            <Text style={{ ...textStyles.body5, color: COLORS.white, }}>Empanizado: {item.empanizado}</Text>}
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                        <Text style={{ ...textStyles.body3, color: COLORS.white, }}>
                            $ {item.total}
                        </Text>
                    </View>
                </View>
            </View>
        )
    }
    return (
        <View style={styles.full}>
            <Header/>
            <ClientData/>
            <FlatList
                data={orderProducts}
                renderItem={OrderItem}
                contentContainerStyle={{padding:10}}
            />
            <View style={styles.foot}>
                <Text style={{color:COLORS.white, ...textStyles.h2}}>TOTAL: ${total}</Text>
            </View>
        </View>
    )
}

export default OrderDetailsPage

const styles = StyleSheet.create({
    full: {
        flex: 1,
        backgroundColor: COLORS.black,
    },
    row: {
        flexDirection: 'row',
        width: '100%',
        height: SIZES.height * 0.13,
    },
    item: {
        backgroundColor: COLORS.lightGray2,
        padding: SIZES.padding,
        borderRadius: 20,
    },
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    txt:{
        textAlign:'center',
        color:COLORS.white
    },
    backImage: {
        height: SIZES.height * 0.025,
        width: SIZES.height * 0.025,
        tintColor: COLORS.secondary,
        marginRight: 3,
      },
      header: {
        width: '100%',
        height: SIZES.height * 0.05,
        alignItems: 'flex-start',
        justifyContent: 'center',
      },
      back: {
        justifyContent: 'center',
        alignItems: 'center',
        height: SIZES.height * 0.05,
        width: SIZES.height * 0.07,
      },
      foot:{
        position:'absolute',
        justifyContent:'center',
        alignItems:'center',
        bottom:0,
        height:70,
        width:'100%',
      }
})