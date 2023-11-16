import React, { useState,useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, KeyboardAvoidingView, Image, TouchableOpacity, Switch } from 'react-native';
import { auth } from '../firebase';
import { useNavigation } from '@react-navigation/native';
import { firestore } from '../firebase';

import { doc, setDoc } from '@firebase/firestore';
export default function LoginScreen() {
  const [showNameInput, setShowNameInput] = useState(false);
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [Telefon, setTelefon] = useState(0);
  const navigation=useNavigation();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        // Kullanıcı oturum açtı
        if (user.email === 'admin@kaplanfight.com') {
          // Admin kontrolü
          navigation.replace('Admin');
          console.log('Admin kullanıcı kayıt oldu', user.email);
        } else {
          // Diğer kullanıcılar
          navigation.replace('Home');
          console.log('Normal kullanıcı kayıt oldu', user.email);
        }
      }
    });
  
    return () => {
      unsubscribe(); // useEffect temizleme fonksiyonu
    };
  }, [navigation]);


  const handleSwitchToggle = (value) => {
    setIsRegisterMode(value);
    setShowNameInput(value); // Eğer register moddaysa, isim soyisim input'u göster
  };


  const handleButtonClick = async () => {
    try {
      if (isRegisterMode) {
        // Kayıt ol butonuna tıklanınca yapılacak işlemler
        
        const userCredential = await auth.createUserWithEmailAndPassword(email, password);
        const user = userCredential.user;
        const usersCollection = firestore.collection('userss');
        const userId = user.uid;
        //firestore ekleme kısmı
        await  setDoc(doc(usersCollection,userId),{
          email: user.email,
          id:userId,
          name:name,
          telefon:Telefon
        });
  
       
        console.log('Kullanıcı kayıt oldu', user.email);
      } else {
        // Giriş yap butonuna tıklanınca yapılacak işlemler
        const userCredential = await auth.signInWithEmailAndPassword(email, password);
        const user = userCredential.user;
        const userId = user.uid;
  
        // Firestore ekleme
        console.log('Kullanıcı giriş yaptı', user.email);
      }
    } catch (error) {
      console.error('İşlem hatası:', error);
      alert('Bir hata oluştu: ' + error.message);
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior='padding'> 
      <View style={styles.imageContainer}>
        <Image style={styles.logoİmg} source={require('../img/kaplanLogo.png')} />
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
  <Text style={{ color: isRegisterMode ? 'grey' : 'green' ,fontWeight:'bold'}}>Giriş Yap</Text>
  <Switch
    value={isRegisterMode}
    onValueChange={handleSwitchToggle}
    trackColor={{ false: 'grey', true: 'grey' }}
    thumbColor={isRegisterMode ? 'grey' : 'grey'}
  />
  <Text style={{ color: isRegisterMode ? 'green' : 'grey',fontWeight:'bold' }}>Kayıt Ol</Text>
</View>
      
      <View style={styles.inputContainer}>
        <TextInput style={styles.input} placeholder='Email' value={email} onChangeText={text => setEmail(text)} autoCapitalize='none'/> 
        <TextInput style={styles.input} placeholder='Şifre' value={password} onChangeText={password => setPassword(password)} autoCapitalize='none' secureTextEntry={true} />
        {showNameInput && <TextInput style={styles.input} value={name} onChangeText={name => setName(name)} placeholder='İsim Soyisim'/>}
        {showNameInput && <TextInput style={styles.input} value={Telefon} keyboardType="numeric" onChangeText={Telefon => setTelefon(Telefon)} placeholder='Telefon'/>}
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.outlineButton]}
          onPress={handleButtonClick}>
          <Text style={styles.buttonText}>{isRegisterMode ? 'Kayıt Ol' : 'Giriş Yap'}</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
    container:{
      flex:1,
      justifyContent:'center',
      alignItems:'center',
      backgroundColor:'black'
    },
    inputContainer:{
       width:'80%'
    },
    input:{
       backgroundColor:'yellow',
       paddingHorizontal:15,
       paddingVertical:10,
       marginBottom:5,
       borderRadius:20,
       color:'black',
      
       fontWeight:'bold'
    },
    buttonContainer:{
        marginTop:20,
      width:'60%',
     
     
    },
    button:{
       
        margin:5,
        height:35,
        borderRadius:20,
        backgroundColor:'black',
        borderWidth:2,
        borderColor:'yellow',
        alignItems:'center',
        justifyContent:'center'
    },
    outlineButton:{
        fontWeight:'bold',
        color:'red',
    },
    buttonText:{
        fontWeight:'bold',
        color:'yellow',
    },
    
    logoİmg:{
        width:350, // İstediğiniz genişlik ve yüksekliği ayarlayın
        height: 350,

    },
    imageContainer:{
        
        
    }

})