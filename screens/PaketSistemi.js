import { StyleSheet, Text, View, FlatList } from "react-native";
import React, { useState, useEffect } from "react";
import Header from "../Components/Header/Header";

export default function PaketSistemi(firestore) {
  const [packageList, setPackageList] = useState([]);
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const packageCollection = await firestore
          .collection("LessonPackage")
          .get();
        const packageData = packageCollection.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPackageList(packageData);
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };

    fetchStudents();
  }, []);
  return (
    <View style={styles.container}>
      <Header />
      <Text>PaketSistemi</Text>
      <View style={styles.paketler}>
        <Text
          style={{
            color: "#ffdf00",
            fontWeight: "bold",
            fontSize: 20,
            textDecorationLine: "underline",
          }}
        >
          Paketler
        </Text>
        <FlatList
          data={packageList}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.packageList}>
              <Text style={styles.packageİnfo}>{item.paketTuru}</Text>
              <Text style={styles.packageİnfo}>
                Ders Sayisi: {item.dersSayisi}
              </Text>
              <Text style={styles.packageİnfo}>
                Paket Fiyatı: {formatMoney(item.paketFiyati)}
              </Text>
              {/* Diğer veri özelliklerini burada listeleyin */}
            </View>
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  packageİnfo: {
    color: "#ffdf00",
  },
  paketler: {
    padding: 15,
    width: "80%",
    height: "auto",
    alignItems: "center",
    marginTop: 50,
  },
});
