import React from 'react'
import { View, StyleSheet } from 'react-native'

import LottieView from 'lottie-react-native'
import {SIZES} from '../../constants'

const Loader = () => {
    return (
        <View
            style={{
                position:'absolute',
                height:SIZES.height,
                width:SIZES.width,
                justifyContent:'center',
                alignItems:'center',
                backgroundColor: 'rgba(0,0,0,0.6)',
                zIndex: 1,
            }}
        >
            <View style={{ height:300, width:300, backgroundColor: 'transparent',}}>
                <LottieView
                    source={require('../../assets/LaCasaMakiLogo.json')}
                    autoPlay
                    loop
                />
            </View>
        </View>
    )
}

export default Loader