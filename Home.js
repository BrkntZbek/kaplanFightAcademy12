import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

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
    <View>
      <Text>Home</Text>
    </View>
  )
}

const styles = StyleSheet.create({})