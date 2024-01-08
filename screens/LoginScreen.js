import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  KeyboardAvoidingView,
  Image,
  TouchableOpacity,
  Switch,
} from "react-native";
import { auth } from "../firebase";
import { useNavigation } from "@react-navigation/native";
import { firestore } from "../firebase";
import inputStyle from "../Styles/İnputStyle";
import { doc, setDoc } from "@firebase/firestore";
export default function LoginScreen() {
  const [showNameInput, setShowNameInput] = useState(false);
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [email, setEmail] = useState("sertac@gmail.com");
  const [password, setPassword] = useState("lm5bll88a");
  const [name, setName] = useState("");
  const [telefon, setTelefon] = useState("");
  const [size, setSize] = useState("");
  const [weight, setWeight] = useState("");
  const navigation = useNavigation();
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        // Kullanıcı oturum açtı
        const userProperties = { email: user.email, uid: user.uid }; // Sadece gerekli özellikleri içeren bir nesne
        if (user.email === "admin@kaplanfight.com") {
          // Admin kontrolü
          navigation.replace("Admin", { loginUser: userProperties });
          console.log("Admin Giriş yaptı", user.email);
        } else {
          // Diğer kullanıcılar
          navigation.replace("Home", { loginUser: userProperties });
          console.log("Normal kullanıcı Giriş yaptı", user.email);
        }
      }
    });

    return () => {
      unsubscribe(); // useEffect temizleme fonksiyonu
    };
  }, [navigation]);

  const handleSwitchToggle = (value) => {
    setIsRegisterMode(value);
    setShowNameInput(value); // Eğer register moddaysa, isim soyisim input'u göster
  };

  const handleButtonClick = async () => {
    try {
      if (isRegisterMode) {
        // Kayıt ol butonuna tıklanınca yapılacak işlemler

        const userCredential = await auth.createUserWithEmailAndPassword(
          email,
          password,
        );
        const user = userCredential.user;
        const usersCollection = firestore.collection("userss");
        const userId = user.uid;
        //firestore ekleme kısmı
        await setDoc(doc(usersCollection, userId), {
          email: user.email,
          id: userId,
          name: name,
          telefon: telefon,
          boy: size,
          kilo: weight,
          yetki: "Yok",
          toplamDers: 0,
        });

        console.log("Kullanıcı kayıt oldu", user.email);
      } else {
        // Giriş yap butonuna tıklanınca yapılacak işlemler
        const userCredential = await auth.signInWithEmailAndPassword(
          email,
          password,
        );
        const user = userCredential.user;
        const userId = user.uid;

        // Firestore ekleme
        console.log("Kullanıcı giriş yaptı", user.email);
      }
    } catch (error) {
      console.error("İşlem hatası:", error);
      alert("Bir hata oluştu: " + error.message);
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <View style={styles.imageContainer}>
        <Image
          style={styles.logoİmg}
          source={require("../img/kaplanLogo.png")}
        />
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          marginTop: -40,
          marginBottom:20
        }}
      >
        <Text
          style={{
            color: isRegisterMode ? "grey" : "green",
            fontWeight: "bold",
          }}
        >
          Giriş Yap
        </Text>
        <Switch
          value={isRegisterMode}
          onValueChange={handleSwitchToggle}
          trackColor={{ false: "grey", true: "grey" }}
          thumbColor={isRegisterMode ? "grey" : "grey"}
        />
        <Text
          style={{
            color: isRegisterMode ? "green" : "grey",
            fontWeight: "bold",
          }}
        >
          Kayıt Ol
        </Text>
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={inputStyle.loginİnput}
          placeholder="Email"
          placeholderTextColor="black"
          value={email}
          onChangeText={(text) => setEmail(text)}
          autoCapitalize="none"
        />
        <TextInput
          style={inputStyle.loginİnput}
          placeholder="Şifre"
          placeholderTextColor="black"
          value={password}
          onChangeText={(password) => setPassword(password)}
          autoCapitalize="none"
          secureTextEntry={true}
        />
        {showNameInput && (
          <TextInput
            style={inputStyle.loginİnput}
            placeholderTextColor="black"
            value={name}
            onChangeText={(name) => setName(name)}
            placeholder="İsim Soyisim"
          />
        )}
        {showNameInput && (
          <TextInput
            style={inputStyle.loginİnput}
            placeholderTextColor="black"
            value={telefon}
            keyboardType="numeric"
            onChangeText={(telefon) => setTelefon(telefon)}
            placeholder="Telefon"
          />
        )}
        <View style={styles.sizeAndWeight}>
          {showNameInput && (
            <TextInput
              style={inputStyle.sizeAndWeightİnput}
              placeholderTextColor="black"
              value={size}
              keyboardType="numeric"
              onChangeText={(size) => setSize(size)}
              placeholder="Boy"
            />
          )}
          {showNameInput && (
            <TextInput
              style={inputStyle.sizeAndWeightİnput}
              placeholderTextColor="black"
              value={weight}
              keyboardType="numeric"
              onChangeText={(weight) => setWeight(weight)}
              placeholder="Kilo"
            />
          )}
        </View>
      </View>

      {showNameInput && (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        ></View>
      )}

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.outlineButton]}
          onPress={handleButtonClick}
        >
          <Text style={styles.buttonText}>
            {isRegisterMode ? "Kayıt Ol" : "Giriş Yap"}
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
    width:'100%'
  },

  inputContainer: {
    width: "100%",
    alignItems:'center'
  },
  sizeAndWeight: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    margin: 2,
    padding: 2,
  },

  buttonContainer: {
    marginTop: 20,
    width: "60%",
  },
  genderText: {
    color: "#ffdf00",
  },
  button: {
    margin: 5,
    height: 35,
    borderRadius: 20,
    backgroundColor: "black",
    borderWidth: 2,
    borderColor: "#ffdf00",
    alignItems: "center",
    justifyContent: "center",
  },
  outlineButton: {
    fontWeight: "bold",
    color: "red",
  },
  buttonText: {
    fontWeight: "bold",
    color: "#ffdf00",
  },

  logoİmg: {
    width: 350,
    height: 350,
  },
  imageContainer: {},
});
