import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import Header from "../Components/Header/Header";
import inputStyle from "../Styles/İnputStyle";
import buttonStyle from "../Styles/ButtonStyle";
import { fetchWage, updateWage } from "../firebase";
import { addLessonPackage } from "../firebase";
export default function PaketSistemi() {
  const [wage, setWage] = useState([]);
  const [paketIsmi, setPaketIsmi] = useState(null);
  const [paketFiyati, setPaketFiyati] = useState(null);
  const [paketSuresi, setPaketSuresi] = useState(null);
  const [dersSayisi, setDersSayisi] = useState(null);
  const [hocaDersUcreti, setHocaDersUcreti] = useState(null);
  const [duetUcreti, setDuetUcreti] = useState(null);

  useEffect(() => {
    fetchWage(setWage);
  }, []);

  const handlePaketEkle = () => {
    addLessonPackage(paketIsmi,paketFiyati,paketSuresi,dersSayisi).then(()=>{
      setPaketIsmi(null)
      setPaketFiyati(null);
      setPaketSuresi(null);
      setDersSayisi(null);
    })
  };

  const handleUcretGuncelle = () => {
    console.log(hocaDersUcreti,duetUcreti)
    updateWage(hocaDersUcreti, duetUcreti).then(() => {
      fetchWage(setWage); // Güncelleme işleminden sonra ücretleri tekrar çek
      setHocaDersUcreti(null)
      setDuetUcreti(null)
    });
  };

  return (
    <View style={styles.container}>
      <Header />
      <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#E8E8D1' }}>Paket Ekle</Text>
      <View style={styles.paketler}>
        <TextInput
          style={inputStyle.loginİnput}
          placeholder="Paket İsmi"
          value={paketIsmi}
          onChangeText={(text) => setPaketIsmi(text)}
        />
        <TextInput
          style={inputStyle.loginİnput}
          placeholder="Paket Fiyatı"
          value={paketFiyati}
          onChangeText={(text) => setPaketFiyati(text)}
        />
        <TextInput
          style={inputStyle.loginİnput}
          placeholder="Paket Süresi(Ay Olarak)"
          value={paketSuresi}
          onChangeText={(text) => setPaketSuresi(text)}
        />
        <TextInput
          style={inputStyle.loginİnput}
          placeholder="Ders Sayısı"
          value={dersSayisi}
          onChangeText={(text) => setDersSayisi(text)}
        />
        <TouchableOpacity onPress={handlePaketEkle}>
          <Text style={buttonStyle.contentButton}>Ekle</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.ucretler}>
        <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#E8E8D1' }}>Güncel ücret: ₺{wage.dersUcreti}</Text>
        <TextInput
          style={inputStyle.loginİnput}
          placeholder="Hoca Ders Ücreti"
          value={hocaDersUcreti}
          keyboardType="numeric"
          onChangeText={(text) => setHocaDersUcreti(text)}
        />
        <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#E8E8D1' }}>Güncel düet Ücreti: ₺{wage.duetUcreti}</Text>
        <TextInput
          style={inputStyle.loginİnput}
          placeholder="Düet Ücreti"
          value={duetUcreti}
          keyboardType="numeric"
          onChangeText={(text) => setDuetUcreti(text)}
        />
        <TouchableOpacity onPress={handleUcretGuncelle}>
          <Text style={buttonStyle.contentButton}>Güncelle</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A1A1A',
    alignItems: 'center'
  },
  ucretler: {
    alignItems: 'center',
    margin: 5,
  },
  packageList: {
    borderWidth: 1,
    borderColor: "#ffdf00",
    borderRadius: 20,
    width: 200,
    alignItems: "center",
    marginTop: 20,
    marginBottom: 10,
  },
  packageInfo: {
    color: "red",
  },
  paketler: {
    padding: 15,
    width: "100%",
    height: "auto",
    alignItems: "center",
    marginTop: 20,
    borderBottomWidth: 1,
    borderColor: '#E8E8D1'
  },
});