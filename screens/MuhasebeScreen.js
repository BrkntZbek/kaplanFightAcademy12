import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Top from '../Components/Muhasebe/Top'
import Bottom from '../Components/Muhasebe/Bottom'
import Buttons from '../Components/Muhasebe/Buttons'
import Circular from '../Components/Muhasebe/Circular.js'


export default function MuhasebeScreen() {
  return (
    <View style={styles.container}>
      <Top/>
      <Buttons/>
      <Bottom/>
      <Circular gelir={250} gider={100} size={150}/>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
  }
})