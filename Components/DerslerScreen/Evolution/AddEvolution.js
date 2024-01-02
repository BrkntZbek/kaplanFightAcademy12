import { StyleSheet, Text, View, Modal, TouchableOpacity, TextInput, StatusBar, Button, Image } from 'react-native';
import React, { useState } from 'react';
import inputStyle from '../../../Styles/İnputStyle';
import * as ImagePicker from "expo-image-picker";
import { uploadImage } from '../../../firebase';
import { uploadEvolution } from '../../../firebase';

export default function AddEvolution({
  isVisible,
  selectedStudent,
  handleCloseAddModal
}) {
  const [image, setImage] = useState(null);
  const [boy, setBoy] = useState('');
  const [kilo, setKilo] = useState('');
  const [kolCm, setKolCm] = useState('');
  const [belCm, setBelCm] = useState('');
  const [bacakCm, setBacakCm] = useState('');

  const [permission, requestPermission] = ImagePicker.useCameraPermissions();

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.uri);
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
    uploadImage(image, setImage);
    console.log(image)
    uploadEvolution(userId, boy, kilo, kolCm, belCm, bacakCm, image);
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
            </TouchableOpacity>
          </View>
          <View style={styles.input}>
            <TextInput
              placeholder='boy'
              style={inputStyle.sizeAndWeightİnput}
              value={boy}
              onChangeText={text => setBoy(text)}
            />
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