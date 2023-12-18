import { StyleSheet, Text, View,TouchableOpacity } from 'react-native'
import React from 'react'
import buttonStyle from '../../Styles/ButtonStyle'
export default function Bottom() {
  return (
    <View style={styles.container}>
      <View style={styles.buttons}>
          <TouchableOpacity style={styles.button}  >
            <Text style={buttonStyle.normalButton}>Tür</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}  >
            <Text style={buttonStyle.normalButton}>Açıklama</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}  >
            <Text style={buttonStyle.normalButton}>Fiyat</Text>
          </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
       backgroundColor:'#1A1A1A',
       borderTopStartRadius:10,
       borderTopEndRadius:10,
       height:'45%'
    },
    buttons:{
        flexDirection:'row',
        height:'15%',
        borderRadius:10,
        justifyContent:'center',
        alignItems:'center',
        borderBottomWidth:0.5,
    },
    button:{
        marginHorizontal:30,
      
    }
})