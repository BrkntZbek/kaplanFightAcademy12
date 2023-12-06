import { StyleSheet, Text, View,TouchableOpacity ,FlatList} from 'react-native'
import { fetchLessons } from '../firebase'
import React, {  useState ,useEffect } from 'react'
import Header from '../Components/Header/Header'
import HandleLessons from '../Components/Modal/HandleLessons';
import LessonsList from '../Components/DerslerScreen/LessonsList';

export default function DerslerScreen() {
    const [lessons,SetLessons] = useState([]);
    const [handleLessonsVisible,setHandleLessonsVisible] = useState(false);
    const [selectLesson,setSelectLesson] = useState([])
    useEffect(() => {
      fetchLessons(SetLessons);
    }, [selectLesson,fetchLessons]);
    
    const handleCloseModal = () => {
      setHandleLessonsVisible(false);
    };
    
  
    const handleLessonPress = (item) =>{
      setSelectLesson(item);
      setHandleLessonsVisible(true)
      console.log(handleLessonsVisible)
      console.log(item)
    }

  return (
    <View style={styles.container}>
       <Header/>
      <View style={styles.content}>
        <View style={styles.buttons}>
        <TouchableOpacity style={styles.button} >
            <Text style={styles.buttonText}>Bugün</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} >
            <Text style={styles.buttonText}>Bu Hafta</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} >
            <Text style={styles.buttonText}>Bu Ay</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} >
            <Text style={styles.buttonText}>Tüm</Text>
          </TouchableOpacity>
        </View>
        <LessonsList lessons={lessons} handleLessonPress={handleLessonPress} />
      </View>
     
      <HandleLessons selectLesson={selectLesson} handleLessonsVisible={handleLessonsVisible} handleCloseModal={handleCloseModal} />
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    backgroundColor: 'black',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  button:{
    backgroundColor: '#FFDF00',
    padding: 5,
    borderWidth:1,
    
    margin:12,
    borderRadius: 10,
    width:'20%',
    alignItems:'center',
    height:'auto',
    marginTop: 10,
  },
  buttons:{
    flexDirection:'row',
    backgroundColor:'#DFE8D1',
    width:'95%',
    borderRadius:30,
    marginTop:10
  }
})