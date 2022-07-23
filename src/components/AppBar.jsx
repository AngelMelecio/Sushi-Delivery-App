import React from 'react'
import { Image} from 'react-native'
import {createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import {icons,COLORS} from '../../constants'
import { useCasaMaki } from '../context/CasaMakiContext'
import DishListPage from '../pages/DishListPage'
import ShoppingCartPage from '../pages/ShoppingCartPage'
import ProfilePage from '../pages/ProfilePage'

const Tab = createBottomTabNavigator()

const AppBar = () => {

    const {getCartSize} = useCasaMaki()
    const cartSize = getCartSize()

    const options = {
        tabBarActiveBackgroundColor: COLORS.black,
        tabBarInactiveBackgroundColor: COLORS.black,
        headerStyle: {
            backgroundColor: COLORS.black,
            shadowColor:'transparent',
            
        },
        headerTitleStyle: {
            fontWeight: 'bold',
        },
        headerTintColor: COLORS.primary,
        headerTitleAlign: 'center',
    }

    return(
        <Tab.Navigator
            navigationOptions ={{
                showIcon: true,
            }}
            screenOptions={{
                tabBarShowLabel: false,
                tabBarStyle: {
                    backgroundColor: COLORS.black,
                    borderTopWidth:0
                }
            }}
        >
            <Tab.Screen
                name="Pide Tus Makis"
                component={DishListPage}
                options={{
                    tabBarIcon: ({focused}) => (
                        <Image
                            source={icons.maki}
                            resizeMode='contain'
                            style={{
                                width: 40,
                                height: 40,
                                tintColor: focused ? COLORS.primary : COLORS.lightGray3
                            }}
                        />
                    ),
                    ...options
                }}
            />
            <Tab.Screen
                name="Favoritos"
                component={DishListPage}
                options={{
                    tabBarIcon: ({focused}) => (
                        <Image
                            source={icons.love}
                            resizeMode='contain'
                            style={{
                                width: 30,
                                height: 30,
                                tintColor: focused ? COLORS.primary : COLORS.lightGray3
                            }}
                        />
                    ),
                    ...options
                }}
            />
            <Tab.Screen
                name="Perfil"
                component={ProfilePage}
                options={{
                    tabBarIcon: ({focused}) => (
                        <Image
                            source={icons.usuario}
                            resizeMode='contain'
                            style={{
                                width: 30,
                                height: 30,
                                tintColor: focused ? COLORS.primary : COLORS.lightGray3
                            }}
                        />
                    ),
                    ...options
                }}
            />
            <Tab.Screen
                name="Carrito"
                component={ShoppingCartPage}
                options={{
                    tabBarIcon: ({focused}) => (
                        <Image
                            source={icons.shoppingCart}
                            resizeMode='contain'
                            style={{
                                width: 30,
                                height: 30,
                                tintColor: focused ? COLORS.primary : COLORS.lightGray3
                            }}
                        />
                    ),
                    tabBarBadge: cartSize > 0 ? cartSize : null,
                    tabBarBadgeStyle:{ backgroundColor:COLORS.primary },
                    ...options
                }}
            />
        </Tab.Navigator>
    )
}

export default AppBar