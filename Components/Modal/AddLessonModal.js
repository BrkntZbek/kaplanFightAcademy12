import { StyleSheet, Text, View, Modal, TouchableOpacity } from 'react-native';
import React, { useState,useEffect } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import { doc, setDoc,updateDoc  } from '@firebase/firestore';

export default function AddLessonModal({ isVisible, selectedStudent, firestore, handleCloseAddModal ,packageInfo}) {
  const [selectedDate, setSelectedDate] = useState(new Date());
   const [lessonİnfo,setLessonİnfo] = useState(null);

   console.log(packageInfo)
  const handleDateChange = (date) => {
    setSelectedDate(date);
    console.log(selectedStudent.name)
    console.log('Package Info:', packageInfo);
    console.log('hesapla',packageInfo.KalanDers-1)
  };



  const handleAddLesson = async () => {
    const Lessons = firestore.collection('Lessons');
    const formattedDate = selectedDate.toLocaleDateString('tr-TR', {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
    });

    // Firestore'a ders eklemek
    await setDoc(doc(Lessons), {
        OgrenciID: selectedStudent.id,
        Ogrenci: selectedStudent.name,
        DersTarihi: formattedDate,
    });

    console.log(`"${selectedStudent.name}" adlı öğrenciye ders eklendi.`);


     
     
    // KalanDers'i azaltma işlemi
const updatedKalanDers = packageInfo.KalanDers - 1;

// Eğer packageInfo bir nesne ise, doğrudan arama yapın.
const packageToUpdate = packageInfo.belgeId;
// Eğer paket bulunduysa ve güncelleme yapılacaksa
try {
  // Firebase Firestore veya başka bir yere güncelleme yapılacaksa burada işlemi gerçekleştirin.
  await updateDoc(doc(firestore, 'PackagesSold', packageToUpdate), { KalanDers: updatedKalanDers });
  console.log(`Paket güncellendi: Kalan Ders: ${updatedKalanDers}`);
} catch (error) {
  console.error('Firestore güncelleme hatası:', error);
  // Hata durumunda uygun bir şekilde işlem yapabilirsiniz.
}
      // Modalı kapat
      handleCloseAddModal();

   

    console.log(`Paket güncellendi: Kalan Ders: ${updatedKalanDers}`);
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

          <DateTimePicker
  style={styles.datePicker}
  value={selectedDate}
  mode="datetime"
  display="default"
  onChange={(event, date) => handleDateChange(date)}
  locale="tr"
/>

          <TouchableOpacity style={styles.addButton} onPress={handleAddLesson}>
            <Text style={styles.buttonText}>Ders Ekle</Text>
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
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 40,
    borderWidth: 2,
    borderColor: 'yellow',
    borderRadius: 10,
    width: '80%',
    maxHeight: '80%',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  datePicker: {
    width: 200,
    marginBottom: 20,
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