import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import TextStyle from "../../../Styles/TextStyle";
const BMI = ({ height, weight }) => {
  const [bmi, setBMI] = useState(null);

  useEffect(() => {
    calculateBMI();
  }, [height, weight]);

  const calculateBMI = () => {
    // Kullanıcının girdiği değerleri kontrol et
    const heightWithDot = height.replace(",", "."); // Virgülü noktaya çevir
    const heightInMeters = parseFloat(heightWithDot);
    const weightInKg = parseFloat(weight);

    // Girdilerin doğru olup olmadığını kontrol et
    if (
      isNaN(heightInMeters) ||
      isNaN(weightInKg) ||
      heightInMeters <= 0 ||
      weightInKg <= 0
    ) {
      console.error("Geçersiz boy veya kilo değeri.");
      // İşlemi sonlandır veya uygun bir şekilde işlem yap
      return;
    }

    // İşlemi gerçekleştir
    const heightSquared = Math.pow(heightInMeters, 2);
    const calculatedBMI = weightInKg / heightSquared;

    // Sonucu kontrol et
    if (isNaN(calculatedBMI)) {
      console.error("BMI hesaplanamadı.");
      // İşlemi sonlandır veya uygun bir şekilde işlem yap
      return;
    }

    // Sonucu set et
    setBMI(calculatedBMI.toFixed(2));
  };

  const getBMIStatus = (bmi) => {
    if (bmi < 18.5) {
      return "Zayıf";
    } else if (bmi >= 18.5 && bmi < 24.9) {
      return "Normal";
    } else if (bmi >= 24.9 && bmi < 29.9) {
      return "Kilolu";
    } else {
      return "Obez";
    }
  };

  const getPhotoForBMIStatus = (bmiStatus) => {
    switch (bmiStatus) {
      case "Zayıf":
        return require("../../../img/zayif.jpg");
      case "Normal":
        return require("../../../img/saglikli.jpg");
      case "Kilolu":
        return require("../../../img/kilolu.jpg");
      case "Obez":
        return require("../../../img/obez.jpg");
      default:
        return null;
    }
  };

  const bmiStatus =
    bmi !== null && !isNaN(bmi) ? getBMIStatus(parseFloat(bmi)) : null;

  return (
    <View style={styles.container}>
      {bmiStatus ? (
        <View style={styles.contentContainer}>
          <View style={styles.imageContainer}>
            <Image
              source={getPhotoForBMIStatus(bmiStatus)}
              style={styles.image}
            />
          </View>
          <View style={styles.textContainer}>
            <Text style={TextStyle.normalText}>Boy: {height}</Text>
            <Text style={TextStyle.normalText}>Kilo: {weight}</Text>
            <Text style={TextStyle.normalText}>Vücut indeksi: {bmi}</Text>
            <Text style={TextStyle.normalText}>Durum: {bmiStatus}</Text>
          </View>
        </View>
      ) : (
        <Text>Lütfen geçerli boy ve kilo değerleri girin.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "flex-start",
    marginTop: 100,
  },
  contentContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    width: "100%",
  },
  image: {
    width: 70,
    resizeMode: "stretch",
    height: 200,
  },
  imageContainer: {
    marginRight: 10,
    height: "100%",
  },
  textContainer: {
    alignItems: "flex-end",
    marginTop: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default BMI;
