import React from "react";
import DishPage from '../pages/DishPage'
import { useCasaMaki } from '../context/CasaMakiContext'
import { AdminProvider } from '../context/AdminContext'
import { StatusBar } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { COLORS } from '../../constants'
import AppBar from './AppBar'
import LoginPage from "../pages/LoginPage";
import SignUpPage from '../pages/SignUpPage'
import ProfilePage from "../pages/ProfilePage";
import AdminHomePage from "../pages/AdminHomePage";
import OrderDetailsPage from "../pages/OrderDetailsPage";
import AdminChatPage from "../pages/AdminChatPage";

const Stack = createNativeStackNavigator()

const Main = () => {
    const { isSignedUp, user } = useCasaMaki()
    return (
        <>
            <StatusBar
                animated={true}
                backgroundColor={COLORS.black}
                barStyle={'ligth'}
            />
            {!isSignedUp ?
                <NavigationContainer>
                    <Stack.Navigator screenOptions={{ headerShown: false }}>
                        <Stack.Screen name="Login" component={LoginPage} />
                        <Stack.Screen name="Registro" component={SignUpPage} />
                    </Stack.Navigator>
                </NavigationContainer> :
                <>
                    {user.email === 'admin@gmail.com' ?
                        <AdminProvider>
                            <NavigationContainer>
                                <Stack.Navigator screenOptions={{ headerShown: false }}>
                                    <Stack.Screen name="HomeScreen" component={AdminHomePage} />
                                    <Stack.Screen name="Details" component={OrderDetailsPage} />
                                    <Stack.Screen name="Chat" component={AdminChatPage} />
                                </Stack.Navigator>
                            </NavigationContainer>
                        </AdminProvider> :
                        <NavigationContainer>
                            <Stack.Navigator screenOptions={{ headerShown: false }}>
                                <Stack.Screen name="HomeScreen" component={AppBar} />
                                <Stack.Screen name="Perfil" component={ProfilePage} />
                                <Stack.Screen name="Platillo" component={DishPage} />
                            </Stack.Navigator>
                        </NavigationContainer>
                    }
                </>
            }
        </>
    )
}
export default Main