import { StyleSheet, Text, View, FlatList, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { listFiles } from '../../firebase'

export default function Blog() {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    listFiles().then((listResp) => {
      const files = listResp.map((value) => {
        return { name: value.fullPath };
      });

      setFiles(files);
    });
  }, []);

  console.log({ files });

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
        renderItem={({ item }) => <Image source={{uri: item.name}} style={{width: 170 , height: 200}}/>}
        keyExtractor={(item) => item.name}
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
       height:'30%'
      },
      blog:{
        backgroundColor:'yellow'
      },
      item: {
        marginVertical: 16,
        marginHorizontal: 16,
      },
      title: {
        fontSize: 18,
      },
})
