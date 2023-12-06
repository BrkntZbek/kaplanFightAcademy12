import { StyleSheet, Text, View,FlatList,TouchableOpacity } from 'react-native'
import React from 'react'

export default function LessonsList({lessons,handleLessonPress}) {
    console.log(lessons.dersId)
  return (
    <View style={styles.lessons}>
        <FlatList
    style={{ flex: 1 }}
    data={lessons}
    keyExtractor={(item, index) => index.toString()}
    numColumns={1}
    
    renderItem={({ item, index }) => (
      <TouchableOpacity
        onPress={() => handleLessonPress(item)}
        style={styles.touchableContainer}
      >
        <View style={styles.FlatList}>
       
          <Text style={{fontSize:20,fontWeight:'bold',color:'#3B5119'}}>{` ${item.ogrenci}`}</Text>
          <View style={styles.lessonsContent}>
             <Text style={{width:'35%'}}>{` ${item.hoca}`}</Text>
             <Text style={styles.text}>{` ${item.tarih}`}</Text>
             <Text style={styles.text}>{` ${item.saat}`}</Text>
             <Text style={{ color: item.durum === "İşlenmedi" ? '#BF3624' : item.durum === "İptal" ? 'black' : item.durum === "İşlendi" ? "green":"black", marginLeft: 20 }}>{` ${item.durum}`}</Text>
          </View>
          
        </View>
      </TouchableOpacity>
    )}
  />
        </View>
  )
}

const styles = StyleSheet.create({
    lessons:{
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal:10,
        backgroundColor:'black',
        paddingTop:15
      },
       
  FlatList:{
    borderWidth: 2,
    borderRadius: 10,
    margin:2,
    borderWidth:1,
    borderColor:'#67BA46',
    backgroundColor:'#E8E5D1',
    width: '100%', // Genişliği daha küçük bir değerle ayarlayabilir veya flex ekleyebilirsiniz
    height: 'auto',
    justifyContent: 'center',
    alignItems: 'center', // Yukarıdan aşağıya sıralamak için
  },
  lessonsContent:{
    flexDirection:'row',
   
    padding:3,
    paddingRight:5,
    width:'100%',
    paddingTop:10
  },
  text:{
    width:'20%'
  },
})