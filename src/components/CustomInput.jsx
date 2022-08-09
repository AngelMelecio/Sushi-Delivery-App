import React, {useState} from 'react'
import {TextInput, View, TouchableOpacity, Image} from 'react-native'
import { icons, COLORS, FONTS, SIZES, mailFormat } from '../../constants'


const CustomInput = 
({ 
    placeholder="",
    isEmail=false,
    isNumber=false,
    isPassword=false,
    isName=false,
    value=null,
    onChange,
}) => {
    const [ passwordHide, setPasswordHide ] = useState(true)
    const [valid,setValid] = useState(true)

    function validate( text ){


        let isValid = true
        if( isEmail && !text.match( mailFormat ) ){
            isValid = false
        }
        else if( isNumber && text.length != 10 ){
            isValid = false
        }
        else if( isName && text.length < 3 ){
            isValid= false
        }   
        else if( isPassword && text.length < 8 )
            isValid = false
        if( text.length == 0 )
            isValid = true
        setValid(isValid)
    }

    return(
        <View
            style={{
                position:'relative',
                marginVertical:10,
                justifyContent:'center',
                width:'100%',
                height:45,
            }}
        >
            <TextInput
                onChangeText={ (t) => {onChange( t ), validate( t.trim() )} }
                style={{
                    position:'absolute',
                    width:'100%',
                    height:45,
                    borderWidth: 1,
                    borderColor: valid ? COLORS.primary : COLORS.red,
                    paddingHorizontal:10,
                    marginVertical:10,
                    borderRadius: 10,
                    color:COLORS.white,
                }}
                value={ value }
                selectionColor={COLORS.primary} 
                placeholderTextColor={'#888888'}
                placeholder={placeholder}
                secureTextEntry={ isPassword ? passwordHide: isPassword }
                keyboardType={ 
                    isNumber ? 'number-pad' : 'default' 
                }
            >
            </TextInput>
            {
                isPassword &&
                <TouchableOpacity
                    onPress={ () => setPasswordHide( (prev) => !prev ) }
                    style={{
                        width:50,
                        height:35,
                        position:'absolute',
                        right:0,
                        justifyContent:'center',
                        alignItems:'center',
                        borderRadius:10
                    }}
                >
                    <Image
                        source={ passwordHide ? icons.eyeOff : icons.eye }
                        resizeMode="cover"
                        style={{
                            tintColor:COLORS.white,
                            width:23,
                            height:23,
                        }}
                    />
                </TouchableOpacity>
            }
        </View>
    )
}

export default CustomInput