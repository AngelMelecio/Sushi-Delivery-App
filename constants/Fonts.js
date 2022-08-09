import React, { useEffect, useState } from 'react'
import {
    Oswald_200ExtraLight,
    Oswald_300Light,
    Oswald_400Regular,
    Oswald_500Medium,
    Oswald_600SemiBold,
    Oswald_700Bold
} from '@expo-google-fonts/oswald'

import { useFonts } from 'expo-font'
import AppLoading from 'expo-app-loading'
import { Text } from 'react-native'

const SIZES = {
    //global sizes
    base: 8,
    font: 14,
    radius: 25,
    padding: 10,
    padding2: 12,

    //Font Sizes
    largeTitle: 50,
    h1: 30,
    h2: 24,
    h3: 22,
    h4: 20,
    body1: 18,
    body2: 17,
    body3: 16,
    body4: 15,
    body5: 14,
    body6: 11,
}


export const Fonts = () => {
    
    const [isMounted, setIsMounted]=useState(false)

    useEffect(()=>{
        setIsMounted(true)
        return () => {
            setIsMounted(false)
        }
    },[])

    
    let [fontsLoaded] = useFonts({
        Oswald_200ExtraLight,
        Oswald_300Light,
        Oswald_400Regular,
        Oswald_500Medium,
        Oswald_600SemiBold,
        Oswald_700Bold,
    })  
    
    if (!fontsLoaded || !isMounted) {
        return <></>
    }

    const ExtraLight = 'Oswald_200ExtraLight'
    const Light = 'Oswald_300Light'
    const Regular = 'Oswald_400Regular'
    const Medium = 'Oswald_500Medium'
    const SemiBold = 'Oswald_600SemiBold'
    const Bold = 'Oswald_700Bold'

    return {
        largeTitle: { fontFamily: Bold, fontSize: SIZES.largeTitle, lineHeight: 55, marginTop: 5, },
        h1: { fontFamily: Bold, fontSize: SIZES.h1, lineHeight: 36 },
        h2: { fontFamily: SemiBold, fontSize: SIZES.h2, lineHeight: 30 },
        h3: { fontFamily: Medium, fontSize: SIZES.h3, lineHeight:25 }, 
        h4: { fontFamily: Medium, fontSize: SIZES.h4, lineHeight:25 },
        body1: { fontFamily: Regular, fontSize: SIZES.body1, },
        body2: { fontFamily: Regular, fontSize: SIZES.body2, },
        body3: { fontFamily: Regular, fontSize: SIZES.body3, },
        body4: { fontFamily: Light, fontSize: SIZES.body4, letterSpacing: 1, lineHeight:20 },
        body5: { fontFamily: ExtraLight, fontSize: SIZES.body5, letterSpacing: 1, lineHeight:18 },
        body6: { fontFamily: ExtraLight, fontSize: SIZES.body6, letterSpacing: 1, lineHeight:16 },
    }
}
