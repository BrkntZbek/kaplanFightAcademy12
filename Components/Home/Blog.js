import { StyleSheet, Text, View, FlatList, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { listFiles } from '../../firebase';

export default function Blog() {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    listFiles(setFiles)
  }, [setFiles]);
 

  console.log(files);

  const Item = ({ name }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{name}</Text>
    </View>
  );

  return (
<View style={styles.blogContainer}>
  <View style={styles.context}>
    <Text>Blogslar</Text>
  </View>
  <View style={styles.blog}>
  <FlatList
    data={files}
    horizontal={true} 
    renderItem={({ item }) => (
      <View style={styles.blogItem}>
        <Text style={{color:'red'}}>{item.baslik}</Text>
        <Image source={{ uri: item.photoUrl }} style={{ width: 170, height: 200 }} />
      </View>
    )}
    keyExtractor={(item) => item.id}
  />
</View>
</View>
  )
}

const styles = StyleSheet.create({
    blogContainer:{
        marginTop:80,
       backgroundColor:'red',
       width:'100%',
       height:'30%',
      
      },
      blog:{
        flexDirection:'row',
        backgroundColor:'yellow'
      },
      item: {
        marginVertical: 16,
        marginHorizontal: 16,
      },
      title: {
        fontSize: 18,
      },
      blogItem:{
        width:'30%',
        height:'20%'
      }
})
