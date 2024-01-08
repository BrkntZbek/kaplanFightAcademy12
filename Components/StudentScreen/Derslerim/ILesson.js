import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { fetchUserLesson } from "../../../firebase";
import LessonDetail from "./LessonDetail";

export default function ILesson({ id }) {
  const [lessons, setLessons] = useState([]);
  const [selectedLesson, setSelectedLesson] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLessons([]);
      await fetchUserLesson(id, setLessons);
    };

    fetchData();
  }, []);

  const formatLessonDate = (lesson) => {
    const lessonDate = lesson.tarih.toDate();
    const options = { day: "numeric", month: "long", year: "numeric" };
    const formattedDate = lessonDate.toLocaleDateString("tr-TR", options);
    return formattedDate;
  };

  const handleLessonPress = (lesson) => {
    // Seçilen dersi state'e kaydet
    setSelectedLesson(lesson);
    
  };

  return (
    <View style={styles.infoContainer}>
      <View style={styles.textContainer}>
        <View style={styles.nameContainer}>
          <Text style={styles.nameText}>Dersler</Text>
        </View>
        <View style={styles.info}>
          <FlatList
            style={{ flex: 1 }}
            data={lessons}
            keyExtractor={(item, index) => index.toString()}
            numColumns={1}
            renderItem={({ item, index }) => (
              <TouchableOpacity onPress={() => handleLessonPress(item)}>
                 <View style={[styles.FlatList, { backgroundColor: selectedLesson === item ? "#FFDF00" : "#1A1A1A" ,borderColor:'#1A1A1A'}]}>
                  <View>
                    <Text style={[styles.text,{color:selectedLesson === item ? "#1A1A1A": "#E8E8D1",fontWeight:'bold'}]}>{` ${item.hoca}`}</Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      padding: 5,
                      alignItems: "flex-start",
                    }}
                  >
                    <Text style={[styles.text,{color:selectedLesson === item ? "#1A1A1A": "#E8E8D1",fontWeight:'bold'}]}>{` ${formatLessonDate(item)}`}</Text>
                    <Text style={[styles.text,{color:selectedLesson === item ? "#1A1A1A": "#E8E8D1",fontWeight:'bold'}]}>{` ${item.saat}`}</Text>
                  </View>
                  <Text style={[styles.text,{color:selectedLesson === item ? "#1A1A1A": "#E8E8D1",fontWeight:'bold'}]}>{` ${item.durum}`}</Text>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
        <View>
          {selectedLesson && <LessonDetail selectedLesson={selectedLesson} />}
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  nameContainer: {
    borderBottomWidth: 2,
    width: "100%",
    alignItems: "center",

    borderBottomEndRadius: 30,
  },
  text: {
    marginRight: 20,
    color: "#E8E2D1",
  },
  endeksCont: {
    marginTop: 60,
    height: "auto",
    width: "100%",
  },
  nameText: {
    fontWeight: "bold",
    fontSize: 30,
  },
  FlatList: {
    backgroundColor: "white",
    width: "100%",
    alignItems: "center",
    paddingHorizontal: 20,
    backgroundColor: "#1a1a1a",
    borderWidth: 1,
    borderColor: "#FFDF00",
    borderRadius: 10,
    marginTop: 5,
  },
  info: {
    height: "100%",
    width: "100%",
    justifyContent: "start",
    marginTop: 10,
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "black",
  },
  textContainer: {
    height: "70%",
    padding: 30,

    borderTopLeftRadius: 90,
    alignItems: "center",
    justifyContent: "start",
  },
  kkText: {
    color: "black",
    fontSize: 15,
    margin: 10,
    padding: 10,
    borderWidth: 2,
    borderColor: "black",
    borderRadius: 20,
  },
  infoContainer: {
    backgroundColor: "#E8E8D1",
    width: "100%",
    height: "90%",
    borderTopLeftRadius: 90,
    borderBottomLeftRadius: 50,
    marginTop: 18,
    borderColor: "black",
    justifyContent: "flex-start",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0.5,
    },
    shadowOpacity: 0,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
