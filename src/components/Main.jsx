import React from "react";
import AppBar from './AppBar'
import DishPage from '../pages/DishPage'
import { StatusBar } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { COLORS } from '../../constants'
import LoginPage from "../pages/LoginPage";
import SignUpPage from '../pages/SignUpPage'

import { useCasaMaki } from '../context/CasaMakiContext'

const Stack = createNativeStackNavigator()

const Main = () => {

    const { isSignedUp, setIsSignedUp } = useCasaMaki()

    return (
        <>
            <StatusBar
                animated={true}
                backgroundColor={COLORS.black}
                barStyle={'ligth'}
            />
            <NavigationContainer>
                <Stack.Navigator
                    screenOptions={{
                        headerShown: false,
            
                    }}
                //initialRouteName="Login"
                >
                    
                        {!isSignedUp ? (
                            <>
                                <Stack.Screen name="Login" component={LoginPage} />
                                <Stack.Screen name="Registro" component={SignUpPage} />

                            </>
                        ):(
                            <>
                                <Stack.Screen name="HomeScreen" component={AppBar} />
                                <Stack.Screen name="Platillo" component={DishPage} />
                            </>
                        )}
                    
                </Stack.Navigator>
            </NavigationContainer>
        </>
    )
}
export default Main