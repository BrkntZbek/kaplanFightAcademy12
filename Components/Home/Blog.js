import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function Blog() {
  return (
    <View style={styles.blogContainer}> 
    <View style={styles.context}>
      <Text>Bloglar</Text>
      </View>
      <View style={styles.blog}>
         
      </View>
  </View>
  )
}

const styles = StyleSheet.create({
    blogContainer:{
        marginTop:80,
       backgroundColor:'red',
       width:'100%',
       height:'30%'
      },
      blog:{
        backgroundColor:'yellow'
      }
})