import {
  StyleSheet,
  Text,
  View,
  Modal,
  TextInput,
  TouchableOpacity,
  Switch,
} from "react-native";
import React, { useState } from "react";
import İnputStyle from "../../Styles/İnputStyle";
import buttonStyle from "../../Styles/ButtonStyle";
import { addIncome } from "../../firebase";

export default function ExpenseModal({ isVisible, handleCloseAddModal }) {
  const [aciklama, setAciklama] = useState(null);
  const [fiyat, setFiyat] = useState(0);
  const add = () => {
    // Burada durum değeri boş değilse ve diğer değişkenleriniz (aciklama, fiyat) de uygunsa işlemi gerçekleştir
    if (aciklama && fiyat !== null) {
      // isGelirChecked true ise durumu "Gelir" olarak ayarla, değilse "Gider" olarak ayarla
      const updatedDurum = "Gider";

      console.log("income: ", updatedDurum, aciklama, fiyat);
      addIncome(aciklama, fiyat, updatedDurum);
      handleCloseAddModal();
    }
  };

  return (
    <Modal
      transparent={true}
      animationType="slide"
      visible={isVisible}
      onRequestClose={handleCloseAddModal}
    >
      <View style={styles.container}>
        <View style={styles.modalContainer}>
          <TextInput
            style={İnputStyle.contextİnptut}
            placeholder="Açıklama"
            onChangeText={(text) => setAciklama(text)}
          />
          <TextInput
            style={İnputStyle.loginİnput}
            placeholder="Fiyat"
            onChangeText={(text) => setFiyat(text)}
          />

          <TouchableOpacity onPress={add}>
            <Text style={buttonStyle.contentButton}>Ekle</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleCloseAddModal}>
            <Text style={buttonStyle.contentButton}>Kapat</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    height: "30%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "black",
    width: "60%",
    borderRadius: 10,
    borderWidth: 0.5,
    elevation: 8,
    borderColor: "#D6E8D1",
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
  },
});
