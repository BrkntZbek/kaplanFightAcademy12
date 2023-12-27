import { StyleSheet, Text, View, Modal, TextInput } from "react-native";
import React from "react";

export default function CreatePackage() {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={closeModal}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View
            style={{
              borderBottomWidth: 2,
              borderColor: "#ffdf00",
              width: "100%",
              alignItems: "center",
            }}
          >
            <Text style={styles.modalText}>Paket Ekle</Text>
          </View>

          <TextInput
            style={styles.input}
            placeholder="Paket İsmi"
            placeholderTextColor="black"
            value={paketTuru}
            onChangeText={(text) => setPaketTuru(text)}
            autoCapitalize="none"
          />
          <TextInput
            style={styles.input}
            placeholder="Paket Fiyatı"
            placeholderTextColor="black"
            value={paketFiyati}
            keyboardType="numeric"
            onChangeText={(text) => setPaketFiyati(text)}
            autoCapitalize="none"
          />
          <TextInput
            style={styles.input}
            placeholder="Ders Sayısı"
            placeholderTextColor="black"
            value={dersSayisi}
            keyboardType="numeric"
            onChangeText={(text) => setDersSayisi(text)}
            autoCapitalize="none"
          />
          <TextInput
            style={styles.input}
            placeholder="Paket Süresi(ay)"
            placeholderTextColor="black"
            value={paketSuresi}
            keyboardType="numeric"
            onChangeText={(text) => setPaketSuresi(text)}
            autoCapitalize="none"
          />
          <TouchableOpacity onPress={addPackage}>
            <Text
              style={{
                fontWeight: "bold",
                color: "#ffdf00",
                fontSize: 15,
                borderWidth: 1,
                borderRadius: 10,
                padding: 5,
                borderWidth: 1,
                borderColor: "#ffdf00",
                marginTop: 10,
              }}
            >
              Paket Ekle
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={openModal}>
            <Text
              style={{
                fontWeight: "bold",
                color: "#ffdf00",
                fontSize: 18,
                borderWidth: 1,
                borderRadius: 10,
                padding: 5,
              }}
              onPress={closeModal}
            >
              Kapat
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    height: "100%",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "white",
    alignItems: "center",
    padding: 40,
    borderWidth: 2,
    borderColor: "#ffdf00",
    backgroundColor: "black",
    borderRadius: 20,
    width: "80%", // Modal'ın genişliği
  },
  modalText: {
    color: "#ffdf00",
    fontWeight: "bold",
    textDecorationLine: "underline",
    fontSize: 20,
    marginBottom: 30,
    marginTop: -25,
  },

  input: {
    backgroundColor: "#ffdf00",
    paddingHorizontal: 15,
    paddingVertical: 10,

    borderRadius: 20,
    color: "black",
    marginTop: 15,
    width: "70%",
    fontWeight: "bold",
  },
});
