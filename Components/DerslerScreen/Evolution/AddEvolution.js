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
import { updateWeight, uploadImage } from '../../../firebase';
import { uploadEvolution } from '../../../firebase';

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
    updateWeight(selectedStudent,kilo);
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
            <View style={styles.buttons}>
            <TouchableOpacity onPress={pickImage}>
              <Text style={styles.buton}>Fotoğraf seç</Text>
              </TouchableOpacity>

              {!uploading ? (
            <TouchableOpacity
             
              onPress={() => uploadImage(image, setImage, setUploading)}
            >
              <Text style={styles.buton}>
                Fotoğrafı Yükle
              </Text>
            </TouchableOpacity>
          ) : (
            <ActivityIndicator size={"small"} color="red" />
          )}
            </View>
           
              <View style={{width:'80%',height:250,borderWidth:0.3,borderColor:'white',marginTop:10,borderRadius:10}}>
              {image && (
                <Image
                  source={{ uri: image }}
                  style={{ width:'100%',height:'100%', borderRadius: 10,borderWidth:1,marginTop:-0.5,marginLeft:-0.2}}
                />
              )}
               </View>
            
           
            
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
          <Text style={{ color: 'white',fontSize:25,marginBottom:20 }}>Ekle</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleCloseAddModal}>
          <Text style={{ color: 'white' ,fontSize:20}}>KAPAT</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width:'100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.9)',
  },
  input: {
    marginTop:10,
    width: '50%',
    alignItems: 'center',
    justifyContent:'center',
    flexDirection:'row'
  },
  modalContainer: {
   width:'100%',
   alignItems:'center'
  },
  upload:{
   borderWidth:0.3,
   borderColor:'white',
   borderRadius:10,
    width:'95%',
    height:'60%',
    alignItems:'center',
    justifyContent:'center'
  },
  buttons:{
    flexDirection:'row'
  },
  buton:{
    fontSize:15,
    marginHorizontal:10,
    color:'white',
    borderWidth:1,
    borderColor:'#999999',
    borderRadius:10,
    padding:5,
    backgroundColor:'#1A1A1A'
  }
});