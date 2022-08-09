import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { icons, COLORS } from '../../constants'
import { useCasaMaki } from '../context/CasaMakiContext'
import DishListPage from '../pages/DishListPage'
import OrderPage from '../pages/OrderPage'
import ShoppingCartPage from '../pages/ShoppingCartPage'
import ProfilePage from '../pages/ProfilePage'
import { TouchableOpacity, View, Image } from 'react-native'

const Tab = createBottomTabNavigator()

const AppBar = ({navigation}) => {


    const { getCartSize, textStyles } = useCasaMaki()
    const cartSize = getCartSize()

    const options = {
        tabBarActiveBackgroundColor: COLORS.black,
        tabBarInactiveBackgroundColor: COLORS.black,
        headerStyle: {
            backgroundColor: COLORS.black,
            shadowColor: 'transparent',

        },
        headerTitleStyle: {
            ...textStyles.h2
        },
        headerTintColor: COLORS.primary,
        headerTitleAlign: 'center',
    }

    return (
        <Tab.Navigator
            navigationOptions={{
                showIcon: true,
            }}
            screenOptions={{
                tabBarShowLabel: false,
                tabBarStyle: {
                    borderTopWidth: 0,
                    display: 'flex'
                },
                tabBarHideOnKeyboard: true,
              
            }}
            /*tabBarOptions={{
                keyboardHidesTabBar: true
             }} */
        >
            <Tab.Screen
                name="Pide Tus Makis"
                component={DishListPage}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Image
                            source={icons.maki}
                            resizeMode='contain'
                            style={{
                                width: 40,
                                height: 40,
                                tintColor: focused ? COLORS.primary : COLORS.lightGray4
                            }}
                        />
                    ),
                    headerRight: () => (
                        <View
                            style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                                height: 50,
                                width: 65,
                            }}
                        >
                            <TouchableOpacity
                                onPress={() => navigation.navigate('Perfil')}
                                style={{
                                    height: 40,
                                    width: 40,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                            >
                                <Image style={{
                                    height: 30,
                                    width: 30,
                                    tintColor:COLORS.lightGray4,
                                }}
                                    source={icons.usuario}
                                    resizeMode='cover' />
                            </TouchableOpacity>
                        </View>
                    ),
                    ...options
                }}
            />
            <Tab.Screen
                name="Carrito"
                component={ShoppingCartPage}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Image
                            source={icons.shoppingCart}
                            resizeMode='contain'
                            style={{
                                width: 30,
                                height: 30,
                                tintColor: focused ? COLORS.primary : COLORS.lightGray4
                            }}
                        />
                    ),
                    tabBarBadge: cartSize > 0 ? cartSize : null,
                    tabBarBadgeStyle: { backgroundColor: COLORS.primary },
                    ...options
                }}
            />
            <Tab.Screen
                name="Orden"
                component={OrderPage}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Image
                            source={icons.moto}
                            resizeMode='contain'
                            style={{
                                width: 40,
                                height: 40,
                                tintColor: focused ? COLORS.primary : COLORS.lightGray4
                            }}
                        />
                    ),
                    ...options
                }}
            />
        </Tab.Navigator>
    )
}

export default AppBar