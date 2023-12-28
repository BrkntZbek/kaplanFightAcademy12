import { StyleSheet, Text, View, Modal, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import { doc, setDoc, updateDoc } from "@firebase/firestore";
import { addLesson, updateStudentsLesson } from "../../firebase";
import ModalDropdown from "react-native-modal-dropdown";
import { fetchTeacher } from "../../firebase";
import buttonStyle from "../../Styles/ButtonStyle";
import { Timestamp } from "@firebase/firestore";
import Toast from "react-native-toast-message";
export default function AddLessonModal({
  isVisible,
  selectedStudent,
  firestore,
  handleCloseAddModal,
  packageInfo,
}) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [teachers, setTeachers] = useState([]);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [selectedTime, setSelectedTime] = useState("saat seç");
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleDateChange = (event, date) => {
    if (date !== undefined) {
      setSelectedDate(date);
    }
    setShowDatePicker(false);
  };

  const generateTimeRange = () => {
    const times = [];
    for (let hour = 6; hour <= 23; hour++) {
      times.push(`${hour < 10 ? "0" : ""}${hour}:00`);
    }
    return times;
  };

  const timeItems = generateTimeRange();

  useEffect(() => {
    setTeachers([]);
    fetchTeacher(setTeachers);
  }, [setTeachers]);

  const handleAddLesson = async () => {
    addLesson(
      selectedDate,
      selectedStudent,
      selectedTeacher,
      selectedTime,
      packageInfo,
    );
    handleCloseAddModal();
    Toast.show({
      type: "error",
      text1: "Paket Eklendi",
      text2: `${selectedStudent.name} adlı öğrenciye Ders Eklendi`,
    });
  };

  return (
    <Modal
      transparent={true}
      animationType="slide"
      visible={isVisible}
      onRequestClose={handleCloseAddModal}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.headerText}>Ders Ekle</Text>
          <View style={styles.input}>
            <TouchableOpacity onPress={() => setShowDatePicker(true)}>
              <Text style={styles.dateText}>
                {selectedDate.toLocaleDateString("tr")}
              </Text>
            </TouchableOpacity>
            {showDatePicker && (
              <View style={styles.inputView}>
                <DateTimePicker
                  value={selectedDate}
                  mode="date"
                  display="compact"
                  onChange={handleDateChange}
                  locale="tr"
                  minuteInterval={60}
                  style={styles.dateTimePicker}
                />
              </View>
            )}
            <View style={styles.inputView}>
              <ModalDropdown
                options={timeItems}
                defaultValue={selectedTime}
                onSelect={(index, value) => setSelectedTime(value)}
                style={styles.dropdown}
                textStyle={styles.dropdownText}
                dropdownStyle={styles.dropdownStyle}
                renderRow={(option, index, isSelected) => (
                  <Text
                    style={{
                      padding: 10,
                      fontSize: 16,
                      color: isSelected ? "#ffdf00" : "black",
                    }}
                  >
                    {option}
                  </Text>
                )}
              />
            </View>
            <View style={styles.inputView}>
              <ModalDropdown
                options={teachers.map((teacher) => teacher.name)}
                defaultValue={selectedTeacher || "Hoca Seçiniz"}
                onSelect={(index, value) => setSelectedTeacher(value)}
                style={styles.dropdown}
                textStyle={styles.dropdownText}
                initialScrollIndex={0}
                dropdownStyle={styles.dropdownStyle}
                renderRow={(option, index, isSelected) => (
                  <Text
                    style={{
                      padding: 10,
                      fontSize: 16,
                      color: isSelected ? "#ffdf00" : "black",
                    }}
                  >
                    {option}
                  </Text>
                )}
              />
            </View>
          </View>
          <View style={{ flexDirection: "row", height: "auto" }}>
            <TouchableOpacity onPress={handleAddLesson}>
              <Text style={buttonStyle.contentButtonLesson}>Ders Ekle</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleCloseAddModal}>
              <Text style={buttonStyle.contentButtonLesson}>Kapat</Text>
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
    margin: 5,
  },
  inputView: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 10,
    margin: 5,
  },
  dateTimePicker: {
    alignItems: "center",
    width: "auto",
    marginEnd: 10,
  },
  dateText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  input: {
    alignItems: "center",
    justifyContent: "center",
    width: "90%",

    height: "50%",
  },
  modalContent: {
    backgroundColor: "#E8E8D1",
    padding: 5,
    margin: 5,
    borderWidth: 2,
    borderColor: "#ffdf00",
    borderRadius: 10,
    alignItems: "center",
    width: "70%",
    maxHeight: "50%",
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  datePicker: {
    width: 120,
    marginRight: 20,
  },
  addButton: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});
