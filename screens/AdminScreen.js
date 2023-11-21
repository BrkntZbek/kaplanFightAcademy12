import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './HomeScreen'; // Örnek bir sayfa
import OgrenciList from './OgrenciList'; // Örnek bir sayfa
import DerslerScreen from './DerslerScreen'; // Örnek bir sayfa
import MuhasebeScreen from './MuhasebeScreen'; // Örnek bir sayfa
import { Ionicons } from '@expo/vector-icons'; 
import Home from '../Home';

const Tab = createBottomTabNavigator();


export default function AdminScreen() {
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
    activeTintColor: 'black', // Seçili sekmenin rengi
    inactiveTintColor: 'gray', // Seçili olmayan sekmenin rengi
    tabStyle: {
        backgroundColor: 'yellow', // Tab çubuğunun arka plan rengi
        BorderRadius: 20, // Kenar yuvarlaklığı
      },
  }}
>
  <Tab.Screen name="Ana Sayfa" component={Home} />
  <Tab.Screen name="Öğrenci Listesi" component={OgrenciList} />
  <Tab.Screen name="Dersler" component={DerslerScreen} />
  <Tab.Screen name="Muhasebe" component={MuhasebeScreen} />
  
</Tab.Navigator>



  );
}