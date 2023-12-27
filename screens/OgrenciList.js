import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
  TextInput,
  Modal,
} from "react-native";
import { firestore, firebase, auth } from "../firebase"; // Firestore bağlantısını içe aktarın
import { fetchStudents } from "../firebase";
import StudentsModal from "../Components/Modal/StudentsModal";

export default function OgrenciList() {
  const [students, setStudents] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [selectedStudent, setSelectedStudent] = useState([]);
  const [studentİnfoVisible, setStudentİnfoVisible] = useState(false);
  const handleStudentPress = (item) => {
    setSelectedStudent(item);
    setStudentİnfoVisible(true);
  };

  const handleCloseStudentModel = () => {
    setStudentİnfoVisible(false);
  };

  // Öğrencileri Listelemek için
  useEffect(() => {
    setStudents([]);
    fetchStudents(setStudents);
  }, [setStudents]);

  // İsme göre filtreleme fonksiyonu
  const filterStudents = () => {
    return students.filter((student) =>
      student.name.toLowerCase().includes(searchText.toLowerCase()),
    );
  };

  return (
    <View style={styles.container}>
      <View stlye={styles.search}>
        <TextInput
          style={styles.searchInput}
          placeholder="Arama"
          value={searchText}
          onChangeText={(text) => setSearchText(text)}
        />
      </View>

      <View style={styles.scrollViewContainer}>
        <FlatList
          style={{ flex: 1 }}
          data={filterStudents()}
          keyExtractor={(item, index) => index.toString()}
          numColumns={1}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              onPress={() => handleStudentPress(item)}
              style={styles.touchableContainer}
            >
              <View style={styles.FlatList}>
                <Text style={styles.text}>{` ${item.name}`}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>

      {/* Modal Ekranı */}

      <StudentsModal
        isVisible={studentİnfoVisible}
        selectedStudent={selectedStudent}
        firestore={firestore}
        handleCloseModal={handleCloseStudentModel}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  FlatList: {
    borderWidth: 2,
    borderRadius: 10,
    margin: 2,
    borderColor: "black", // borderBlockColor yerine borderColor kullanın
    backgroundColor: "#ffdf00",
    width: "100%", // Genişliği daha küçük bir değerle ayarlayabilir veya flex ekleyebilirsiniz
    height: "auto",
    justifyContent: "center",
    alignItems: "center", // Yukarıdan aşağıya sıralamak için

    backgroundColor: "rgba(255, 255, 0, 0.7)", // Sarı renginde ve hafif saydam (0.7 opacity)
  },

  buttons: {
    alignItems: "center",
  },
  paket: {
    borderWidth: 2,
    borderColor: "#ffdf00",
    borderRadius: 10,
    width: 200,
    alignItems: "center",
    marginBottom: 10,
  },
  Studentİnfo: {
    alignItems: "center",
    padding: 5,
    margin: 2,
  },
  modalContainer: {
    height: 100,
  },
  scrollViewContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10,
    backgroundColor: "black",
  },
  text: {
    padding: 15,
    color: "black",
    fontWeight: "bold",
  },
  textModal: {
    fontWeight: "bold",
    fontSize: 13,
    color: "#ffdf00",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Saydamlık için arkaplan rengi
  },
  modalContent: {
    backgroundColor: "white",
    padding: 40,
    borderWidth: 2,
    borderColor: "#ffdf00",
    backgroundColor: "black",
    borderRadius: 10,
    width: "80%", // Modal'ın genişliği
    maxHeight: "80%", // Modal'ın maksimum yüksekliği
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: "cover", // Resmin boyutunu düzenleme yöntemi
    borderRadius: 60, // İsteğe bağlı, köşeleri yuvarlamak için
    resizeMode: "cover", // Resmin boyutunu düzenleme yöntemi
    borderWidth: 2,
    borderColor: "black",
  },
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  searchInput: {
    marginTop: 50,
    borderWidth: 2,
    borderColor: "#E8E8D1",
    backgroundColor: "#ffdf00",
    fontSize: 15,
    fontWeight: "bold",
    textAlign: "center",
    margin: 10,
    padding: 10,
    borderRadius: 10,
  },
  nameContainer: {
    borderBottomWidth: 2,
    borderColor: "#ffdf00",
    width: "100%",
    alignItems: "center",

    borderBottomEndRadius: 30,
  },
});
