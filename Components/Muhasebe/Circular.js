import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ProgressCircle } from 'react-native-svg-charts';

export default function Circular({ gelir, gider, size }) {
  const toplam = gelir - gider;

  return (
    <View style={styles.container}>
        <View style={styles.progress}>
        <ProgressCircle
          style={{ height: 100, width:100 ,marginLeft:10}} // Örnek olarak width ekleyin
          progress={(gelir - gider) / gelir}
          progressColor={'rgb(0, 255, 0)'}
          backgroundColor={'rgb(255, 0, 0)'}
          
      />
        </View>
      
      <Text>           İstatislik</Text>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        backgroundColor: 'gray',
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
        backgroundColor: 'gray',
        width: '100%',
        marginTop: 10,
        padding: 5,
        borderWidth: 0.5,
        borderColor: 'white',
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