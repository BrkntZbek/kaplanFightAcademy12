import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import TextStyle from '../../../Styles/TextStyle'
export default function LessonDetail({selectedLesson}) {
    console.log(selectedLesson.ogrenciId)
  return (
    <View>
        <View style={{alignItems:'center'}}>
        <Text style={TextStyle.normalText}>Çalışılan Bölgeler</Text>
            <View style={{alignItems:'center'}}>
            <Text>{selectedLesson.calisilanBolge}</Text>
            </View>
            <Text style={TextStyle.normalText}>Açıklama</Text>
            <Text>{selectedLesson.ayrinti}</Text>
        </View>
      
         
      
    </View>
  )
}

const styles = StyleSheet.create({})