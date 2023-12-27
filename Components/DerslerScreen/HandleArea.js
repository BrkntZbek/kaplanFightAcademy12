import React, { useState, useRef, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, TextInput, Keyboard } from "react-native";

export default function HandleArea({ setArea }) {
  const [selectedAreas, setSelectedAreas] = useState([]);
  const [inputText, setInputText] = useState("");
  const inputRef = useRef(null);

  const availableAreas = [
    "Bacak",
    "Omuz",
    "Göğüs",
    "Sırt",
    "Triceps",
    "Biceps",
    "Karın",
    "Kalça",
    "Quadriceps",
    "Hamstring",
    "Calf",
  ];

  const handleAreaPress = (area) => {
    if (!selectedAreas.includes(area)) {
      setSelectedAreas((prevAreas) => [...prevAreas, area]);
      setInputText("");
    }
  };

  useEffect(() => {
    setArea(selectedAreas);
  }, [selectedAreas]);

  const isAreaSelected = (area) => {
    return selectedAreas.includes(area);
  };

  const handleTextInputFocus = () => {
    inputRef.current.focus();
  };

  const handleTextInputBlur = () => {
    Keyboard.dismiss();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Çalışılan Bölgeler</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.areasContainer}>
        <View style={styles.flexRowContainer}>
          {availableAreas.map((area, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => handleAreaPress(area)}
              style={[
                styles.area,
                { backgroundColor: isAreaSelected(area) ? "#FFDF00" : "white" },
              ]}
            >
              <Text>{area}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    borderTopWidth:1,
    borderRadius: 10,
    width: "100%",
    padding: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  areasContainer: {
    paddingHorizontal: 10,
  },
  flexRowContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    width:'44%',
    padding:5,
    justifyContent: "space-between",
  },
  area: {
    borderWidth: 1,
    borderRadius:10,
    padding: 5,
    marginVertical: 3,
    
    alignItems:'center',
    justifyContent:'center',
    width: "auto", // İki eleman yan yana sığması için genişlik ayarlayın
  },
  textInputContainer: {
    marginVertical: 10,
    width: "100%",
    alignItems: "center",
  },
  textInput: {
    borderWidth: 1,
    padding: 10,
    width: "80%",
  },
  selectedAreasTitle: {
    marginTop: 20,
    fontSize: 16,
    fontWeight: "bold",
  },
});