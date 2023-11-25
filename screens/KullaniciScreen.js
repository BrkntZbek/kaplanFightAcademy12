import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { auth, firestore, storage } from '../firebase';
import * as ImagePicker from 'expo-image-picker';

const UserProfile = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        const userId = user.uid;
        const userRef = firestore.collection('userss').doc(userId);

        const unsubscribeFirestore = userRef.onSnapshot((doc) => {
          if (doc.exists) {
            setUserData(doc.data());
          } else {
            console.log('Firestore belgesi bulunamadı');
          }
        });

        return () => {
          unsubscribeFirestore();
        };
      } else {
        setUserData(null);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);
 

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled ) {
      // Seçilen fotoğrafı Firebase Storage'a yükleme
      const response = await fetch(result.assets[0].uri);
      const blob = await response.blob();
      const userId = auth.currentUser.uid;
      const imageName = `profile_${userId}.jpg`;

      // storage nesnesini tanımlama
      const storageRef = storage().ref().child(`userss/${userId}/${imageName}`);

      await storageRef.put(blob);

      // Yükleme tamamlandığında indirilebilir URL'yi al
      const downloadURL = await storageRef.getDownloadURL();

      // Firestore'daki kullanıcı belgesini güncelleme
      const userRef = firestore.collection('userss').doc(userId);
      await userRef.update({
        photoURL: downloadURL,
      });
    }
  };

  if (!userData) {
    return <Text>Loading...</Text>;
  }

  let profileImageSource;
  if (userData.photoURL) {
    profileImageSource = { uri: userData.photoURL };
  } else {
    const defaultImage =
      userData.gender === 'Kadın'
        ? require('../img/woman.png')
        : require('../img/man.png');
    profileImageSource = defaultImage;
  }

  return (
    <View style={styles.KullaniciContainer}>
      <View style={styles.infoContainer}>
        <View style={styles.textContainer}>
          <View style={styles.nameContainer}>
        <Text style={styles.nameText}>{userData.name}</Text>
        </View>
          <View style={styles.info}>
          <Text style={styles.kkText}>Email: {userData.email}</Text>
          <Text style={styles.kkText}>Telefon: {userData.telefon}</Text>
          <Text style={{fontSize:20,fontWeight:'bold', textDecorationLine: 'underline'}}>Paketim</Text>
          <Text style={{fontSize:15}}>Paket Türü</Text>
          <Text style={{fontSize:15}}>Ders Sayısı</Text>
          <Text style={{fontSize:15}}>Başlangıç Tarihi</Text>
          <Text style={{fontSize:15}}>Zaman Aşımı Tarihi</Text>
          
          <Text style={styles.kkText}>Gelecek Antrenman</Text>
          <Text style={styles.kkText}>Antrenman Geçmişi</Text>
          
          </View>
          </View>
          <View style={styles.altContainer}>
          <Text style={styles.kkText}>Antrenman Geçmişi</Text>
          </View>
      </View>
    </View>
  );
};

export default UserProfile;

const styles = StyleSheet.create({
  KullaniciContainer: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'flex-end',
   
  },
  nameContainer:{
    borderBottomWidth:2,
    width:'100%',
    alignItems:'center',
    
    borderBottomEndRadius:30
  },
  nameText:{
      fontWeight:'bold',
      fontSize:30,
      
  },
  info:{
   
    height:'90%',
    width:'100%',
    justifyContent:'start',
    marginTop:40,
    alignItems:'center',
    borderBottomWidth:2,
    borderColor:'black'
  },
  textContainer: {
   height:'80%',
   padding:20,
   
   margin:10,
   borderTopLeftRadius:90,
  
   alignItems:'center',
   justifyContent:'start',
  },
  kkText: {
    color: 'black',
    fontSize:15,
    margin:10,
    padding:10,
    borderWidth:2,
    borderColor:'black',
    borderRadius:20,
    
  },
  infoContainer:{
    backgroundColor: 'rgba(255, 255, 0, 0.7)',
    width:'80%',
    height:'95%',
    borderTopLeftRadius:90,
    borderBottomLeftRadius:50,
   
    justifyContent:'flex-start',
  }
});