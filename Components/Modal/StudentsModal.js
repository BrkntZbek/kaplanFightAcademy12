import { StyleSheet, Text, View, Modal, TouchableOpacity } from "react-native";
import React, { useState, useEffect, useRef, } from "react";
import AddPackModel from "./AddPackModel";
import Toast from 'react-native-toast-message';
import AddLessonModal from "./AddLessonModal";

export default function StudentsModal({
  selectedStudent,
  firestore,
  packageInfo,
  isVisible,
  handleCloseModal,
}) {
  const [addPackageModalVisible, setAddPackageModalVisible] = useState(false);
  const [lessonModalVisible,setLessonModalVisible] = useState(false);

  
 
  const toastRef = useRef(); 

    const handleOpenLessonModal = () =>{
      if(packageInfo === null)
      {
        Toast.show({
          type:'error',
          text1:'Hata',
          text2:'Bu Öğrenciye Ait Bir Paket bulunmamakta Ders eklemek için önce bir paket Girilmeli.'
        });
        return;
      }
        setLessonModalVisible(true);
        console.log('lesson modal açıldı')
        console.log(lessonModalVisible)
      
    }

  const handleCloseAddModal = () => {
    setAddPackageModalVisible(false);
    setLessonModalVisible(false);
  };
  const handleOpenModal = () => {
    // Paket bilgisi varsa uyarı göster
    if (packageInfo !== null) {
      Toast.show({
        type: 'error',
        text1: 'Hata',
        text2: 'Bu öğrenciye ait zaten bir paket tanımlı',
      });
      return;
    }

    // Paket bilgisi null ise modal'ı aç
    setAddPackageModalVisible(true);
  };
  console.log('paket',packageInfo);
  
   console.log()
  return (
    <Modal
      transparent={true}
      animationType="slide"
      visible={isVisible}
      onRequestClose={handleCloseModal}
    >
      <View style={[styles.modalContainer, { height: 600 }]}>
        <View style={styles.modalContent}>
          <View style={styles.nameContainer}>
            <Text style={{ fontWeight: "bold", fontSize: 20, color: "yellow" }}>
              {selectedStudent?.name}
            </Text>
          </View>
          <View style={styles.Studentİnfo}>
            <Text style={styles.textModal}>{selectedStudent?.email}</Text>
            <Text style={styles.textModal}>{selectedStudent?.telefon}</Text>

            <View style={styles.paket}>
              <Text
                style={{ fontWeight: "bold", fontSize: 20, color: "yellow" }}
              >
                Paket
              </Text>
              {packageInfo !== null &&
              packageInfo !== undefined &&
              Object.keys(packageInfo).length > 0 ? (
                <>
                  <Text style={styles.textModal}>
                    Paket Tipi: {packageInfo.SatilanPaket}
                  </Text>
                  <Text style={styles.textModal}>
                    Paket Fiyatı: {packageInfo.Fiyat}
                  </Text>
                  <Text style={styles.textModal}>
                    Ders Sayısı: {packageInfo.DersSayisi}
                  </Text>
                  <Text style={styles.textModal}>
                    Kalan Ders: {packageInfo.KalanDers}
                  </Text>
                </>
              ) : (
                <Text
                  style={{ fontWeight: "bold", fontSize: 15, color: "red" }}
                >
                  Öğrenciye ait paket bulunmamaktadır.
                </Text>
              )}
            </View>

            <View style={styles.paket}>
              <Text style={{ fontWeight: "bold", fontSize: 13 ,color:'yellow' }}>
                Toplam Ders Sayısı:{selectedStudent.ToplamDers}
              </Text>
            </View>

            <View style={styles.paket}>
              <Text
                style={{ fontWeight: "bold", fontSize: 20, color: "yellow" }}
              >
                Geçmiş Dersler
              </Text>
              <Text style={styles.textModal}>ss</Text>
              <Text style={styles.textModal}>Tüm Dersler</Text>
            </View>

            <View></View>
          </View>
          {/* Diğer öğrenci bilgilerini buraya ekleyebilirsiniz */}

          <View style={styles.buttons}>
            <TouchableOpacity onPress={handleOpenModal}>
              <Text
                style={{
                  fontWeight: "bold",
                  color: "yellow",
                  fontSize: 18,
                  borderWidth: 1,
                  borderRadius: 10,
                  padding: 5,
                }}
              >
                Paket Ekle
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleOpenLessonModal}>
              <Text
                style={{
                  fontWeight: "bold",
                  color: "yellow",
                  fontSize: 18,
                  borderWidth: 1,
                  borderRadius: 10,
                  padding: 5,
                }}
              >
                Ders Ekle
              </Text>
            </TouchableOpacity>
           
            <TouchableOpacity onPress={handleCloseModal}>
              <Text
                style={{
                  fontWeight: "bold",
                  color: "yellow",
                  fontSize: 18,
                  borderWidth: 1,
                  borderRadius: 10,
                  padding: 5,
                }}
              >
                Detay
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleCloseModal}>
              <Text
                style={{
                  fontWeight: "bold",
                  color: "yellow",
                  fontSize: 18,
                  borderWidth: 1,
                  borderRadius: 10,
                  padding: 5,
                }}
              >
                Kapat
              </Text>
            </TouchableOpacity>
            
          </View>
          <AddPackModel
            isVisible={addPackageModalVisible}
            selectedStudent={selectedStudent}
            firestore={firestore}
            handleCloseModal={handleCloseAddModal}
          />
          <AddLessonModal
          isVisible={lessonModalVisible}
          selectedStudent={selectedStudent}
          firestore={firestore}
          handleCloseAddModal={handleCloseAddModal}
          packageInfo={packageInfo}
          />
          
        </View>
      </View>
      <Toast ref={(ref) => Toast.setRef(ref)} />
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    height: 100,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  buttons: {
    alignItems: "center",
  },
  paket: {
    borderWidth: 2,
    borderColor: "yellow",
    borderRadius: 10,
    width: 200,
    alignItems: "center",
    marginBottom: 10,
  },
  textModal: {
    fontWeight: "bold",
    fontSize: 13,
    color: "yellow",
  },
  Studentİnfo: {
    alignItems: "center",
    padding: 5,
    margin: 2,
  },
  nameContainer: {
    borderBottomWidth: 2,
    borderColor: "yellow",
    width: "100%",
    alignItems: "center",

    borderBottomEndRadius: 30,
  },
  modalContent: {
    backgroundColor: "white",
    padding: 40,
    borderWidth: 2,
    borderColor: "yellow",
    backgroundColor: "black",
    borderRadius: 10,
    width: "80%", // Modal'ın genişliği
    maxHeight: "80%", // Modal'ın maksimum yüksekliği
  },
});

