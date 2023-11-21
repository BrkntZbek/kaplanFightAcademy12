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

      // storage nesnesini tanımlayın
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
      <TouchableOpacity onPress={pickImage}>
        <Image style={styles.profileImage} source={profileImageSource} />
      </TouchableOpacity>
      <Text style={styles.kkText}>Merhaba, {userData.name}!</Text>
      <Text style={styles.kkText}>Email: {userData.email}</Text>
      <Text style={styles.kkText}>Telefon: {userData.telefon}</Text>
    </View>
  );
};

export default UserProfile;

const styles = StyleSheet.create({
  KullaniciContainer: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImage: {
    borderWidth: 4,
    borderColor: 'yellow',
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  kkText: {
    color: 'yellow',
  },
});