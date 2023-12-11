import { StyleSheet, Text, View,Image } from 'react-native'
import React from 'react'
import Header from "../Header/Header"

export default function BlogPages({ route }) {
  const selectedBlog = route.params?.selectedBlog || {}; // varsayılan olarak boş bir obje

  return (
    <View style={styles.BlogPagesContainer}>
      <Header/>
      <View style={styles.context}>
         <Image source={{ uri: selectedBlog.photoUrl }} style={{ width: '80%', height: '100%',borderRadius:15 }} resizeMode="strech" />
       
      </View>
      <View style={styles.contentContainer}>
      <Text style={{ color: 'red',fontWeight:'bold',fontSize:30 }}>{selectedBlog.baslik}</Text>
      
      </View>
      <View style={styles.contextContainer}>
      <Text>{selectedBlog.icerik}</Text>
      </View>
      
    </View>
  )
}

const styles = StyleSheet.create({
  BlogPagesContainer: {
   flex:1
  },

  context: {
    height:'30%',
     alignItems:'center',
  },
  contentContainer:{
    marginTop:10,
    alignItems:'center'
  },
  contextContainer: {
   
  alignItems:'center'
  },
})