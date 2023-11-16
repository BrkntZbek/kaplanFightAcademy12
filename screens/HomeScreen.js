import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import { auth } from '../firebase';
import { useNavigation } from '@react-navigation/native';
import HomeScreenTabBar from '../Components/HomeScreen/HomeScreenTabBar';

export default function HomeScreen() {
  const navigation = useNavigation();
  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.navigate('Login');
      })
      .catch((error) => alert(error.message));
  };

  return (
    <View style={styles.HomeScreenContainer}>
      <Text>Email: {auth.currentUser?.email}</Text>
      <TouchableOpacity
        style={[styles.button, styles.outlineButton]}
        onPress={handleSignOut}>
        <Text style={styles.buttonText}>Çıkış Yap</Text>
      </TouchableOpacity>

      {/* HomeScreenTabBar'ı burada çağır */
      <HomeScreenTabBar />}
    </View>
  );
}

const styles = StyleSheet.create({
  HomeScreenContainer: {
    flex: 1,
    backgroundColor: 'black',
  },
});