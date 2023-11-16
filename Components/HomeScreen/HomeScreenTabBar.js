import { StyleSheet } from 'react-native';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../../screens/HomeScreen';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export default function HomeScreenTabBar() {
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
          borderRadius: 20, // Kenar yuvarlaklığı
        },
      }}
    >
      <Tab.Screen name="Ana Sayfa" component={HomeScreen} />
   
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({});