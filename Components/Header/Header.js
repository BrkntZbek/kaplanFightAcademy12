import { StyleSheet, Text, View,TouchableOpacity,Image } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
export default function Header() {
  const navigation = useNavigation();

  const handlePress = () => {
    // Bir önceki sayfaya git
    navigation.goBack();
  };
  return (
    <View style={styles.headContainer}>
       
    <TouchableOpacity >
            <Text style={styles.button} onPress={handlePress}>
              Geri Dön
            </Text>
          </TouchableOpacity>
         
    </View>
  )
}

const styles = StyleSheet.create({
    headContainer:{
        
        borderRadius:15,
        backgroundColor:'gray',
        width:'100%',
        height:'10%',
        paddingTop:25,
        justifyContent: "center",
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