import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./screens/LoginScreen";
import HomeScreen from "./screens/HomeScreen";
import AdminScreen from "./screens/AdminScreen";
import OgrenciList from "./screens/OgrenciList";
import Home from "./Home";
import DerslerScreen from "./screens/DerslerScreen";
import StudentDetailsScreen from "./screens/StudentDetailsScreen";
import AdminSetting from "./screens/AdminSetting";
import ILesson from "./Components/StudentScreen//Derslerim/ILesson";
import AddTeacherModal from "./Components/AdminScreen/AddTeacherModal";
import AddBlogPage from "./Components/AdminScreen/AddBlogPage";
import BlogPages from "./Components/Home/BlogPages";
import MuhasebeScreen from "./screens/MuhasebeScreen";
import PaketSistemi from "./screens/PaketSistemi";
import TeacherScreen from "./screens/TeacherScreen";
const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          options={{ headerShown: false }}
          name="Login"
          component={LoginScreen}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Home"
          component={HomeScreen}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Admin"
          component={AdminScreen}
        />
          <Stack.Screen
          options={{ headerShown: false }}
          name="Hoca"
          component={TeacherScreen}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Ana Sayfa"
          component={Home}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Dersler"
          component={DerslerScreen}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Hoca Ekle"
          component={AddTeacherModal}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Blog Ekle"
          component={AddBlogPage}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Blog Page"
          component={BlogPages}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Muhasebe"
          component={MuhasebeScreen}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Paket Sistemi"
          component={PaketSistemi}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Derslerim"
          component={ILesson}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
