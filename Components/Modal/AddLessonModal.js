import { StyleSheet, Text, View, Modal, TouchableOpacity } from 'react-native';
import React, { useState,useEffect } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import { doc, setDoc,updateDoc  } from '@firebase/firestore';
import { updateStudentsLesson } from '../../firebase';
import ModalDropdown from 'react-native-modal-dropdown';

export default function AddLessonModal({ isVisible, selectedStudent, firestore, handleCloseAddModal ,packageInfo}) {
  const [selectedDate, setSelectedDate] = useState(new Date());
   const [selectedTeacher, setSelectedTeacher] = useState(null);
   const [selectedTime, setSelectedTime] = useState("saat seç");
   console.log(packageInfo)
  const handleDateChange = (date) => {
    setSelectedDate(date);
    console.log(selectedStudent.name)
    console.log('Package Info:', packageInfo);
    console.log('hesapla',packageInfo.KalanDers-1)
  };

  const generateTimeRange = () => {
    const times = [];
    for (let hour = 6; hour <= 23; hour++) {
      times.push(`${hour < 10 ? '0' : ''}${hour}:00`);
    }
    return times;
  };

  const timeItems = generateTimeRange();
  console.log(timeItems)



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
        ogrenciId: selectedStudent.id,
        ogrenci: selectedStudent.name,
        tarih: formattedDate,
        saat:selectedTime,
        durum:'İşlenmedi',
        
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
  updateStudentsLesson(selectedStudent)
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
        style={{ padding: 10, borderWidth: 1, borderColor: '#ccc', borderRadius: 5,width:100 }}
        textStyle={{ fontSize: 16 }} // Bu kısım text boyutunu ayarlar
        
        dropdownStyle={{ width: 150, marginTop: 10 }}
        renderRow={(option, index, isSelected) => (
          <Text
            style={{
              padding: 10,
              fontSize: 16, // Bu kısım modal içindeki text boyutunu ayarlar
              color: isSelected ? '#ffdf00' : 'black', // Seçilen değerin rengini değiştirmek için
            }}
          >
            {option}
          </Text>
        )}
      />

          <TouchableOpacity style={styles.addButton} onPress={handleAddLesson}>
            <Text style={styles.buttonText}>Ders Ekle</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleCloseAddModal} style={styles.closeButton}>
              <Text style={{ color: 'blue' }}>Kapat</Text>
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
  modalContent: {
    backgroundColor: 'white',
    padding: 5,
    margin:10,
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