import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import buttonStyle from "../../../Styles/ButtonStyle";
export default function ButtonContainer({
  setShowDerslerim,
  setshowSetting,
  setGelisim,
  setRezerv,
  setshowAccount,
  showDerslerim,
  showSetting,
  gelisim,
  rezerv,
  showAccount,
}) {
  const iLessons = () => {
    setShowDerslerim(true);
    console.log("showAccount:", showAccount); // Kontrol için console.log ekleyin
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.button, showAccount && styles.activeButton]}
        onPress={setshowAccount}
      >
        <Text style={buttonStyle.normalButton}>Hesabım</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, showDerslerim && styles.activeButton]}
        onPress={iLessons}
      >
        <Text style={buttonStyle.normalButton}>Derslerim</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, gelisim && styles.activeButton]}
        onPress={setGelisim}
      >
        <Text style={buttonStyle.normalButton}>Gelişim</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, showSetting && styles.activeButton]}
        onPress={setshowSetting}
      >
        <Text style={buttonStyle.normalButton}>Ayarlar</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, rezerv && styles.activeButton]}
        onPress={setRezerv}
      >
        <Text style={buttonStyle.normalButton}>Rezerv</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    marginTop: 60,
    marginLeft: 20,
  },
  button: {
    borderWidth: 0.3,
    borderColor: "#E8E8D1",
    borderRadius: 10,
    marginTop: 10,
  },
  activeButton: {
    borderWidth: 0.5,
    borderColor: "#FFDF00",
    borderRadius: 10,
    marginTop: 10,
  },
});
