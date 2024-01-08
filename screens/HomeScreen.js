import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { auth } from "../firebase";
import { useNavigation } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  Ionicons,
  FontAwesome,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import Home from "../Home";

import KullaniciScreen from "./KullaniciScreen";

const Tab = createBottomTabNavigator();

export default function HomeScreen() {
  const navigation = useNavigation();
  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.navigate("Login");
      })
      .catch((error) => alert(error.message));
  };

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Ana Sayfa") {
            return focused ? (
              <Ionicons name="home" size={24} color="black" />
            ) : (
              <Ionicons name="home-outline" size={24} color="black" />
            );
          } else if (route.name === "Öğrenci Listesi") {
            iconName = focused ? "person" : "person-outline";
          } else if (route.name === "Dersler") {
            return focused ? (
              <FontAwesome name="th-list" size={24} color="black" />
            ) : (
              <FontAwesome name="list" size={24} color="black" />
            );
          } else if (route.name === "Kullanici") {
            return focused ? (
              <FontAwesome name="user" size={24} color="black" />
            ) : (
              <FontAwesome name="user-o" size={24} color="black" />
            );
          }

          return <FontAwesome name={iconName} size={size} color={color} />;
        },
        tabBarOptions: {
          activeTintColor: "black",
          inactiveTintColor: "gray",
          tabStyle: {
            backgroundColor: "#ffdf00",
          },
        },
      })}
    >
      <Tab.Screen
        options={{ headerShown: false }}
        name="Ana Sayfa"
        component={Home}
      />

      <Tab.Screen
        options={{ headerShown: false }}
        name="Kullanici"
        component={KullaniciScreen}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  HomeScreenContainer: {
    flex: 1,
    backgroundColor: "black",
  },
});
