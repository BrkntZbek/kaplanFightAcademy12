import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Modal,
  FlatList,
} from "react-native";
import React, { useState } from "react";
import { doc, setDoc } from "@firebase/firestore";
import { firestore } from "../firebase";
import { useNavigation } from "@react-navigation/native";
import buttonstyle from "../Styles/ButtonStyle";
export default function AdminSetting() {
  const [modalVisible, setModalVisible] = useState(false);
  const [paketTuru, setPaketTuru] = useState("");
  const [paketFiyati, setPaketFiyati] = useState("");
  const [dersSayisi, setDersSayisi] = useState("");
  const [paketSuresi, setPaketSuresi] = useState(0);
  const navigation = useNavigation();
  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const addTeacherPage = (firestore) => {
    navigation.navigate("Hoca Ekle");
  };
  const muhasebe = (firestore) => {
    navigation.navigate("Muhasebe");
  };
  const paketSistemi = (firestore) => {
    navigation.navigate("Paket Sistemi");
  };

  const addBlogPage = (firestore) => {
    navigation.navigate("Blog Ekle");
  };

  const addPackage = async () => {
    const lessonPackage = firestore.collection("LessonPackage");
    await setDoc(doc(lessonPackage), {
      paketTuru: paketTuru,
      paketFiyati: paketFiyati,
      dersSayisi: dersSayisi,
      paketSuresi: paketSuresi,
    });
    console.log("Yeni Paket Eklendi", paketTuru);
  };

  const formatMoney = (amount) => {
    const formatter = new Intl.NumberFormat("tr-TR", {
      style: "currency",
      currency: "TRY",
      minimumFractionDigits: 0,
    });

    return formatter.format(amount);
  };

  return (
    <View style={styles.AdminSetting}>
      <View style={styles.paketler}>
        <TouchableOpacity onPress={paketSistemi}>
          <Text style={buttonstyle.contentButton}>Paket Sistemi</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={muhasebe}>
          <Text style={buttonstyle.contentButton}>Muhasebe</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={addTeacherPage}>
          <Text style={buttonstyle.contentButton}>
            Yetkiler Ve Kullanıcılar
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={addBlogPage}>
          <Text style={buttonstyle.contentButton}>Blog Ekle</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={addBlogPage}>
          <Text style={buttonstyle.contentButton}>Hocalar</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={openModal}>
          <Text style={buttonstyle.contentButton}>İstatislik</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  AdminSetting: {
    flex: 1,
    backgroundColor: "black",
    alignItems: "center",
  },

  paketler: {
    padding: 15,
    width: "80%",
    height: "auto",
    alignItems: "center",
    marginTop: 50,
    backgroundColor: "#1a1a1a",
    borderRadius: 10,
  },
});
