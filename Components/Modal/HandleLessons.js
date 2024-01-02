import { StyleSheet, Text, View, Modal, TouchableOpacity, TextInput, Alert } from "react-native";
import React, { useState, useEffect, useRef } from "react";
import buttonStyle from "../../Styles/ButtonStyle";
import inputStyle from "../../Styles/İnputStyle";
import { cancelledLesson } from "../../firebase";
import TextStyle from "../../Styles/TextStyle";
import { teachALesson } from "../../firebase";
import HandleArea from "../DerslerScreen/HandleArea";

export default function HandleLessons({
  selectLesson,
  handleLessonsVisible,
  handleCloseModal,
}) {
  const [lessonDetail, setLessonDetail] = useState("Açıklama Yok");
  const [AreaChart, setArea] = useState([]);
  const [visible, setVisible] = useState(true);
  const [confirmationVisible, setConfirmationVisible] = useState(false);
  const [gecİptal,setGecİptal] = useState(false);
  const TextInputRef = useRef(null);

  const cancel = () => {
    if (!confirmationVisible) {
      Alert.alert(
        "İptal Et",
        "İptal etmek istediğinize emin misiniz?",
        [
          {
            text: "Hayır",
            onPress: () => {},
            style: "cancel",
          },
          {
            text: "Evet",
            onPress: () => setConfirmationVisible(true),
          },
        ],
        { cancelable: false }
      );
    } else {
      const durum = "İptal";
      cancelledLesson(selectLesson,durum);
      handleCloseModal();
    }
  };
  const lateCancellation = () =>{
    if(!gecİptal){
      Alert.alert('Gec İptal',"İptal etmek istediğinize emin misiniz?",[
        {
          text:"Hayır",
          onPress: () => {},
          style:"cancel",
        },
        {
          text:"Evet",
          onPress: ( ) =>  setGecİptal(true),
        },
      ],
      {cancelable:false});
    }
    else{
      const durum = "Geç İptal";
      cancelledLesson(selectLesson,durum);
    }

  }

  const areaChartString = AreaChart.join(', ');

  const handleBlur = () => {
    if (TextInputRef.current) {
      TextInputRef.current.blur();
    }
  };

  const handleLessonInput = (text) => {
    setLessonDetail(text);
  };

  const teachALessonPress = () => {
    teachALesson(selectLesson, lessonDetail, areaChartString);
    handleCloseModal();
  };

  useEffect(() => {
    if (selectLesson.durum === "İşlendi" || selectLesson.durum === "İptal") {
      setVisible(false);
    } else {
      setVisible(true);
    }
  }, [selectLesson.durum]);

  return (
    <Modal
      transparent={true}
      animationType="slide"
      visible={handleLessonsVisible}
      onRequestClose={handleCloseModal}
    >
      <View style={styles.container}>
        <Text style={TextStyle.nameStyle}>{selectLesson.ogrenci}</Text>
        <View style={styles.modalContent}>
          <View style={styles.LessonContent}>
            <Text style={TextStyle.normalText}>{selectLesson.hoca}</Text>
            <Text style={TextStyle.normalText}>{selectLesson.saat}</Text>
            <View style={styles.inputContainer}>
              {selectLesson.durum !== "İşlendi" &&
                selectLesson.durum !== "İptal" &&
                selectLesson.durum !== "Geç İptal" && (
                  <View style={{ height: "80%", width: "100%",alignItems:'center' }}>
                    <TextInput
                      ref={TextInputRef}
                      style={inputStyle.handleLessonİnput}
                      placeholderTextColor="black"
                      placeholder="Ders Ayrıntısı"
                      multiline={true}
                      onChangeText={(text) => handleLessonInput(text)}
                    />
                    {lessonDetail !== null && (
                      <TouchableOpacity onPress={handleBlur}>
                        <Text style={{fontSize:15,fontWeight:'bold',marginBottom:5}}>Onayla</Text>
                      </TouchableOpacity>
                    )}
                    <HandleArea setArea={setArea} />
                  </View>
                )}

              {selectLesson.durum !== "İşlenmedi" && (
                <View style={styles.contentsContainer}>
                  <Text style={{ fontWeight: "bold", fontSize: 17 }}>
                    Ders İçeriği
                  </Text>
                  <View style={styles.contents}>
                    <Text style={{ fontSize: 15 }}>
                      {selectLesson.ayrinti}{" "}
                    </Text>
                    <Text style={{fontSize:15,fontWeight:'bold',marginTop:5}}>-Çalışılan Bölgeler-</Text>
                    <Text style={{marginTop:10}}>{selectLesson.calisilanBolge}</Text>
                  </View>
                </View>
              )}
            </View>
          </View>
          <View style={styles.buttonContainer}>
            {selectLesson.durum === "İşlenmedi" && (
              <>
                <TouchableOpacity onPress={teachALessonPress}>
                  <Text style={buttonStyle.contentButtonLesson}>
                    Dersi işle
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={cancel}>
                  <Text style={buttonStyle.contentButtonLesson}>İptal</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={lateCancellation}>
                  <Text style={buttonStyle.contentButtonLesson}>Geç İptal</Text>
                </TouchableOpacity>
              </>
            )}
            <TouchableOpacity onPress={handleCloseModal}>
              <Text style={buttonStyle.contentButtonLesson}>Kapat</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "70%",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  contentsContainer: {
    alignItems: "center",
    borderTopWidth: 1,
    marginTop: 5,
    borderBottomWidth: 1,
    padding: 5,
    height: "65%",
  },
  contents: {
    marginTop: 10,
    alignItems:'center'
  },
  LessonContent: {
    alignItems: "center",
  },
  inputContainer: {
    width: 300,
  },

  buttonContainer: {
    marginTop: -10,
    flexDirection: "row",
    alignItems: "center",
  },
  inputcu: {
    color: "red",
    borderWidth: 1,
    borderColor: "#ffdf00",
    width: "100%",
    height: "50%",
  },
  modalContent: {
    borderWidth: 2,
    alignItems: "center",
    borderColor: "white",
    backgroundColor: "#E8E5D1",
    borderRadius: 10,
    width: "90%",
    height: "60%",
  },
  buttonText: {
    color: "red",
  },
});
