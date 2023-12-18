import { StyleSheet, Text, View,TouchableOpacity } from 'react-native'
import React from 'react'
import buttonStyle from '../../Styles/ButtonStyle'
export default function Buttons() {
  return (
    <View style={styles.Buttons}>
          <TouchableOpacity style={styles.button}  >
            <Text style={buttonStyle.contentButton}>Bu Hafta</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}  >
            <Text style={buttonStyle.contentButton}>Bu Ay</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}  >
            <Text style={buttonStyle.contentButton}>Tüm</Text>
          </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
    Buttons:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        borderWidth:0.3,
        borderRadius:20,
       margin:5,
      backgroundColor:'#1A1A1A',
      borderColor:'#E8E8D1'
    },
    button:{
        marginHorizontal:30,
    }
})