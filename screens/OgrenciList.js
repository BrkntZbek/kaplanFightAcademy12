import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image, TextInput, Modal } from 'react-native';
import { firestore,firebase,auth } from '../firebase'; // Firestore bağlantısını içe aktarın

import StudentsModal from '../Components/Modal/StudentsModal';

export default function OgrenciList() {
  const [students, setStudents] = useState([]);
 
  const [searchText, setSearchText] = useState('');
  const [selectedStudent, setSelectedStudent] = useState([]);

 const [studentİnfoVisible,setStudentİnfoVisible] = useState(false);


 console.log(studentİnfoVisible);
  const handleStudentPress = (item) => {
    setSelectedStudent(item);
    setStudentİnfoVisible(true);
  };

  const handleCloseStudentModel = () => {
    setStudentİnfoVisible(false);
  };
  

  




  // Öğrencileri Listelemek için
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const studentsCollection = await firestore.collection('userss').get();
        const studentsData = studentsCollection.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setStudents(studentsData);
       
      } catch (error) {
        console.error('Error fetching students:', error);
      }
    };
     
    fetchStudents();
  }, []);



 
  

  // İsme göre filtreleme fonksiyonu
  const filterStudents = () => {
    return students.filter(student =>
      student.name.toLowerCase().includes(searchText.toLowerCase())
    );
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Arama"
        value={searchText}
        onChangeText={(text) => setSearchText(text)}
      />
     <View style={styles.scrollViewContainer}>
  <FlatList
    style={{ flex: 1 }}
    data={filterStudents()}
    keyExtractor={(item, index) => index.toString()}
    numColumns={2}
    renderItem={({ item, index }) => (
      <TouchableOpacity
        onPress={() => handleStudentPress(item)}
        style={styles.touchableContainer}
      >
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
        </View>
      </TouchableOpacity>
    )}
  />
</View>

      {/* Modal Ekranı */}
   
      <StudentsModal isVisible={studentİnfoVisible}  selectedStudent={selectedStudent} firestore={firestore} handleCloseModal={handleCloseStudentModel} firebase={firebase}/>
      
    </View>
    
  );
}
const styles = StyleSheet.create({
  FlatList: {
    borderWidth: 2,
    borderRadius: 10,
   margin:15,
    borderColor: 'black', // borderBlockColor yerine borderColor kullanın
    backgroundColor:'yellow',
    width: 160, // Genişliği daha küçük bir değerle ayarlayabilir veya flex ekleyebilirsiniz
    height: 180,
    justifyContent: 'center',
    alignItems: 'center', // Yukarıdan aşağıya sıralamak için
    padding: 2,
    backgroundColor: 'rgba(255, 255, 0, 0.7)', // Sarı renginde ve hafif saydam (0.7 opacity)
  },
  buttons:{
     alignItems:'center'
  },
  paket:{
    borderWidth:2,
    borderColor:'yellow',
    borderRadius:10,
    width:200,
    alignItems: 'center',
    marginBottom:10
  },
  Studentİnfo:{
     alignItems:'center',
     padding:5,
     margin:2,
  },
  modalContainer:{
     height:100
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
  textModal:{
    fontWeight:'bold',
     fontSize:13,
     color:'yellow',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Saydamlık için arkaplan rengi
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 40,
    borderWidth:2,
    borderColor:'yellow',
    backgroundColor:'black',
    borderRadius: 10,
    width: '80%', // Modal'ın genişliği
    maxHeight: '80%', // Modal'ın maksimum yüksekliği
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
    flex:1,
    marginTop:20,
    
    backgroundColor:'black'
  },
  searchInput: {
    
    backgroundColor: 'yellow',
    fontSize:15,
    fontWeight:'bold',
    textAlign:'center',
    margin: 10,
    padding: 10,
    borderRadius: 10,
  },
  nameContainer:{
    borderBottomWidth:2,
    borderColor:'yellow',
    width:'100%',
    alignItems:'center',
    
    borderBottomEndRadius:30
  },
});