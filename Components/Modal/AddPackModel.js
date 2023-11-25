import { StyleSheet, Text, View ,Modal,TouchableOpacity , FlatList} from 'react-native'
import React, { useState,useEffect} from 'react';
import { doc, setDoc } from '@firebase/firestore';
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
        // Firebase Authentication ile kullanıcı bilgilerini al
        // Kullanıcı oturum açmışsa
            const PackagesSold = firestore.collection('PackagesSold');
    
            // Firestore'a paket eklemek için örnek bir belge
            console.log('Selected Package:', selectedPackageId);
            await setDoc(doc(PackagesSold), {
                SatilanPaket:selectedPackageId.paketTuru,
                SatilanKisiID: selectedStudent.id,
                SatilanKisiİsim: selectedStudent.name,
                Fiyat: selectedPackageId.paketFiyati ,
                DersSayisi: selectedPackageId.dersSayisi ,
                KalanDers: selectedPackageId.dersSayisi,
                aktif: 'Aktif'
            });
    
            console.log('Yeni Paket Eklendi', selectedPackageId ? selectedPackageId.paketTuru : 'Bir paket seçilmemiş', userID.id);
    };
  
    const handlePackagePress = (selectedPackageId) => {
        setSelectedPackageId(selectedPackageId);
      
        console.log('Selected Package:', selectedPackageId);
        console.log('Selected Package ID:', selectedPackageId ? selectedPackageId.id : 'Seçilen paket yok');
      
        // selectedPackageId değeri tanımlıysa ve kalanDers özelliği varsa yazdır
        if (selectedPackageId && selectedPackageId.kalanDers !== undefined) {
          console.log('info:', selectedPackageId.dersSayisi);
        } else {
          console.log('Kalan ders bilgisi yok.');
        }
      
        console.log('User ID:', userID.id);
      
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
      backgroundColor: 'yellow',
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