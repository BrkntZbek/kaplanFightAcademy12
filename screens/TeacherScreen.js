import { StyleSheet, Text, View } from 'react-native'
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import DerslerScreen from "./DerslerScreen";

import { Ionicons } from "@expo/vector-icons";
import Home from "../Home";
import React from 'react'
import HocaScreen from './HocaScreen';
const Tab = createBottomTabNavigator();
export default function TeacherScreen() {
  return (
    <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name === "Ana Sayfa") {
          iconName = focused ? "home" : "home-outline";
        } else if (route.name === "Hesap") {
          iconName = focused ? "person" : "person-outline";
        } else if (route.name === "Derslerim") {
          iconName = focused ? "book" : "book-outline";
        } 

        return <Ionicons name={iconName} size={size} color={color} />;
      },
    })}
    tabBarOptions={{
      activeTintColor: "black", // Seçili sekmenin rengi
      inactiveTintColor: "gray", // Seçili olmayan sekmenin rengi
      tabStyle: {
        backgroundColor: "#ffdf00", // Tab çubuğunun arka plan rengi
        BorderRadius: 20, // Kenar yuvarlaklığı
      },
    }}
  >
    <Tab.Screen
      options={{ headerShown: false }}
      name="Ana Sayfa"
      component={Home}
    />

    <Tab.Screen
      options={{ headerShown: false }}
      name="Hesap"
      component={HocaScreen}
    />
    <Tab.Screen
      options={{ headerShown: false }}
      name="Derslerim"
      component={DerslerScreen}
    />
  </Tab.Navigator>
  )
}

const styles = StyleSheet.create({})