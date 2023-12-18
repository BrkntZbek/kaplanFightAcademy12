import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ProgressCircle } from 'react-native-svg-charts';

export default function Circular({ totalGelir, totalGider }) {
  

  return (
    <View style={styles.container}>
        <View style={styles.progress}>
          <View>
          <ProgressCircle
          style={{ height: 100, width:100 ,marginLeft:10}} // Örnek olarak width ekleyin
          progress={(totalGelir - totalGider) / totalGelir}
          progressColor={'rgb(0, 255, 0)'}
          backgroundColor={'rgb(255, 0, 0)'}
          
      />
      <Text style={{marginLeft:35,marginTop:10,color:'white'}}>toplam</Text>
          </View>
          <View>
          <ProgressCircle
          style={{ height: 100, width:100 ,marginLeft:10}} // Örnek olarak width ekleyin
          progress={(totalGelir - totalGider) / totalGelir}
          progressColor={'rgb(0, 255, 0)'}
          backgroundColor={'rgb(255, 0, 0)'}
          
      />
      <Text style={{marginLeft:35,marginTop:10,color:'white'}}>toplam</Text>
          </View>
        
        </View>
      
      
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        backgroundColor: '#1A1A1A',
        padding: 10,
        borderTopWidth:0.5,
        shadowColor: '#000',
        height:'100%',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
      },
      progress: {
        borderRadius: 20,
        backgroundColor: '#1A1A1A',
        alignItems:'flex-start',
        width: '100%',
        flexDirection:'row',
        marginTop: 10,
        padding: 10,
        borderWidth: 0.5,
        borderColor: '#FFDF00',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
      },
});