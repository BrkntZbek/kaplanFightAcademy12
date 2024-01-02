import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StatusBar,
  Button,
  Alert,
  ActivityIndicator,
  Image,
} from "react-native";
import React, { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import İnputStyle from "../../Styles/İnputStyle";
import Header from "../Header/Header";
import {
  addBlog,
  listFiles,
  uploadToFirebase,
  uploadImage,
} from "../../firebase";
import buttonStyle from "../../Styles/ButtonStyle";
export default function AddBlogPage() {
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);

  const [permission, requestPermission] = ImagePicker.useCameraPermissions();
  const [files, setFiles] = useState([]);

  const Blog = () => {
    addBlog(title, contents, image);
    console.log(`${title} adlı blog eklendi`);
    console.log("fotoğraf url:", image);
    setTitle("");
    setContents("");
    setImage(null);
  };

 

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All, // We can specify whether we need only Images or Videos
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1, // 0 means compress for small size, 1 means compress for maximum quality
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.uri);
    }
  };

  // permission check
  if (permission?.status !== ImagePicker.PermissionStatus.GRANTED) {
    return (
      <View style={{ marginTop: 50 }}>
        <Text>Permission Not Granted - {permission?.status}</Text>
        <StatusBar style="auto" />
        <Button title="Request Permission" onPress={requestPermission}></Button>
      </View>
    );
  }

  return (
    <View style={styles.addBlogContainer}>
      <Header />
      <Text style={{ fontSize: 20 }}>Blog Ekle</Text>
      <View style={styles.addBlogContent}>
        <TextInput
          placeholder="Başlık"
          value={title}
          onChangeText={setTitle}
          style={İnputStyle.loginİnput}
        />
        <TextInput
          placeholder="İçerik"
          value={contents}
          onChangeText={setContents}
          multiline={true}
          style={İnputStyle.contextİnptut}
        />

        <View style={styles.container}>
          {image && (
            <Image
              source={{ uri: image }}
              style={{ width: 170, height: 200 }}
            />
          )}
          
          <TouchableOpacity style={styles.button} onPress={pickImage}>
            <Text style={buttonStyle.contentButtonLesson}>Fotoğraf Seç</Text>
          </TouchableOpacity>
          {!uploading ? (
            <TouchableOpacity
              style={styles.button}
              onPress={() => uploadImage(image, setImage, setUploading)}
            >
              <Text style={buttonStyle.contentButtonLesson}>
                Fotoğrafı Yükle
              </Text>
            </TouchableOpacity>
          ) : (
            <ActivityIndicator size={"small"} color="black" />
          )}
        </View>
      </View>
      <TouchableOpacity onPress={Blog}>
        <Text style={buttonStyle.contentButtonLesson}>Ekle</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  addBlogContainer: {
    flex: 1,
    alignItems: "center",

    backgroundColor:'#1A1A1A'
  },
  addBlogContent: {
    width: "80%",
  },
  container: {
    alignItems: "center",
    width: "100%",
  },
});
