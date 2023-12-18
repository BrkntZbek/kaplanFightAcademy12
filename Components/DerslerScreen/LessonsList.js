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
          <View style={styles.container}>
          <View style={{alignItems:'center'}}>
          <Text style={{fontSize:20,fontWeight:'bold',color:'#1A1A1A'}}>{` ${item.ogrenci}`}</Text>
       </View>
          
          <View style={styles.lessonsContent}>
             <Text style={{width:'35%'}}>{` ${item.hoca}`}</Text>
             <Text style={styles.text}>{` ${item.tarih}`}</Text>
             <Text style={styles.text}>{` ${item.saat}`}</Text>
           
            
          </View>
          </View>
      
          <View style={{alignItems:'flex-start',borderLeftWidth:2,width:'20%',}}>
              <Text style={{marginLeft:10, color: item.durum === "İşlenmedi" ? '#BF3624' : item.durum === "İptal" ? 'black' : item.durum === "İşlendi" ? "green":"black", marginLeft: 20 }}>{` ${item.durum}`}</Text>
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
      container:{
       width:'80%',

      },
       
  FlatList:{
    borderWidth: 2,
    borderRadius: 10,
    margin:2,
    borderWidth:1,
    borderColor:'#67BA46',
    backgroundColor:'#E8E8D1',
    width: '100%', // Genişliği daha küçük bir değerle ayarlayabilir veya flex ekleyebilirsiniz
    height: 'auto',
     flexDirection: 'row', // Öğeleri yatayda sırala
    justifyContent: 'center', // Yatayda ortala
    alignItems: 'center', // Dikeyde ortal
  },
  lessonsContent:{
    flexDirection:'row',
    padding:3,
    paddingRight:5,
    
    paddingTop:10,
    

  },
  text:{
    width:'40%'
  },
})