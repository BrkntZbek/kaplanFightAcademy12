import { StyleSheet, Text, View, Modal, TouchableOpacity } from 'react-native';
import React, { useState,useEffect } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import { doc, setDoc,updateDoc  } from '@firebase/firestore';
import { updateStudentsLesson } from '../../firebase';
import ModalDropdown from 'react-native-modal-dropdown';
import { fetchTeacher } from '../../firebase';
import buttonStyle from '../../Styles/ButtonStyle';
export default function AddLessonModal({ isVisible, selectedStudent, firestore, handleCloseAddModal ,packageInfo}) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [teachers,setTeachers] = useState([])
   const [selectedTeacher, setSelectedTeacher] = useState(null);
   const [selectedTime, setSelectedTime] = useState("saat seç");
  
  const handleDateChange = (date) => {
    setSelectedDate(date);

  };

  const generateTimeRange = () => {
    const times = [];
    for (let hour = 6; hour <= 23; hour++) {
      times.push(`${hour < 10 ? '0' : ''}${hour}:00`);
    }
    return times;
  };

  const timeItems = generateTimeRange();

  useEffect(() =>{
    setTeachers([])
    fetchTeacher(setTeachers);
  },[setTeachers])


  const handleAddLesson = async () => {
    const Lessons = firestore.collection('Lessons');
    const formattedDate = selectedDate.toLocaleDateString('tr-TR', {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
    });

    const lessonRef = doc(Lessons); // Belge referansını al
    await setDoc(lessonRef, {
        dersId:lessonRef.id,
        ogrenciId: selectedStudent.id,
        ogrenci: selectedStudent.name,
        hoca: selectedTeacher,
        tarih: formattedDate,
        saat: selectedTime,
        durum: 'İşlenmedi',
        ayrinti:'',
    });

    
   
    // KalanDers'i azaltma işlemi
const updatedKalanDers = packageInfo.KalanDers - 1;

// Eğer packageInfo bir nesne ise, doğrudan arama yapın.
const packageToUpdate = packageInfo.belgeId;
// Eğer paket bulunduysa ve güncelleme yapılacaksa
try {
  // Firebase Firestore veya başka bir yere güncelleme yapılacaksa burada işlemi gerçekleştirin.
  await updateDoc(doc(firestore, 'PackagesSold', packageToUpdate), { KalanDers: updatedKalanDers });
  updateStudentsLesson(selectedStudent)
 
} catch (error) {
  console.error('Firestore güncelleme hatası:', error);
  // Hata durumunda uygun bir şekilde işlem yapabilirsiniz.
}
      // Modalı kapat
      handleCloseAddModal();

   

    
};

  return (
    <Modal
      transparent={true}
      animationType="slide"
      visible={isVisible}
      onRequestClose={handleCloseAddModal}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.headerText}>Ders Ekle</Text>
            <View style={styles.input}>
            <DateTimePicker
  style={styles.datePicker}
  value={selectedDate}
  mode="date"
  display="default"
  onChange={(event, date) => handleDateChange(date)}
  locale="tr"
  minuteInterval={60}
/>
<ModalDropdown
        options={timeItems}
        defaultValue="Saat Seçiniz"
        onSelect={(index, value) => setSelectedTime(value)}
        style={{ padding: 10, borderWidth: 1, borderColor: '#ccc', borderRadius: 20,width:100 }}
        textStyle={{ fontSize: 16 }}
        initialScrollIndex={19}
        dropdownStyle={{ width: 150, marginTop: 10 }}
        renderRow={(option, index, isSelected) => (
          <Text
            style={{
              padding: 10,
              fontSize: 16, 
              color: isSelected ? '#ffdf00' : 'black', 
            }}
          >
            {option}
          </Text>
        )}
      />
            </View>
            <ModalDropdown
        options={teachers.map(teacher => teacher.name)}
        defaultValue="Hoca Seçiniz"
        onSelect={(index, value) => setSelectedTeacher(value)}
        style={{ padding: 10, borderWidth: 1, borderColor: '#ccc', borderRadius: 20,width:200,marginTop:10 }}
        textStyle={{ fontSize: 16 }} 
        
        dropdownStyle={{ width: 150, marginTop: 10 }}
        renderRow={(option, index, isSelected) => (
          <Text
            style={{
              padding: 10,
              fontSize: 16, 
              color: isSelected ? '#ffdf00' : 'black',
            }}
          >
            {option}
          </Text>
        )}
      />
        
          <TouchableOpacity  onPress={handleAddLesson}>
            <Text  style={buttonStyle.contentButton}>Ders Ekle</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleCloseAddModal} >
              <Text  style={buttonStyle.contentButton}>Kapat</Text>
            </TouchableOpacity>
          
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin:5,
  },
  input:{
    flexDirection:'row',
    alignItems:'center',
  

  },
  modalContent: {
    backgroundColor: 'white',
    padding: 5,
    margin:5,
    borderWidth: 2,
    borderColor: '#ffdf00',
    borderRadius: 10,
    alignItems:'center',
    width: '80%',
    maxHeight: '80%',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  datePicker: {
    width: 100,
    marginRight:20
    
  },
  addButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});