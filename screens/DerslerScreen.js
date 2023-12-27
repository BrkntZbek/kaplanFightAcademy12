import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { fetchLessons, todaysLessons } from "../firebase";
import React, { useState, useEffect } from "react";
import Header from "../Components/Header/Header";
import HandleLessons from "../Components/Modal/HandleLessons";
import LessonsList from "../Components/DerslerScreen/LessonsList";
import { weeklyLessons } from "../firebase";
import { monthlyLessons } from "../firebase";
export default function DerslerScreen() {
  const [lessons, SetLessons] = useState([]);
  const [handleLessonsVisible, setHandleLessonsVisible] = useState(false);
  const [selectLesson, setSelectLesson] = useState([]);
  useEffect(() => {
    SetLessons([]);
    fetchLessons(SetLessons);
    console.log(lessons);
  }, [SetLessons]);
  console.log(lessons);
  const handleCloseModal = () => {
    setHandleLessonsVisible(false);
  };
  const handleLessonPress = (item) => {
    setSelectLesson(item);
    setHandleLessonsVisible(true);
  };
  const today = async () => {
    await todaysLessons(SetLessons);
  };
  const weekly = async () => {
    await weeklyLessons(SetLessons);
  };
  const monthly = async () => {
    await monthlyLessons(SetLessons);
  };
  const fullLesson = async () => {
    fetchLessons(SetLessons);
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.buttons}>
          <TouchableOpacity style={styles.button} onPress={today}>
            <Text style={styles.buttonText}>Bugün</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={weekly}>
            <Text style={styles.buttonText}>Bu Hafta</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={monthly}>
            <Text style={styles.buttonText}>Bu Ay</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={fullLesson}>
            <Text style={styles.buttonText}>Tüm</Text>
          </TouchableOpacity>
        </View>
        <LessonsList lessons={lessons} handleLessonPress={handleLessonPress} />
      </View>

      <HandleLessons
        selectLesson={selectLesson}
        handleLessonsVisible={handleLessonsVisible}
        handleCloseModal={handleCloseModal}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "black",
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  content: {
    marginTop: 40,
  },
  button: {
    backgroundColor: "#FFDF00",
    padding: 5,
    borderWidth: 1,

    margin: 12,
    borderRadius: 10,
    width: "20%",
    alignItems: "center",
    height: "auto",
    marginTop: 10,
  },
  buttons: {
    flexDirection: "row",
    backgroundColor: "#1a1a1a",
    width: "95%",
    borderRadius: 30,
    marginTop: 10,
  },
});
