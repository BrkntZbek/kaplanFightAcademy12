import { StyleSheet, Text, View,TouchableOpacity,TextInput,Modal, FlatList } from 'react-native'
import React, { useState,useEffect} from 'react';
import { doc, setDoc } from '@firebase/firestore';
import { firestore } from '../firebase';
export default function AdminSetting() {
    const [packageList, setPackageList] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [paketTuru, setPaketTuru] = useState('');
    const [paketFiyati, setPaketFiyati] = useState('');
    const [dersSayisi, setDersSayisi] = useState('');

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const addPackage = async () =>{
    const lessonPackage = firestore.collection('LessonPackage');
    await  setDoc(doc(lessonPackage),{

        paketTuru: paketTuru,
        paketFiyati:paketFiyati,
        dersSayisi:dersSayisi,
      });
      console.log('Yeni Paket Eklendi',paketTuru);
  }

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const packageCollection = await firestore.collection('LessonPackage').get();
        const packageData = packageCollection.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setPackageList(packageData);
      } catch (error) {
        console.error('Error fetching students:', error);
      }
    };

    fetchStudents();
  }, []);
 


  return (
    <View style={styles.AdminSetting}>
        <View style={styles.paketler}>
            <Text style={{color:'yellow',fontWeight:'bold',fontSize:20,textDecorationLine:'underline'}}>Paket Sistemi</Text>
           <TouchableOpacity onPress={openModal} >
              <Text style={{fontWeight:'bold', color:'yellow', fontSize:18,borderWidth:1,borderRadius:10,padding:5,}} >Paket Ekle</Text>
            </TouchableOpacity>
        </View>
        <View style={styles.paketler}>
             <Text style={{color:'yellow',fontWeight:'bold',fontSize:20,textDecorationLine:'underline'}}>Paketler</Text>
             <FlatList
        data={packageList}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.packageList}>
            <Text style={styles.packageİnfo}>{item.paketTuru}</Text>
            <Text style={styles.packageİnfo}>Ders Sayisi: {item.dersSayisi}</Text>
            <Text style={styles.packageİnfo}>Paket Fiyatı: {item.paketFiyati}₺</Text>
            {/* Diğer veri özelliklerini burada listeleyin */}
          </View>
        )}
      />
        </View>




        
        <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={{borderBottomWidth:2,borderColor:'yellow',width:'100%',alignItems:'center',}}>
            <Text style={styles.modalText}>Paket Ekle</Text>
            </View>
           
            <TextInput style={styles.input} placeholder='Paket Türü' placeholderTextColor="black"  value={paketTuru} onChangeText={text => setPaketTuru(text)} autoCapitalize='none'/>
            <TextInput style={styles.input} placeholder='Paket Fiyatı' placeholderTextColor="black"  value={paketFiyati} onChangeText={text => setPaketFiyati(text)} autoCapitalize='none'/>
            <TextInput style={styles.input} placeholder='Ders Sayısı' placeholderTextColor="black"  value={dersSayisi} onChangeText={text => setDersSayisi(text)} autoCapitalize='none'/> 
            <TouchableOpacity onPress={addPackage} >
              <Text style={{fontWeight:'bold', color:'yellow', fontSize:15,borderWidth:1,borderRadius:10,padding:5,borderWidth:1,borderColor:'yellow',marginTop:10}}  >Paket Ekle</Text>
             
            </TouchableOpacity>  
          </View>
          <TouchableOpacity onPress={openModal} >
              <Text style={{fontWeight:'bold', color:'yellow', fontSize:18,borderWidth:1,borderRadius:10,padding:5,}} onPress={closeModal} >Kapat</Text>
             
            </TouchableOpacity>
        </View>
      </Modal>
    </View>
  )
}
const styles = StyleSheet.create({
    AdminSetting:{
        flex:1,
        backgroundColor:'black',
        alignItems:'center',
    },
    packageList:{
      borderWidth:1,
      borderColor:'yellow',
      borderRadius:20,
      width:200,
      alignItems:'center',
      marginTop:20,
      marginBottom:10,
    },
    packageİnfo:{
       color:'yellow'
    },
    paketler:{
        borderWidth:1,
        borderColor:'yellow',
        borderRadius:20,
        padding:15,
        width:'80%',
        height:'40%',
        alignItems:'center',
        marginTop:20
    },
    input:{
        backgroundColor:'yellow',
        paddingHorizontal:15,
        paddingVertical:10,
        marginBottom:5,
        borderRadius:20,
        color:'black',
        marginTop:15,
        width:'70%',
        fontWeight:'bold'
     },
    modalContainer:{
        height: 600,
        flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    },
    modalContent:{
        backgroundColor: 'white',
        alignItems:'center',
        padding: 40,
        borderWidth:2,
        borderColor:'yellow',
        backgroundColor:'black',
        borderRadius: 20,
        width: '80%', // Modal'ın genişliği
        maxHeight: '80%', // Modal'ın maksimum yüksekliği
    },
    modalText:{
        color:'yellow',
        fontWeight:'bold',
        textDecorationLine:'underline',
        fontSize:20,
        marginBottom:30,
        marginTop:-25
    },
    
})