import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { auth, firestore } from '../firebase';
import { fetchPackageInfo } from '../firebase';

import LoadingData from '../Components/Loading/LoadingData';

const UserProfile = () => {
  const [userData, setUserData] = useState(null);
  const [packageInfo, setPackageInfo] = useState(null);
 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          const userId = user.uid;
          console.log('ID', userId);

          const userRef = firestore.collection('userss').doc(userId);
          const selectedStudentSnapshot = await firestore.collection('userss').where('id', '==', userId).get();

          if (selectedStudentSnapshot.docs.length === 0) {
            console.log('Öğrencinin belgesi bulunmamaktadır.');
            setUserData(null);
            setPackageInfo(null);
            return;
          }

          const selectedStudent = selectedStudentSnapshot.docs[0];

          // userData ayarla
          const doc = await userRef.get();
          if (doc.exists) {
            setUserData(doc.data());
          } else {
            console.log('Firestore belgesi bulunamadı');
          }

          // packageInfo'yu ayarla
          fetchPackageInfo(selectedStudent, setPackageInfo);
        } else {
          setUserData(null);
          setPackageInfo(null);
        }
      } catch (error) {
        console.error('Hata oluştu:', error);
        setUserData(null);
        setPackageInfo(null);
      }
    };

    fetchData();

  }, []);

  if (!userData || !packageInfo) {
    return <LoadingData />;
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
        <Text style={{fontSize:15}}>{packageInfo.SatilanPaket}</Text>
        <Text style={{fontSize:15}}>{packageInfo.KalanDers}</Text>
        <Text style={{fontSize:15}}>{packageInfo.Fiyat}</Text>
        <Text style={{fontSize:15}}>tarih</Text>
        
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