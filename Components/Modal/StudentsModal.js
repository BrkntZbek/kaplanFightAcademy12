import { StyleSheet, Text, View ,Modal,TouchableOpacity} from 'react-native'
import React, { useState, useEffect } from 'react';
import AddPackModel from './AddPackModel';

export default function StudentsModal({ selectedStudent, firestore, firebase,  isVisible, handleCloseModal }) {

    const [addPackageModalVisible, setAddPackageModalVisible] = useState(false);
    const [packageInfo, setPackageInfo] = useState(null);
    const handleCloseAddModal = () =>{
        setAddPackageModalVisible(false);
      };
      const handleOpenModal = () => {
        setAddPackageModalVisible(true);
        console.log('Modal açıldı')
      };

      useEffect(() => {
        if (selectedStudent && selectedStudent.id) {
          const fetchPackageInfo = async () => {
            try {
              const packageSnapshot = await firestore.collection('PackagesSold').where('SatilanKisi', '==', selectedStudent.id).get();
              if (!packageSnapshot.empty) {
                const packageData = packageSnapshot.docs[0].data();
                setPackageInfo(packageData);
              }
              else
              {
                setPackageInfo('Paket yok');   // isVisible ile yapılacak.
              }
            } catch (error) {
              console.error('Paket bilgilerini alma hatası:', error);
            }
          };
      
          fetchPackageInfo();
        }
      }, [selectedStudent, firestore]);
   
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
        <Text style={{fontWeight:'bold', fontSize:20, color:'yellow'}}>{selectedStudent?.name}</Text>
        </View>
        <View style={styles.Studentİnfo}>
        <Text style={styles.textModal}>{selectedStudent?.email}</Text>
        <Text style={styles.textModal}>{selectedStudent?.telefon}</Text>

        {packageInfo && (
              <View style={styles.paket}>
                <Text style={{ fontWeight: 'bold', fontSize: 20, color: 'yellow' }}>Paket</Text>
                <Text style={styles.textModal}>Paket Tipi: {packageInfo.SatilanPaket}</Text>
                <Text style={styles.textModal}>Paket Fiyatı: {packageInfo.Fiyat}</Text>
                <Text style={styles.textModal}>Ders Sayısı: {packageInfo.DersSayisi}</Text>
                <Text style={styles.textModal}>Kalan Ders: {packageInfo.KalanDers}</Text>
          
              </View>
            )}
        
        <View style={styles.paket}>
        <Text style={{fontWeight:'bold', fontSize:13}}>Toplam Ders Sayısı: </Text>
        
        </View>


        <View style={styles.paket}>

        <Text style={{fontWeight:'bold',  fontSize:20, color:'yellow',}}>Geçmiş Dersler</Text>
        <Text style={styles.textModal}>Son Ders</Text>
        <Text style={styles.textModal}>Tüm Dersler</Text>
        </View>
        
       <View>

       </View>
        
        </View>
        {/* Diğer öğrenci bilgilerini buraya ekleyebilirsiniz */}

        <View style={styles.buttons}>
        <TouchableOpacity onPress={handleOpenModal}>
          <Text style={{fontWeight:'bold', color:'yellow', fontSize:18,borderWidth:1,borderRadius:10,padding:5,}}>Paket Ekle</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleCloseModal}>
          <Text style={{fontWeight:'bold', color:'yellow', fontSize:18,borderWidth:1,borderRadius:10,padding:5,}}>Ders Ekle</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleCloseModal}>
          <Text style={{fontWeight:'bold', color:'yellow', fontSize:18,borderWidth:1,borderRadius:10,padding:5,}} >Kapat</Text>
        </TouchableOpacity>
        
        </View>
        <AddPackModel isVisible={addPackageModalVisible} userID={selectedStudent} firestore={firestore} handleCloseModal={handleCloseAddModal} />
      </View>
    </View>
    
  </Modal>
  )
}

const styles = StyleSheet.create({
    modalContainer:{
        height:100,
        flex:1,
        alignItems:'center',
        justifyContent:'center'
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
      textModal:{
        fontWeight:'bold',
         fontSize:13,
         color:'yellow',
      },
      Studentİnfo:{
        alignItems:'center',
        padding:5,
        margin:2,
     },
     nameContainer:{
        borderBottomWidth:2,
        borderColor:'yellow',
        width:'100%',
        alignItems:'center',
        
        borderBottomEndRadius:30
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
})