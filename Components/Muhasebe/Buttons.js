import { StyleSheet, Text, View,TouchableOpacity } from 'react-native'
import React from 'react'
import buttonStyle from '../../Styles/ButtonStyle'
export default function Buttons() {
  return (
    <View style={styles.Buttons}>
          <TouchableOpacity style={styles.button}  >
            <Text style={buttonStyle.contentButtonLesson}>Bu Hafta</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}  >
            <Text style={buttonStyle.contentButtonLesson}>Bu Ay</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}  >
            <Text style={buttonStyle.contentButtonLesson}>Tüm</Text>
          </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
    Buttons:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        borderWidth:1,
        borderRadius:10,
       margin:5,
      backgroundColor:'#FFE43D',
    },
    button:{
        marginHorizontal:30,
    }
})