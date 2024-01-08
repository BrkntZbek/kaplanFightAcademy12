import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";

export default function LessonsList({ lessons, handleLessonPress }) {
  // Tarih formatını düzenleyen yardımcı bir fonksiyon
  const formatLessonDate = (lesson) => {
    const lessonDate = lesson.tarih.toDate(); // Firebase Timestamp'ını JavaScript Date objesine çevir
    const options = { day: "numeric", month: "long", year: "numeric" }; // Tarih formatı seçenekleri
    const formattedDate = lessonDate.toLocaleDateString("tr-TR", options);
    return formattedDate;
  };

  return (
    <View style={styles.lessons}>
      <FlatList
        style={{ flex: 1 }}
        data={lessons}
        keyExtractor={(item, index) => index.toString()}
        numColumns={1}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            onPress={() => handleLessonPress(item)}
            style={styles.touchableContainer}
          >
            <View style={styles.FlatList}>
              <View style={styles.container}>
                <View style={{ alignItems: "center" }}>
                  <Text
                    style={{
                      fontSize: 18,
                      color: "#1A1A1A",
                       fontWeight:'bold'
                    }}
                  >{` ${item.ogrenci}`}</Text>
                </View>

                <View style={styles.lessonsContent}>
                  <Text style={{ width: "45%" }}>{` ${item.hoca}`}</Text>
                  <Text style={styles.text}>{` ${formatLessonDate(
                    item,
                  )}`}</Text>
                  <Text style={styles.text}>{` ${item.saat}`}</Text>
                </View>
              </View>

              <View
                style={{
                  alignItems: "flex-start",
                  justifyContent: "center",
                  borderLeftWidth: 2,
                  width: "26%",
                }}
              >
                <Text
                  style={{
                    marginLeft: -20,
                    color:
                      item.durum === "İşlenmedi"
                        ? "#BF3624"
                        : item.durum === "İptal"
                          ? "red"
                          : item.durum === "İşlendi"
                            ? "green"
                            : item.durum === "Geç İptal"
                            ? "black"
                            :"black",
                    marginLeft: 20,
                    fontWeight:'bold'
                  }}
                >{` ${item.durum}`}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  lessons: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10,
    backgroundColor: "black",
    paddingTop: 15,
  },
  container: {
    width: "75%",
    height: "100%",
  },

  FlatList: {
    borderWidth: 2,
    borderRadius: 10,
    margin: 2,
    borderWidth: 1,
    borderColor:'#999999',
    backgroundColor: "white",
    width: "100%", // Genişliği daha küçük bir değerle ayarlayabilir veya flex ekleyebilirsiniz
    height: "auto",
    flexDirection: "row", // Öğeleri yatayda sırala
    justifyContent: "center", // Yatayda ortala
    alignItems: "center", // Dikeyde ortal
  },
  lessonsContent: {
    flexDirection: "row",
    padding: 3,
    paddingRight: 5,
    paddingTop: 10,
  },
  text: {
    width: "40%",
  },
});
