import { StyleSheet, Text, View, TouchableOpacity, Modal, FlatList } from 'react-native';
import React, { useState, useEffect } from 'react';
import buttonStyle from '../../Styles/ButtonStyle';
import IncomeModal from '../Modal/IncomeModal';


export default function Top({totalFiyat}) {
  const [isIncomeModalVisible, setIncomeModalVisible] = useState(false);


  const toggleIncomeModal = () => {
    setIncomeModalVisible(!isIncomeModalVisible);
  };
 

  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <Text style={{ fontSize: 20 }}>{totalFiyat} TL</Text>
      </View>
      <View style={styles.bottom}>
        <TouchableOpacity onPress={toggleIncomeModal} style={styles.button}>
          <Text style={buttonStyle.contentButtonLesson}>Gelir Ekle</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={buttonStyle.contentButtonLesson}>Gider Ekle</Text>
        </TouchableOpacity>
      </View>

    

      <IncomeModal isVisible={isIncomeModalVisible} handleCloseAddModal={toggleIncomeModal} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#DFE8D1',
    borderRadius:10,
    marginTop:5,
    height: '15%',
  },
  top: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: '100%',
    height: '40%',
    borderBottomWidth: 0.5,
  },
  bottom: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '40%',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  button: {
    height:'80%',
    marginHorizontal: 20,
    borderWidth: 0.5,
    borderRadius: 10,
    marginTop: 15,
    
  },
});