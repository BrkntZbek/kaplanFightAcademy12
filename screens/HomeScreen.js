import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import { auth } from '../firebase';
import { useNavigation } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import Home from '../Home';
import DerslerScreen from './DerslerScreen';

const Tab = createBottomTabNavigator();

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
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Ana Sayfa') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Öğrenci Listesi') {
            iconName = focused ? 'person' : 'person-outline';
          } else if (route.name === 'Dersler') {
            iconName = focused ? 'book' : 'book-outline';
          } else if (route.name === 'Muhasebe') {
            iconName = focused ? 'cash' : 'cash-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: 'black',
        inactiveTintColor: 'gray',
        tabStyle: {
          backgroundColor: 'yellow',
          borderRadius: 5,
          borderWidth: 2, // İstediğiniz genişlikte kenarlık
      borderColor: 'black', // Kenarlık rengi
        },
      }}
    >
      <Tab.Screen options={{headerShown:false}} name="Ana Sayfa" component={Home} />
      <Tab.Screen options={{headerShown:false}} name="Dersler" component={DerslerScreen} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  HomeScreenContainer: {
    flex: 1,
    backgroundColor: 'black',
  },
});