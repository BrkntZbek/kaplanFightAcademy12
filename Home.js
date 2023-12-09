import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import StudentHomeHeader from './Components/Header/StudentHomeHeader';
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
      <Text style={{color:'yellow'}}>Home</Text>
      <View style={styles.blogContainer}> 
        <View style={styles.context}>
          <Text>Bloglar</Text>
        </View>
          <View style={styles.blog}>
             
          </View>
      </View>
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
    blogContainer:{
      marginTop:80,
     backgroundColor:'red',
     width:'100%',
     height:'30%'
    },
    blog:{
      backgroundColor:'yellow'
    }
})