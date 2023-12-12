import { StyleSheet, Text, View ,Modal,TouchableOpacity , FlatList} from 'react-native'
import React, { useState,useEffect} from 'react';
import { doc, getDoc, setDoc ,updateDoc} from '@firebase/firestore';
import { firestore } from '../../firebase'; // Firestore bağlantısını içe aktarın


export default function AddPackModel({ isVisible, handleCloseModal,selectedStudent }) {
    const [packageList, setPackageList] = useState([]);
    const [selectedPackageId, setSelectedPackageId] = useState([]);
  

    useEffect(() => {
      const fetchPackages = async () => {
        try {
          const packageCollection = await firestore.collection('LessonPackage').get();
          const packageData = packageCollection.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          setPackageList(packageData);
          
        } catch (error) {
          console.error('Error fetching packages:', error);
        }
      };
  
      fetchPackages();
    }, []);
   
    const addPackage = async () => {
      const currentDate = new Date();
      const currentDay = currentDate.getDate();
      const currentMonth = currentDate.getMonth() + 1; // Aylar 0'dan başlar, bu nedenle +1 eklenir
      const currentYear = currentDate.getFullYear();
      const formattedDate = `${currentDay}.${currentMonth}.${currentYear}`;
    
      try {
        const PackagesSold = firestore.collection('PackagesSold');
        const UserUpdate = doc(firestore, 'userss', selectedStudent.id);
    
        const packageDurationInMonths = selectedPackageId.paketSuresi;
        console.log(packageDurationInMonths)
        const packageStartDate = new Date(currentYear, currentMonth - 1, currentDay);
        const packageEndDate = new Date(packageStartDate);
        packageEndDate.setMonth(packageEndDate.getMonth() + packageDurationInMonths);
        
        const newPackageRef = doc(PackagesSold);
    
        await setDoc(newPackageRef, {
          SatilanPaket: selectedPackageId.paketTuru,
          SatilanKisiID: selectedStudent.id,
          SatilanKisiİsim: selectedStudent.name,
          Fiyat: selectedPackageId.paketFiyati,
          DersSayisi: selectedPackageId.dersSayisi,
          KalanDers: selectedPackageId.dersSayisi,
          aktif: 'Aktif',
          satisTarihi: formattedDate,
          paketBitisTarihi: `${packageEndDate.getDate()}.${packageEndDate.getMonth() + 1}.${packageEndDate.getFullYear()}`,
        });
    
        const newPackageId = newPackageRef.id;
    
        await updateDoc(newPackageRef, {
          belgeId: newPackageId
        });
    
        await updateDoc(UserUpdate, {
          paketId: newPackageId
        });
    
        handleCloseModal();
      } catch (error) {
        console.error('Hata:', error);
      }
    };
  
    const handlePackagePress = (selectedPackageId) => {
        setSelectedPackageId(selectedPackageId);
        // selectedPackageId değeri tanımlıysa ve kalanDers özelliği varsa yazdır
        if (selectedPackageId && selectedPackageId.kalanDers !== undefined) {
        } else {
        }
        // Diğer işlemleri buraya ekleyebilirsiniz
      };
  
    return (
      <Modal
        transparent={true}
        animationType="slide"
        visible={isVisible}
        onRequestClose={handleCloseModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Paketler</Text>
            <FlatList
              horizontal={true}
              showsHorizontalScrollIndicator={true}
              data={packageList}
              keyExtractor={(item, index) => index.toString()}
              ItemSeparatorComponent={() => <View style={{ width: 10 }} />} // Yan yana olan öğeler arasına boşluk ekleyin
              renderItem={({ item,index }) => (
                <TouchableOpacity
                  onPress={() => handlePackagePress(item)}
                  style={[styles.packageList, { backgroundColor: selectedPackageId.id === item.id ? 'lightblue' : 'white' }]}
                  
                >
                   
                  <Text style={styles.packageInfo}>{item.paketTuru}</Text>
                  <Text style={styles.packageInfo}>Ders Sayisi: {item.dersSayisi}</Text>
                  <Text style={styles.packageInfo}>Paket Fiyati: {item.paketFiyati}₺</Text>
                  {/* Diğer veri özelliklerini burada listeleyin */}
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity onPress={() => addPackage()} style={styles.closeButton}>
              <Text style={{ color: 'blue' }}>Ekle</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleCloseModal} style={styles.closeButton}>
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
    },
    modalContent: {
      backgroundColor: 'white',
      padding: 40,
      borderWidth: 2,
      borderColor: 'black',
      backgroundColor: '#ffdf00',
      alignItems: 'center',
      borderRadius: 10,
      width: '80%', // Modal'ın genişliği
      maxHeight: '40%', // Modal'ın maksimum yüksekliği
    },
    packageList: {
      borderWidth: 1,
      borderColor: 'gray',
      padding: 10,
      borderRadius: 5,
      width: 200, // İstediğiniz genişliği ayarlayabilirsiniz
    },
    packageInfo: {
      fontSize: 16,
      marginBottom: 5,
    },
    closeButton: {
      marginTop: 20,
    },
  });