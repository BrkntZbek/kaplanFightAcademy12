import { StyleSheet, Text, View,TouchableOpacity,TextInput,Modal, FlatList } from 'react-native'
import React, { useState} from 'react';
import { doc, setDoc } from '@firebase/firestore';
import { firestore } from '../firebase';
import { useNavigation } from '@react-navigation/native';
import buttonstyle from '../Styles/ButtonStyle'
export default function AdminSetting() {

    const [modalVisible, setModalVisible] = useState(false);
    const [paketTuru, setPaketTuru] = useState('');
    const [paketFiyati, setPaketFiyati] = useState('');
    const [dersSayisi, setDersSayisi] = useState('');
   const [paketSuresi,setPaketSuresi] = useState(0)
    const navigation = useNavigation();
  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);

  };

  const addTeacherPage = (firestore) =>{
    navigation.navigate('Hoca Ekle');
  }
  const muhasebe = (firestore) =>{
    navigation.navigate('Muhasebe');
  }
  const paketSistemi = (firestore) =>{
    navigation.navigate('Paket Sistemi')
  }

  const addBlogPage = (firestore) =>{
    navigation.navigate('Blog Ekle'); 
  }

  const addPackage = async () =>{
    const lessonPackage = firestore.collection('LessonPackage');
    await  setDoc(doc(lessonPackage),{

        paketTuru: paketTuru,
        paketFiyati:paketFiyati,
        dersSayisi:dersSayisi,
        paketSuresi:paketSuresi,

      });
      console.log('Yeni Paket Eklendi',paketTuru);
  }


  const formatMoney = (amount) => {
    const formatter = new Intl.NumberFormat('tr-TR', {
      style: 'currency',
      currency: 'TRY',
      minimumFractionDigits: 0,
    });
  
    return formatter.format(amount);
  };
 


  return (
    <View style={styles.AdminSetting}>
        <View style={styles.paketler}>
          
           <TouchableOpacity onPress={paketSistemi}>
              <Text style={buttonstyle.contentButton} >Paket Sistemi</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={muhasebe}>
              <Text style={buttonstyle.contentButton} >Muhasebe</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={addTeacherPage} >
              <Text style={buttonstyle.contentButton} >Yetkiler Ve Kullanıcılar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={addBlogPage} >
              <Text style={buttonstyle.contentButton} >Blog Ekle</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={addBlogPage} >
              <Text style={buttonstyle.contentButton} >Hocalar</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={openModal} >
              <Text  style={buttonstyle.contentButton} >İstatislik</Text>
            </TouchableOpacity>
           
            
            
            
        </View>
        
        

        <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={{borderBottomWidth:2,borderColor:'#ffdf00',width:'100%',alignItems:'center',}}>
            <Text style={styles.modalText}>Paket Ekle</Text>
            </View>
           
            <TextInput style={styles.input} placeholder='Paket İsmi' placeholderTextColor="black"  value={paketTuru} onChangeText={text => setPaketTuru(text)} autoCapitalize='none'/>
            <TextInput style={styles.input} placeholder='Paket Fiyatı' placeholderTextColor="black"  value={paketFiyati}  keyboardType='numeric' onChangeText={text => setPaketFiyati(text)} autoCapitalize='none'/>
            <TextInput style={styles.input} placeholder='Ders Sayısı' placeholderTextColor="black"  value={dersSayisi}  keyboardType='numeric' onChangeText={text => setDersSayisi(text)} autoCapitalize='none'/> 
            <TextInput style={styles.input} placeholder='Paket Süresi(ay)' placeholderTextColor="black"  value={paketSuresi}  keyboardType='numeric' onChangeText={text => setPaketSuresi(text)} autoCapitalize='none'/>
            <TouchableOpacity onPress={addPackage} >
              <Text style={{fontWeight:'bold', color:'#ffdf00', fontSize:15,borderWidth:1,borderRadius:10,padding:5,borderWidth:1,borderColor:'#ffdf00',marginTop:10}}  >Paket Ekle</Text>
             
            </TouchableOpacity>  
           
            <TouchableOpacity onPress={openModal} >
              <Text style={{fontWeight:'bold', color:'#ffdf00', fontSize:18,borderWidth:1,borderRadius:10,padding:5,}} onPress={closeModal} >Kapat</Text>
             
            </TouchableOpacity>
          </View>
          
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
    
    input:{
        backgroundColor:'#ffdf00',
        paddingHorizontal:15,
        paddingVertical:10,
        
        borderRadius:20,
        color:'black',
        marginTop:15,
        width:'70%',
        fontWeight:'bold',
       
     },
    modalContainer:{
        height: '100%',
        flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    },
    modalContent:{
        backgroundColor: 'white',
        alignItems:'center',
        padding: 40,
        borderWidth:2,
        borderColor:'#ffdf00',
        backgroundColor:'black',
        borderRadius: 20,
        width: '80%', // Modal'ın genişliği
       
        
    },
    paketler:{
      padding:15,
      width:'80%',
      height:'auto',
      alignItems:'center',
      marginTop:50,
      backgroundColor:'#1a1a1a',
      borderRadius:10,
      
  },
    modalText:{
        color:'#ffdf00',
        fontWeight:'bold',
        textDecorationLine:'underline',
        fontSize:20,
        marginBottom:30,
        marginTop:-25
    },
    
})