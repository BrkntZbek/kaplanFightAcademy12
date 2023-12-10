import { StyleSheet, Text, View, TextInput, TouchableOpacity, StatusBar, Button, Alert, ActivityIndicator, Image } from 'react-native'
import React, { useState } from 'react'
import * as ImagePicker from "expo-image-picker";
import İnputStyle from "../../Styles/İnputStyle"
import Header from "../Header/Header"
import { addBlog, listFiles, uploadToFirebase, uploadImage } from '../../firebase'

export default function AddBlogPage() {
    const [title, setTitle] = useState("")
    const [contents, setContents] = useState("")
    const [image, setImage] = useState(null)
    const [uploading, setUploading] = useState(false)

    const [permission, requestPermission] = ImagePicker.useCameraPermissions();
    const [files, setFiles] = useState([]);

    const Blog = () => {
        addBlog(title, contents, image)
        console.log(`${title} adlı blog eklendi`);
    }

    const takePhoto = async () => {
        try {
          const cameraResp = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            quality: 1,
          });

          if (!cameraResp.canceled) {
            const { uri } = cameraResp.assets[0];
            const fileName = uri.split("/").pop();
            const uploadResp = await uploadToFirebase(uri, fileName, (v) =>
              console.log(v)
            );
            console.log(uploadResp);

            listFiles().then((listResp) => {
              const files = listResp.map((value) => {
                return { name: value.fullPath };
              });

              setFiles(files);
            });
          }
        } catch (e) {
          Alert.alert("Error Uploading Image " + e.message);
        }
      };

      const pickImage = async () => {
          let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All, // We can specify whether we need only Images or Videos
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,   // 0 means compress for small size, 1 means compress for maximum quality
          });

          console.log(result);

          if (!result.cancelled) {
            setImage(result.uri);
          }
        };


        // permission check
  if (permission?.status !== ImagePicker.PermissionStatus.GRANTED) {
    return (
      <View style={{marginTop:50}}>
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
                    placeholder='Başlık'
                    value={title}
                    onChangeText={setTitle}
                    style={İnputStyle.loginİnput}
                />
                <TextInput
                    placeholder='İçerik'
                    value={contents}
                    onChangeText={setContents} 
                    style={İnputStyle.loginİnput}
                />
                <Button title="FOTO ÇEK" onPress={takePhoto}></Button>
                <View style={styles.container}>
                {image && <Image source={{uri: image}} style={{width: 170 , height: 200}}/>}
                <Button title='Select Image' onPress={pickImage} />
                {!uploading ? <Button title='Upload Image' onPress={() => uploadImage(image, setImage, setUploading)} />: <ActivityIndicator size={'small'} color='black' />}
                </View>
            </View>
            <TouchableOpacity onPress={Blog}>
                <Text>Ekle</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    addBlogContainer:{
        flex:1,
        alignItems:'center',
        marginBottom:30,
        marginTop:30
    },
    addBlogContent:{
        width:'80%',

    }
})
