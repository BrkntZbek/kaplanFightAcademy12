import { StyleSheet, Text, View ,TouchableOpacity} from 'react-native'
import React from 'react'
import buttonStyle from '../../Styles/ButtonStyle'
export default function Top() {
  return (
    <View style={styles.container}>
        <View style={styles.top}>
            <Text style={{fontSize:20}}>200 TL</Text>
        </View>
        <View style={styles.bottom}>
          <TouchableOpacity style={styles.button}  >
            <Text style={buttonStyle.contentButtonLesson}>Gelir Ekle</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}  >
            <Text style={buttonStyle.contentButtonLesson}>Gider Ekle</Text>
          </TouchableOpacity>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
     alignItems:'center',
     justifyContent:'center',
     backgroundColor:'#DFE8D1',
     borderBottomEndRadius:10,
     borderBottomStartRadius:10,
     height:'20%'
  },
  top:{
    alignItems:'center',
    justifyContent:'flex-end',
    width:'100%',
    height:'50%',
    borderBottomWidth:0.5,

  },
  bottom:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center',
    width:'100%',
    height:'40%',

  },
  button: {
    marginHorizontal: 20,
    borderWidth: 1,
    borderRadius: 10,
    marginTop:15
    
  }
})