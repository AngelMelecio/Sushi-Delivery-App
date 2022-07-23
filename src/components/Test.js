import { StyleSheet, Text, View } from 'react-native'
import React, {useState} from 'react'
import { COLORS } from '../../constants'
import CustomSelector from './CustomSelector'

const Test = () => {

    const [size, setSize] = useState(0)
    const [empanizado, setEmpanizado] = useState(0)

  return (
    <View style={styles.container} >
      <CustomSelector
        data={[
            {index:0, name:'Regular', info:'$95'},
            {index:1, name:'Zague', info:'$120'},
            
        ]}
        selected={size}
        setSelected={setSize}
      />
      <CustomSelector
        data={[
            {index:0, name:'takis'},
            {index:1, name:'queso'},
            {index:2, name:'queso'},
            {index:3, name:'queso'},
            {index:4, name:'supercalifragilistico'},
        ]}
        selected={empanizado}
        setSelected={setEmpanizado}
      />
    </View>
  )
}

export default Test

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
    }
})