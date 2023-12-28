import {
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React, { useState, useEffect } from "react";
import { doc, setDoc, updateDoc, Timestamp } from "@firebase/firestore";
import { firestore } from "../../firebase";

import Toast from "react-native-toast-message";
export default function AddPackModel({
  isVisible,
  handleCloseModal,
  selectedStudent,
}) {
  const [packageList, setPackageList] = useState([]);
  const [selectedPackageId, setSelectedPackageId] = useState([]);

  useEffect(() => {
    const fetchPackages = async () => {
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
        console.error("Error fetching packages:", error);
      }
    };

    fetchPackages();
  }, []);

  const addPackage = async () => {
    const currentYear = new Date().getFullYear();
    const formattedDate = new Date();

    try {
      const PackagesSold = firestore.collection("PackagesSold");
      const UserUpdate = doc(firestore, "userss", selectedStudent.id);

      const packageDurationInMonths = selectedPackageId.paketSuresi;

      const packageStartDate = new Date();
      const packageEndDate = new Date(packageStartDate);
      packageEndDate.setMonth(
        packageEndDate.getMonth() + packageDurationInMonths,
      );

      const newPackageRef = doc(PackagesSold);
      const Muhasebe = firestore.collection("Muhasebe");
      const muhasebeRef = doc(Muhasebe);

      await setDoc(newPackageRef, {
        SatilanPaket: selectedPackageId.paketTuru,
        SatilanKisiID: selectedStudent.id,
        SatilanKisiİsim: selectedStudent.name,
        Fiyat: selectedPackageId.paketFiyati,
        DersSayisi: selectedPackageId.dersSayisi,
        KalanDers: selectedPackageId.dersSayisi,
        aktif: "Aktif",
        satisTarihi: formattedDate,
        paketBitisTarihi: `${packageEndDate.getDate()}.${
          packageEndDate.getMonth() + 1
        }.${packageEndDate.getFullYear()}`,
      });

      await setDoc(muhasebeRef, {
        id: muhasebeRef.id,
        aciklama: selectedStudent.name + " Paket Ödemesi",
        durum: "Gelir",
        fiyat: selectedPackageId.paketFiyati,
        tarih: formattedDate,
      });

      const newPackageId = newPackageRef.id;
      await updateDoc(newPackageRef, {
        belgeId: newPackageId,
      });

      await updateDoc(UserUpdate, {
        paketId: newPackageId,
      });

      handleCloseModal();
    } catch (error) {
      console.error("Hata:", error);
    }

    Toast.show({
      type: "error",
      text1: "Paket Eklendi",
      text2: `${selectedStudent.name} adlı öğrenciye Paket Eklendi`,
    });
  };
   
     
    

  const handlePackagePress = (selectedPackageId) => {
    setSelectedPackageId(selectedPackageId);
  };

  return (
    <Modal
      transparent={true}
      animationType="slide"
      visible={isVisible}
      onRequestClose={handleCloseModal}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
        
          <FlatList
            data={packageList}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                onPress={() => handlePackagePress(item)}
                style={[
                  styles.packageList,
                  {
                    backgroundColor:
                      selectedPackageId.id === item.id ? "#1A1A1A" : "white",
                      
                  },
                ]}
              >
                <Text style={[styles.packageInfo,
                  {
                    color:
                      selectedPackageId.id === item.id ? "#E8E8D1" : "#1A1A1A",

                     fontWeight:
                     selectedPackageId.id === item.id ? 'bold' : '',
                  },,]}>{item.paketTuru}</Text>
                <Text style={[styles.packageInfo,
                  {
                    color:
                      selectedPackageId.id === item.id ? "#E8E8D1" : "#1A1A1A",

                     fontWeight:
                     selectedPackageId.id === item.id ? 'bold' : '',
                  },,]}>
                  Ders Sayisi: {item.dersSayisi}
                </Text>
                <Text style={[styles.packageInfo,
                  {
                    color:
                      selectedPackageId.id === item.id ? "#E8E8D1" : "#1A1A1A",

                     fontWeight:
                     selectedPackageId.id === item.id ? 'bold' : '',
                  },,]}>
                  Paket Süresi: {item.paketSuresi} Ay
                </Text>
                <Text style={[styles.packageInfo,
                  {
                    color:
                      selectedPackageId.id === item.id ? "#E8E8D1" : "#1A1A1A",

                     fontWeight:
                     selectedPackageId.id === item.id ? 'bold' : '',
                  },,]}>
                  Paket Fiyati:{" "}
                  {
                    Number(item.paketFiyati)
                      .toLocaleString("tr-TR", {
                        style: "currency",
                        currency: "TRY",
                      })
                      .split(",")[0]
                  }
                </Text>
              </TouchableOpacity>
            )}
          />
          <View style={{flexDirection:'row'}}>
          <TouchableOpacity
            onPress={() => addPackage()}
            style={styles.closeButton}
          >
            <Text style={{ color: "black",paddingHorizontal:20,fontSize:15,fontWeight:'bold' }}>Ekle</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleCloseModal}
            style={styles.closeButton}
          >
            <Text style={{ color: "black",paddingHorizontal:20,fontSize:15,fontWeight:'bold' }}>Kapat</Text>
          </TouchableOpacity>
          </View>
       
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "white",
    padding:10,
    borderWidth: 2,
    borderColor: "#E8E8D1",
    backgroundColor: "#ffdf00",
    alignItems: "center",
    borderRadius: 10,
    width: "70%",
    maxHeight: "50%",
  },
  packageList: {
    borderWidth: 1,
    borderColor: "gray",
    padding: 10,
    borderRadius: 5,
    width: "100%",
    marginBottom: 10,
  },
  packageInfo: {
    fontSize: 16,
    marginBottom: 5,
  },
  closeButton: {
    marginTop: 20,
  },
});
