import { FlatList, Image, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View, Modal, TouchableHighlight } from 'react-native'
import React, { useEffect, useState } from 'react'
import { COLORS, SIZES, icons } from '../../constants'
import { Timestamp } from '../../database/firebase-config'
import { Logout, setNotification } from '../../database/backend'
import { useCasaMaki } from '../context/CasaMakiContext'
import { useAdmin } from '../context/AdminContext'

const AdminHomePage = ({ navigation }) => {

    {/* Status */ }
    const stat = [
        { id: 0, name: 'Nueva', plural: 'Nuevas' },
        { id: 1, name: 'Cocinando', plural: 'Cocinando' },
        { id: 2, name: 'Enviado', plural: 'Enviadas' },
        { id: 3, name: 'Recoger', plural: 'Recoger' },
        { id: 4, name: 'Entragado', plural: 'Entregadas' }
    ]
    const { orders, changeStatus, getChat, deleteOrder } = useAdmin()

    const { textStyles } = useCasaMaki()
    const [showLogout, setShowLogout] = useState(false)
    const [visibleStatus, setVisibleStatus] = useState(null)
    const [statusFilter, setStatusFilter] = useState(0)
    const [selected, setSelected] = useState([])
    const [onSelected, setOnSelected] = useState(false)

    useEffect(() => {
        setSelected(orders.map((o) => {
            return { selection: false, id: o.email }
        }))
    }, [orders])

    const handleLogout = async () => {
        await Logout()
    }
    async function onChatPress(item) {
        navigation.navigate('Chat', { item })
        await setNotification(item.user, false)
    }
    function calTime({ seconds: S }) {
        const { seconds } = Timestamp.now()
        let min = ((seconds - S) / 60).toFixed(0)
        let hor = (min / 60).toFixed(0)

        if (hor) return hor + 'hrs ' + min % 60 + 'min'
        return min + 'min'
    }
    function selectAll(stats) {
        let newSelected = orders.map((order) => { return { selection: order.status === stats, id: order.email } })
        setSelected(newSelected)
        setOnSelected(true)
        //console.log(newSelected)
    }
    function selectOne(id) {
        setSelected((prev) => prev.map((order, index) => {
            if (id === index) return { ...order, selection: !order.selection }
            return order
        }))
    }
    function unselectAll() {
        setSelected((prev) => prev.map((order ) => {
            return { ...order, selection: false }
        }))
    }
    async function handleDelete(ord) {
        ord.map((order)=>{
            if( order.selection )
                deleteOrder( order.id )
        })
    }
    const Header = () => {
        const renderStats = ({ item, index }) => {
            return (
                <TouchableOpacity
                    onPress={() => setStatusFilter(index)}
                    style={[styles.status, styles.stat[index], statusFilter !== index && { opacity: 0.5 }]}>
                    <Text style={[textStyles.body3, styles.txt]}>{item.plural}</Text>
                </TouchableOpacity>
            )
        }
        return (
            <>
                <View style={styles.header}>
                    {showLogout && 
                    <TouchableOpacity
                        onPress={handleLogout}
                        style={styles.logout}>
                        <Text style={{ ...textStyles.h4, color: COLORS.white }}>Salir</Text>
                    </TouchableOpacity>}
                    <TouchableOpacity
                        onPress={() => setShowLogout((prev) => !prev)}
                        style={styles.gear}>
                        <Image
                            source={icons.settings}
                            resizeMode='cover'
                            style={styles.image}
                        />
                    </TouchableOpacity>

                </View>
                <View style={styles.header}>
                    <FlatList
                        data={stat}
                        renderItem={renderStats}
                        horizontal
                        contentContainerStyle={{ width: '100%' }}
                    />
                </View>
            </>
        )
    }
    const Header2 = () => {
        return (
            <View style={styles.header2}>
                <TouchableOpacity
                    style={{ height: '100%', width: 40, ...styles.container }}
                    onPress={() => { unselectAll(), setOnSelected(false) }}>
                    <Image
                        source={icons.close}
                        resizeMode='cover'
                        style={{ height: 15, width: 15, tintColor: COLORS.white }}
                    />
                </TouchableOpacity>
                <Text style={{ color: COLORS.white, paddingTop: 15, ...textStyles.h3 }} >Seleccionar Elementos</Text>
                <TouchableOpacity
                    style={{ height: '100%', width: 40, ...styles.container }}
                    onPress={() => selectAll(statusFilter)}>
                    <Image
                        source={icons.checked}
                        resizeMode='cover'
                        style={{ height: 30, width: 30, tintColor: COLORS.white }}
                    />
                </TouchableOpacity>
            </View>
        )
    }
    const Order = ({ item, index }) => {
        if (item.status !== statusFilter) return <></>
        const chat = getChat(item.email)
        return (
            <View style={{ marginVertical: 5 }}>
                <View style={styles.statusContainer}>
                    {/* Current Status */}
                    <TouchableOpacity
                        key={'current'}
                        style={[styles.status, styles.stat[item.status]]}
                        onLongPress={() => setVisibleStatus(index)}>

                        <Text style={[textStyles.body3, styles.txt]}>{[stat[item.status].name]}</Text>
                    </TouchableOpacity>
                    {/* Rest of Status */}
                    {visibleStatus === index && stat.map((s, index2) =>
                        index2 > item.status &&
                        <TouchableOpacity
                            key={item.email + s.id + ''}
                            onPress={() => { changeStatus(item.email, index2), setVisibleStatus(null) }}
                            style={[styles.status, styles.stat[index2]]}>

                            <Text style={[textStyles.body3, styles.txt]}>{s.name}</Text>
                        </TouchableOpacity>)
                    }
                </View>
                <TouchableOpacity
                    onLongPress={() => { !onSelected && setOnSelected(true), selectOne(index) }}
                    onPress={() => { onSelected && selectOne(index) }}
                    style={styles.row}>
                    <View style={[styles.item, selected[index]?.selection ? styles.shad : null]}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <View style={{ paddingHorizontal: 10 }}>
                                <View style={{ flexDirection: 'row', ...styles.container }}>
                                    <Text style={[textStyles.h4, styles.txt]}>{item.name}</Text>
                                    <Text style={[textStyles.body5, styles.txt]}>{calTime(item.date)}</Text>
                                </View>
                                <Text style={[textStyles.body3, styles.txt]}>{item.address}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', paddingRight: 10, ...styles.container }}>
                                <TouchableOpacity
                                    onPress={() => navigation.navigate('Details', { item })}
                                    style={{
                                        backgroundColor: COLORS.lightGray2,
                                        height: 45,
                                        width: 45,
                                        borderRadius: 22.5,
                                        marginRight: 10,
                                        ...styles.container,

                                    }}>
                                    <Image
                                        source={icons.maki}
                                        resizeMode='cover'
                                        style={{
                                            height: 30,
                                            width: 30,
                                            tintColor: COLORS.primary,
                                        }}
                                    />
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => onChatPress(chat)}
                                    style={{
                                        height: 45,
                                        width: 45,
                                        borderRadius: 22.5,
                                        backgroundColor: COLORS.lightGray2,
                                        ...styles.container
                                    }}
                                >
                                    <Image
                                        source={icons.chat}
                                        resizeMode='cover'
                                        style={{
                                            height: 24,
                                            width: 24,
                                            tintColor: COLORS.primary,
                                        }}
                                    />
                                    <View
                                        style={{
                                            height: 16,
                                            width: 16,
                                            borderRadius: 8,
                                            backgroundColor: item.notification ? COLORS.primary : COLORS.lightGray2,
                                            position: 'absolute',
                                        }}
                                    >
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>

                </TouchableOpacity>
            </View>
        )
    }

    return (
        <>
            <TouchableWithoutFeedback
                onPress={() => setVisibleStatus(null)}>
                <View style={styles.full}>
                    <Header />
                    {onSelected && <Header2 />}
                    <FlatList
                        data={orders}
                        renderItem={Order}
                    />

                </View>
            </TouchableWithoutFeedback >
            {onSelected && <View style={[styles.foot, styles.container]}>
                <TouchableOpacity
                    onPress={ async() => handleDelete(selected)}
                    style={{ height: '70%', width: 70, ...styles.container }}>

                    <Image
                        source={icons.trash}
                        resizeMode='cover'
                        style={{ height: 25, width: 25, tintColor: COLORS.white }}
                    />
                    <Text style={{ ...textStyles.body5, color: COLORS.white }}>Eliminar</Text>
                </TouchableOpacity>
            </View>}
        </>

    )
}

export default AdminHomePage

const styles = StyleSheet.create({
    full: {
        flex: 1,
        backgroundColor: COLORS.black,
        //paddingHorizontal: 10,
    },
    row: {
        //flex:1,
        flexDirection: 'row',
        //justifyContent:'space-around',
        height: 75
    },
    item: {
        flex: 1,
        position: 'absolute',
        height: 70,
        width: '100%',
        backgroundColor: COLORS.black,
        paddingVertical: SIZES.padding,
        borderRadius: 10,
        borderTopLeftRadius: 0,
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: COLORS.lightGray4,
        //alignItems:'flex-start',
        backgroundColor: COLORS.lightGray3,
        //alignItems:'space-around',
    },
    itemBelow: {
        flex: 1,
        //backgroundColor: COLORS.lightGray2,
        marginTop: 5,
        marginLeft: 5,
        borderRadius: 10,
    },
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    txt: {
        //textAlign:'center',
        color: COLORS.white,
        marginHorizontal: 5,
    },
    header: {
        flexDirection: 'row',
        width: '100%',
        height: SIZES.height * 0.05,
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginBottom: 5,
        backgroundColor: COLORS.black,
    },
    header2: {
        position: 'absolute',
        flexDirection: 'row',
        alignItems:'center',
        justifyContent: 'space-between',
        width: '100%',
        
        height: SIZES.height * 0.06,
        top: 0,
        backgroundColor: COLORS.black,
        paddingHorizontal: 5,
    },
    logout: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
        height:30,
        paddingTop: 2,
        backgroundColor: COLORS.black,
        borderRadius: 5,
        borderWidth:2,
        borderColor:COLORS.red,
        marginHorizontal: 10,
    },
    gear: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5,
    },
    image: {
        height: SIZES.height * 0.035,
        width: SIZES.height * 0.035,
        tintColor: COLORS.secondary,
    },
    stat: [
        { backgroundColor: COLORS.red },
        { backgroundColor: COLORS.primary },
        { backgroundColor: COLORS.green },
        { backgroundColor: COLORS.lightGray2 },
        { backgroundColor: COLORS.black },
    ],
    status: {
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: '20%',
        height: 30,
        paddingBottom: 5,
        marginleft: 5,
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5
    },
    statusContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    foot: {
        position: 'absolute',
        backgroundColor: COLORS.lightGray2,
        bottom: 0,
        height: 70,
        width: '100%',
    },
    shad: {

        borderColor: COLORS.primary,

    }
})