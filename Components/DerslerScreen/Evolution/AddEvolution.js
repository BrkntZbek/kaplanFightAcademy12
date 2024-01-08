import { StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StatusBar,
  Button,
  Alert,
  ActivityIndicator,
  Modal,
  Image,} from 'react-native';
import React, { useState } from 'react';
import inputStyle from '../../../Styles/İnputStyle';
import * as ImagePicker from "expo-image-picker";
import { uploadImage } from '../../../firebase';
import { uploadEvolution } from '../../../firebase';
import buttonStyle from '../../../Styles/ButtonStyle';
export default function AddEvolution({
  isVisible,
  selectedStudent,
  handleCloseAddModal
}) {
  const [image, setImage] = useState(null);

  const [kilo, setKilo] = useState(0);
  const [kolCm, setKolCm] = useState(0);
  const [belCm, setBelCm] = useState(0);
  const [bacakCm, setBacakCm] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [permission, requestPermission] = ImagePicker.useCameraPermissions();

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };
  if (permission?.status !== ImagePicker.PermissionStatus.GRANTED) {
    return (
      <View style={{ marginTop: 50 }}>
        <Text>Permission Not Granted - {permission?.status}</Text>
        <StatusBar style="auto" />
        <Button title="Request Permission" onPress={requestPermission}></Button>
      </View>
    );
  }

  const add = () => {
    const userId = selectedStudent.id;
    console.log(image)
    uploadEvolution(userId,  kilo, kolCm, belCm, bacakCm, image);
  };

  return (
    <Modal
      transparent={true}
      animationType="slide"
      visible={isVisible}
      onRequestClose={handleCloseAddModal}>
      <View style={styles.container}>
        <View style={styles.modalContainer}>
          <View style={styles.upload}>
            <TouchableOpacity onPress={pickImage}>
              <Text style={{ color: 'white' }}>Fotoğraf seç</Text>
              {image && (
                <Image
                  source={{ uri: image }}
                  style={{ width: 170, height: 200, borderRadius: 15, borderWidth: 3, borderColor: 'gray' }}
                />
              )}
                  {!uploading ? (
            <TouchableOpacity
              style={styles.button}
              onPress={() => uploadImage(image, setImage, setUploading)}
            >
              <Text style={{color:'red'}}>
                Fotoğrafı Yükle
              </Text>
            </TouchableOpacity>
          ) : (
            <ActivityIndicator size={"small"} color="black" />
          )}
            </TouchableOpacity>
          </View>
          <View style={styles.input}>
         
            <TextInput
              placeholder='kilo'
              style={inputStyle.sizeAndWeightİnput}
              value={kilo}
              onChangeText={text => setKilo(text)}
            />
            <TextInput
              placeholder='kol cm'
              style={inputStyle.sizeAndWeightİnput}
              value={kolCm}
              onChangeText={text => setKolCm(text)}
            />
            <TextInput
              placeholder='bel cm'
              style={inputStyle.sizeAndWeightİnput}
              value={belCm}
              onChangeText={text => setBelCm(text)}
            />
            <TextInput
              placeholder='bacak cm'
              style={inputStyle.sizeAndWeightİnput}
              value={bacakCm}
              onChangeText={text => setBacakCm(text)}
            />
          </View>
        </View>
        <TouchableOpacity onPress={add}>
          <Text style={{ color: 'white' }}>Ekle</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleCloseAddModal}>
          <Text style={{ color: 'white' }}>KAPAT</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.9)',
  },
  input: {
    width: '50%',
    alignItems: 'flex-end',
  },
  modalContainer: {
    flexDirection: 'row',
  },
});