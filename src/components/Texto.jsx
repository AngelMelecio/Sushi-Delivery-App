import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'

const Texto = ({ children, font, rest }) => {
    
    /*const largeTitle = null
    const h1 = null
    const h2 = null
    const h3 = null
    const h4 = null
    const body1 = null
    const body2 = null
    const body3 = null
    const body4 = null
    const body5 = null*/

    let textStyle =
        font === 'largeTitle' ? largeTitle :
            font === 'h1' ? h1 :
                font === 'h2' ? h2 :
                    font === 'h3' ? h3 :
                        font === 'h4' ? h4 :
                            font === 'body1' ? body1 :
                                font === 'body2' ? body2 :
                                    font === 'body3' ? body3 :
                                        font === 'body4' ? body4 :
                                            body5

    return (
        textStyle ? <Text style={[textStyle, rest]} >{children}</Text> : <></>
    )
}

export default Texto
