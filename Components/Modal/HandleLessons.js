import { StyleSheet, Text, View,Modal ,TouchableOpacity,TextInput} from 'react-native'
import React from 'react'

export default function HandleLessons({selectLesson,handleLessonsVisible,handleCloseModal}) {
  return (
    <Modal
    transparent={true}
    animationType="slide"
    visible={handleLessonsVisible}
    onRequestClose={handleCloseModal}
    >
      <View style={styles.container}>
        <View style={styles.modalContent}>
        <Text style={{color:'yellow',fontWeight:'bold',fontSize:20}}>{selectLesson.ogrenci}</Text>
          <View style={styles.LessonContent}>
             <Text style={styles.textContent}>{selectLesson.hoca}</Text>
             <Text style={styles.textContent}>{selectLesson.tarih}</Text>
             <Text style={styles.textContent}>{selectLesson.saat}</Text>






             <View style={styles.inputContainer}>
             <TextInput style={styles.inputcu} placeholderTextColor="yellow" placeholder='Ders Bilgisi'></TextInput>
             </View>
            
             

          </View>







        <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleCloseModal} >
            <Text style={styles.buttonText}>Dersi işle</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleCloseModal} >
            <Text style={styles.buttonText}>Kapat</Text>
          </TouchableOpacity>
        </View>
        
        </View>
        
     </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
    container:{
        height: 300,
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    textContent:{
      color:'red'
    },
    buttonContainer:{
      flexDirection:'row'
    },
    inputcu:{
        color:'red',
        borderWidth:1,
        borderColor:'yellow',
        width:'100%',
        height:'50%'
    },
    modalContent:{
    backgroundColor: "white",
    padding: 40,
    borderWidth: 2,
    alignItems:'center',
    borderColor: "yellow",
    backgroundColor: "black",
    borderRadius: 10,
    width: "80%", // Modal'ın genişliği
    height: '50%', // Modal'ın maksimum yüksekliği
    },
    buttonText:{
        
        color:'red'
    }
})