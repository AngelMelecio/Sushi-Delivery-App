import React, { useEffect } from "react";
import {
    SafeAreaView,
    FlatList,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity
} from "react-native";
import menu from "../data/menu";
import { images, icons, COLORS, FONTS, SIZES } from '../../constants'

const DishListPage = ({ navigation }) => {

    /* Datos */
    const categories = [
        {
            id: 1,
            name: 'Maki Rollo'
        },
        {
            id: 2,
            name: 'Especialidades'
        },
        {
            id: 3,
            name: 'Maki Rollo Especial'
        }
    ]

    const [selectedCategory, setSelectedCategory] = React.useState(null)
    const [menuList, setMenuList] = React.useState(formatData(menu))

    useEffect(() => {
        onSelectCategory(categories[0])
    }, []);

    function formatData(dataList) {
        if (dataList && Math.floor(dataList.length % 2)) {
            dataList.push({ empty: true })
        }
        return dataList
    }

    function onSelectCategory(category) {
        /* {Filtrar Menu} */
        let dishes = menu.filter(a => a.category == category.id)
        setMenuList(formatData(dishes))
        setSelectedCategory(category)
    }


    const RenderCategories = () => {
        const renderItem = ({ item }) => {
            return (
                <TouchableOpacity
                    style={{
                        padding: SIZES.padding,
                        backgroundColor:  (selectedCategory?.id == item.id) ? COLORS.primary : COLORS.lightGray2,
                        borderRadius: SIZES.radius,
                        marginRight: SIZES.padding,
                        ...styles.shadow
                    }}
                    onPress={() => onSelectCategory(item)}
                >
                    <Text
                        style={{
                            color: (selectedCategory?.id == item.id) ? COLORS.black : COLORS.white,
                            ...FONTS.body5
                        }}
                    >
                        {item.name}
                    </Text>
                </TouchableOpacity>

            )
        }

        return (
            <View style={{ paddingHorizontal: SIZES.padding * 2, paddingVertical: 5, backgroundColor:COLORS.black }} >
                <Text style={{ fontWeight:'bold', ...FONTS.h2, paddingBottom: SIZES.padding, color:COLORS.white }}>Categorias</Text>
                <FlatList
                    data={categories}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={item => `${item.id}`}
                    renderItem={renderItem}
                    contentContainerStyle={{ backgroundColor: COLORS.black }}
                />
            </View>


        )
    }

    const RenderMenuList = () => {
        const _renderItem = ({ item }) => {
            if (item.empty) {
                return <View style={styles.itemInvisible} />
            }
            return (
                <TouchableOpacity
                    style={styles.item}
                    onPress={() => navigation.navigate('Platillo', { item })}
                >
                    <Image
                        source={images.sushi}
                        resizeMode="cover"
                        style={{
                            width: "100%",
                            height: SIZES.width * 0.40,
                            borderRadius: SIZES.radius/2
                        }}
                    />

                    <View style={{...styles.itemCenter, paddingVertical: 15}}>
                        <Text style={{ ...FONTS.h4, color:COLORS.white }} >
                            {item.name}
                        </Text>
                    </View>
                  
                </TouchableOpacity>
            )
        }
        return (
            <FlatList
                data={menuList}
                numColumns={2}
                //style={{ marginBottom:20 }}
                renderItem={_renderItem}
                contentContainerStyle={{
                    //paddingHorizontal: SIZES.padding,
                    paddingVertical: 15,
                    backgroundColor: COLORS.black
                }}
            />
        )
    }
    return (
        <View
            style={{
                flex:1,
                backgroundColor: COLORS.black
            }}
        >
            <RenderCategories />
            <RenderMenuList />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 5,
        backgroundColor: COLORS.lightGray4
    },
    item: {
        flex: 1,
        margin: 5,
        //padding: 5,
        //width: '50%',
        //height: SIZES.width * 0.84,
        borderRadius: SIZES.radius/2,
        backgroundColor: COLORS.lightGray2
    },
    itemInvisible: {
        flex: 1,
        margin: 5,
        //padding: 5,
        //height: SIZES.width * 0.80,
        backgroundColor: 'transparent'
    },
    itemCenter: {
        paddingVertical: 7,
        position: 'relative',
        alignItems: 'center',
        justifyContent: 'center',
        //padding: 3,
    },
    priceStyle: {
        position: 'absolute',
        bottom: 5,
        //left: 9,
        width: "100%",
        backgroundColor: COLORS.primary,
        borderRadius: SIZES.radius,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 1,
    }
})

export default DishListPage