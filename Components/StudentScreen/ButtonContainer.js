import { StyleSheet, Text, View ,TouchableOpacity} from 'react-native'
import React from 'react'
import buttonStyle from '../../Styles/ButtonStyle'
export default function ButtonContainer() {
  return (
    <View style={styles.container}>
        <TouchableOpacity style={styles.button}  >
            <Text style={buttonStyle.contentButtonLesson}>Hesabım</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}  >
            <Text style={buttonStyle.contentButtonLesson}>Derslerim</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}  >
            <Text style={buttonStyle.contentButtonLesson}>Gelişim</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}  >
            <Text style={buttonStyle.contentButtonLesson}>Ayarlar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}  >
            <Text style={buttonStyle.contentButtonLesson}>Rezerv</Text>
          </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
      marginTop:60,
      marginLeft:20
  },
  button:{
    borderWidth:1,
    borderColor:'black',
    borderRadius:10,
    marginTop:5
  }
})