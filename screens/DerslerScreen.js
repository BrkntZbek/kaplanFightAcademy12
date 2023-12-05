import { StyleSheet, Text, View,TouchableOpacity ,FlatList} from 'react-native'
import { fetchLessons } from '../firebase'
import React, {  useState ,useEffect } from 'react'
import Header from '../Components/Header/Header'
import HandleLessons from '../Components/Modal/HandleLessons';

export default function DerslerScreen() {
    const [lessons,SetLessons] = useState([]);
    const [handleLessonsVisible,setHandleLessonsVisible] = useState(false);
    const [selectLesson,setSelectLesson] = useState([])
    useEffect(() => {
      fetchLessons(SetLessons);
    }, [fetchLessons]);
    
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
        <View style={styles.lessons}>
        <FlatList
    style={{ flex: 1 }}
    data={lessons}
    keyExtractor={(item, index) => index.toString()}
    numColumns={1}
    
    renderItem={({ item, index }) => (
      <TouchableOpacity
        onPress={() => handleLessonPress(item)}
        style={styles.touchableContainer}
      >
        <View style={styles.FlatList}>
       
          <Text style={{fontSize:20,fontWeight:'bold',color:'#3B5119'}}>{` ${item.ogrenci}`}</Text>
          <View style={styles.lessonsContent}>
             <Text style={{width:'35%'}}>{` ${item.hoca}`}</Text>
             <Text style={styles.text}>{` ${item.tarih}`}</Text>
             <Text style={styles.text}>{` ${item.saat}`}</Text>
             <Text style={{color: item.durum === "İşlenmedi" ? '#BF3624' : '#67BA46',marginLeft:20}}>{` ${item.durum}`}</Text>
          </View>
          
        </View>
      </TouchableOpacity>
    )}
  />
        </View>
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
  lessonsContent:{
    flexDirection:'row',
   
    padding:3,
    paddingRight:5,
    width:'100%',
    paddingTop:10
  },
  text:{
    width:'20%'
  },
  lessons:{
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal:10,
    backgroundColor:'black',
    paddingTop:15
  },
  FlatList:{
    borderWidth: 2,
    borderRadius: 10,
    margin:2,
    borderWidth:1,
    borderColor:'#67BA46',
    backgroundColor:'#E8E5D1',
    width: '100%', // Genişliği daha küçük bir değerle ayarlayabilir veya flex ekleyebilirsiniz
    height: 'auto',
    justifyContent: 'center',
    alignItems: 'center', // Yukarıdan aşağıya sıralamak için
   
  
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
    backgroundColor:'#E8E5D1',
    width:'95%',
    borderRadius:30,
    marginTop:10
  }
})