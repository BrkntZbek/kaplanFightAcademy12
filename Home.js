import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import StudentHomeHeader from './Components/Header/StudentHomeHeader';
import Blog from './Components/Home/Blog';
const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.navigate('Login');
      })
      .catch((error) => alert(error.message));
  };
export default function Home() {


  return (
    <View style={styles.HomeContainer}>
       <Blog/>
    </View>
  )
}

const styles = StyleSheet.create({
    HomeContainer:{
        flex:1,
        backgroundColor:'black',
        alignItems:'center',
        justifyContent:'flex-start'
    },
    
})