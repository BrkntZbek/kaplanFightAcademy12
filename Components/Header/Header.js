import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
export default function Header() {
  const navigation = useNavigation();

  const handlePress = () => {
    // Bir önceki sayfaya git
    navigation.goBack();
  };
  return (
    <View style={styles.headContainer}>
      <TouchableOpacity>
        <Text style={styles.button} onPress={handlePress}>
          Geri Dön
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  headContainer: {
    marginTop: -5,
    borderRadius: 5,
    backgroundColor: "#1A1A1A",
    width: "100%",
    height: "10%",
    justifyContent: "center",
    borderBottomWidth: 0.3,
    borderColor: "#E8E8D1",
  },
  button: {
    fontWeight: "bold",
    color: "#E8E8D1",
    fontSize: 18,
    padding: 5,
    marginTop: 50,
  },
  img: {
    width: 50,
    height: 50,
  },
});
