import { StyleSheet, Text, View,Modal ,TouchableOpacity,TextInput} from 'react-native'
import React,{useState,useEffect,useRef} from 'react'
import buttonStyle from '../../Styles/ButtonStyle'
import inputStyle from '../../Styles/İnputStyle'
import { cancelledLesson } from '../../firebase'
import TextStyle from '../../Styles/TextStyle'
import { teachALesson } from '../../firebase'
export default function HandleLessons({ selectLesson, handleLessonsVisible, handleCloseModal }) {
  const [lessonDetail, setLessonDetail] = useState(null);
  const [visible, setVisible] = useState(true);
  const [lessonDetails, setLessonDetails] = useState([]);
  const TextInputRef = useRef(null);
  const cancel = () => {
    cancelledLesson(selectLesson);
    handleCloseModal();
  };
  const handleBlur = () => {
    if (TextInputRef.current) {
      TextInputRef.current.blur();
      // TextInput'den çıkarken lessonDetail değerini sıfırlayabilirsiniz
     
    }
  };

  const handleLessonInput = (text) => {
    setLessonDetail(text);
    // Gelen veriyi lessonDetails dizisine ekleyebilirsiniz
    
  };

  const teachALessonPress = () => {
    teachALesson(selectLesson, lessonDetail);
    handleCloseModal();
  };

  useEffect(() => {
    if (selectLesson.durum === "İşlendi" || "İptal") {
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
            <Text style={TextStyle.normalText}>{selectLesson.tarih}</Text>
            <Text style={TextStyle.normalText}>{selectLesson.saat}</Text>
            <View style={styles.inputContainer}>
            {selectLesson.durum !== "İşlendi" && selectLesson.durum !== "İptal" && selectLesson.durum !== "Geç İptal" && (
              <View>
           
           <TextInput
  ref={TextInputRef}
  style={inputStyle.handleLessonİnput}
  placeholderTextColor="black"
  placeholder='Ders Ayrıntısı'
  multiline={true}
  onChangeText={(text) => handleLessonInput(text)}
/>
 
{lessonDetail !== null && (
  <TouchableOpacity onPress={handleBlur}>
    <Text>Onayla</Text>
  </TouchableOpacity>
)}

      
    
     

</View>)}

{selectLesson.durum !== "İşlenmedi" && (
  <View style={styles.contentsContainer}>
  <Text style={{fontWeight:'bold',fontSize:17}}>Ders İçeriği</Text>
    <View style={styles.contents}> 
    <Text style={{fontSize:15}}>{selectLesson.ayrinti} </Text>
    </View>
 
  </View>
        
)}

            </View>
          </View>
          <View style={styles.buttonContainer}>
          {selectLesson.durum === "İşlenmedi" && (
  <>
    <TouchableOpacity onPress={teachALessonPress}>
      <Text style={buttonStyle.contentButtonLesson}>Dersi işle</Text>
    </TouchableOpacity>
    
    <TouchableOpacity onPress={cancel}>
      <Text style={buttonStyle.contentButtonLesson}>İptal</Text>
    </TouchableOpacity>
    <TouchableOpacity  onPress={handleCloseModal}>
      <Text style={buttonStyle.contentButtonLesson}>Geç İptal</Text>
    </TouchableOpacity>
  </>
             )}
             <TouchableOpacity  onPress={handleCloseModal}>
      <Text style={buttonStyle.contentButtonLesson}>Kapat</Text>
    </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
    container:{
        height: 300,
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        
    },
    contentsContainer:{
       alignItems:'center',
        borderTopWidth:1,
        marginTop:5,
        borderBottomWidth:1,
        padding:5,
        height:'65%'

    },
    contents:{
       marginTop:10
    },
    LessonContent:{
     alignItems:'center'
    },
    inputContainer:{
      width:250,
      
    },
    
    buttonContainer:{
       marginTop:-10,
      flexDirection:'row',
      alignItems:'center'
    },
    inputcu:{
        color:'red',
        borderWidth:1,
        borderColor:'#ffdf00',
        width:'100%',
        height:'50%'
    },
    modalContent:{

    padding: 10,
    borderWidth: 2,
    alignItems:'center',
    borderColor: "white",
    backgroundColor: "#E8E5D1",
    borderRadius: 10,
    width: "80%", 
    height: '50%', 
    },
    buttonText:{
        
        color:'red'
    }
})