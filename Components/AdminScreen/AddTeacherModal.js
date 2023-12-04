import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, TextInput } from 'react-native';
import Header from '../Header/Header';
import { fetchStudents } from '../../firebase';
import { updateStudentTeacher } from '../../firebase';

export default function AddTeacherModal({ firestore }) {
  const [students, setStudents] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [selectedStudent, setSelectedStudent] = useState(null);

  useEffect(() => {
    setStudents([]);
    fetchStudents(setStudents);
  }, [firestore, setStudents]);

  const handleStudentPress = (student) => {
    setSelectedStudent(student);
    console.log('Seçilen: ',selectedStudent)
  };

 
  const handleActionButtonPress = (action) => {
    if (action === "Hoca Ekle") {
      updateStudentTeacher(selectedStudent);
      console.log('günclle')
    } else {
      console.log('Lütfen bir öğrenci seçin.');
    }
  };

  const filterStudents = () => {
    return students.filter((student) =>
      student.name.toLowerCase().includes(searchText.toLowerCase())
    );
  };

  return (
    <View style={styles.Container}>
      <Header />
      <View style={styles.functionContainer}>
        <TouchableOpacity
          onPress={() => handleActionButtonPress('Hoca Ekle')}
          disabled={!selectedStudent}
          style={[
            styles.button,
            selectedStudent && styles.activeButton,
            !selectedStudent && styles.disabledButton,
          ]}
        >
          <Text style={styles.buttonText}>Hoca Ekle</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleActionButtonPress('Güncelle')}
          disabled={!selectedStudent}
          style={[
            styles.button,
            selectedStudent && styles.activeButton,
            !selectedStudent && styles.disabledButton,
          ]}
        >
          <Text style={styles.buttonText}>Güncelle</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleActionButtonPress('Sil')}
          disabled={!selectedStudent}
          style={[
            styles.button,
            selectedStudent && styles.activeButton,
            !selectedStudent && styles.disabledButton,
          ]}
        >
          <Text style={styles.buttonText}>Sil</Text>
        </TouchableOpacity>
        <TextInput
          style={styles.searchInput}
          placeholder="Arama"
          placeholderTextColor="#ffdf00"
          value={searchText}
          onChangeText={(text) => setSearchText(text)}
        />
      </View>

      <View style={styles.studentsContainer}>
        <FlatList
          style={{ flex: 1 }}
          data={filterStudents()}
          keyExtractor={(item, index) => index.toString()}
          numColumns={1}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              onPress={() => handleStudentPress(item)}
              style={[
                styles.touchableContainer,
                selectedStudent && selectedStudent.id === item.id && styles.selectedStudent,
              ]}
            >
              <View style={styles.FlatList}>
                <Text style={styles.text}>{` ${item.name}`}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  Container: {
    backgroundColor: 'black',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },

  button: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },

  activeButton: {
    backgroundColor: 'yellow',
    borderColor: 'yellow',
  },

  disabledButton: {
    backgroundColor: 'gray',
    borderColor: 'gray',
  },

  buttonText: {
    fontWeight: 'bold',
    fontSize: 18,
    color: 'black', // Buton içindeki metin rengi
  },

  functionContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },

  searchInput: {
    borderWidth: 1,
    borderRadius: 50,
    paddingHorizontal: 10,
    borderColor: '#ffdf00',
    width: '30%',
    color: '#ffdf00',
  },
  FlatList: {
    borderWidth: 2,
    borderRadius: 10,
    margin: 2,
    borderColor: 'black',
    backgroundColor: '#ffdf00',
    width: '95%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 0, 0.7)',
  },
  studentsContainer: {
    marginTop:10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginLeft:15,
    width:'95%',
    alignItems:'center',
   
    backgroundColor: 'black',
  },

  touchableContainer: {
    // İsteğe bağlı olarak dokunulduğunda ekstra bir stil ekleyebilirsiniz
  },

  selectedStudent: {
    backgroundColor: 'lightblue', // Seçilen öğrencinin arkaplan rengini değiştirin
    alignItems:'center',
    width:'95%',
    borderRadius:10
  },
  text: {
    color: 'black',
  },
});