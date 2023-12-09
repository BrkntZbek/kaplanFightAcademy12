import { StyleSheet, Text, View ,TouchableOpacity } from 'react-native'
import React from 'react'

export default function StudentHomeHeader() {
  return (
    <View style={styles.headContainer}>
       
    <TouchableOpacity >
            <Text style={styles.button} >
              Ders Rezervasyon
            </Text>
   </TouchableOpacity>
   <TouchableOpacity >
            <Text style={styles.button} >
              sa
            </Text>
   </TouchableOpacity>
         
    </View>
  )
}

const styles = StyleSheet.create({
    headContainer:{
        flexDirection:'row',
        paddingTop:30,
        borderRadius:15,
        backgroundColor:'gray',
        width:'100%',
        height:'10%',
        paddingTop:25,
        justifyContent: "center",
        alignItems:'center'
      },
      button:{
        fontWeight: "bold",
        color: "black",
        fontSize: 18,
        padding: 5,
      },
      img:{
        width:50,
        height:50
      }
})