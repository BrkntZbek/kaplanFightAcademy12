import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import OgrenciList from "./OgrenciList";
import DerslerScreen from "./DerslerScreen";
import MuhasebeScreen from "./MuhasebeScreen";
import { Ionicons } from "@expo/vector-icons";
import Home from "../Home";
import AdminSetting from "./AdminSetting";

const Tab = createBottomTabNavigator();

export default function AdminScreen() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Ana Sayfa") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Öğrenci Listesi") {
            iconName = focused ? "person" : "person-outline";
          } else if (route.name === "Dersler") {
            iconName = focused ? "book" : "book-outline";
          } else if (route.name === "Admin Ayarları") {
            iconName = focused ? "cash" : "cash-outline";
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
        name="Öğrenci Listesi"
        component={OgrenciList}
      />
      <Tab.Screen
        options={{ headerShown: false }}
        name="Dersler"
        component={DerslerScreen}
      />
      <Tab.Screen
        options={{ headerShown: false }}
        name="Admin Ayarları"
        component={AdminSetting}
      />
    </Tab.Navigator>
  );
}
