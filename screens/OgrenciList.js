import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity,StyleSheet,Image, ScrollView  } from 'react-native';
import { firestore } from '../firebase'; // Firestore bağlantısını içe aktarın

export default function OgrenciList() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const studentsCollection = await firestore.collection('userss').get();
        const studentsData = studentsCollection.docs.map(doc => doc.data());
        setStudents(studentsData);
      } catch (error) {
        console.error('Error fetching students:', error);
      }
    };

    fetchStudents();
  }, []);


  return (
    <View style={styles.container}>
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
  <FlatList
    style={{ flex: 1 }}
    data={students}
    keyExtractor={(item, index) => index.toString()}
    numColumns={2}
    renderItem={({ item, index }) => (
      <View style={styles.FlatList}>
        <Image
          style={styles.image}
          source={
            item.photoURL
              ? { uri: item.photoURL }
              : item.gender === 'Erkek'
              ? require('../img/man.png')
              : require('../img/woman.png')
          }
        />
        <Text style={styles.text}>{` ${item.name}`}</Text>
        
        {/* Diğer bilgileri de burada gösterebilirsiniz */}
      </View>
    )}
  />
</ScrollView>
</View>
  );
}
const styles = StyleSheet.create({
  FlatList: {
    borderWidth: 2,
    borderRadius: 10,
    margin: 2,
    borderColor: 'black', // borderBlockColor yerine borderColor kullanın
    backgroundColor:'yellow',
    width: 190, // Genişliği daha küçük bir değerle ayarlayabilir veya flex ekleyebilirsiniz
    height: 180,
    justifyContent: 'center',
    alignItems: 'center', // Yukarıdan aşağıya sıralamak için
    padding: 2,
    backgroundColor: 'rgba(255, 255, 0, 0.7)', // Sarı renginde ve hafif saydam (0.7 opacity)
  },
  scrollViewContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal:10,
    backgroundColor:'black',
  },
  text:{
    padding:15,
    color:'black',
    fontWeight:'bold'

  },
  image: {
    width: 100,
    height: 100,
    resizeMode: 'cover', // Resmin boyutunu düzenleme yöntemi
    borderRadius: 60, // İsteğe bağlı, köşeleri yuvarlamak için
    resizeMode: 'cover', // Resmin boyutunu düzenleme yöntemi
    borderWidth:2,
    borderColor:'black'
  },
  container:{
    backgroundColor:'black'
  }
});