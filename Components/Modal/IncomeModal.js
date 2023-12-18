import { StyleSheet, Text, View, Modal, TextInput, TouchableOpacity, Switch } from 'react-native';
import React, { useState } from 'react';
import İnputStyle from '../../Styles/İnputStyle';
import { addIncome } from '../../firebase';

export default function IncomeModal({ isVisible, handleCloseAddModal }) {
  const [aciklama, setAciklama] = useState(null);
  const [fiyat, setFiyat] = useState(0);
  const [durum, setDurum] = useState(null);
  const [isGelirChecked, setGelirChecked] = useState(true);
 console.log('drurum: ',isGelirChecked,'açıklama',aciklama,'fiyat: ',fiyat)
  const handleGelirCheck = () => {
    // setGelirChecked fonksiyonu ile isGelirChecked durumunu tersine çevir
    setGelirChecked((oncekiDurum) => !oncekiDurum);

    // isGelirChecked true ise durumu "Gelir" olarak ayarla, değilse "Gider" olarak ayarla
    setDurum(isGelirChecked ? "Gelir" : "Gider");
  };

  const add = () => {
    // Burada durum değeri boş değilse ve diğer değişkenleriniz (aciklama, fiyat) de uygunsa işlemi gerçekleştir
    if (aciklama && fiyat !== null) {
      // isGelirChecked true ise durumu "Gelir" olarak ayarla, değilse "Gider" olarak ayarla
      const updatedDurum = isGelirChecked ? "Gelir" : "Gider";
      
      console.log('income: ', updatedDurum, aciklama, fiyat);
      addIncome(aciklama, fiyat, updatedDurum);
    }
  };

  return (
    <Modal
      transparent={true}
      animationType="slide"
      visible={isVisible}
      onRequestClose={handleCloseAddModal}
    >
      <View style={styles.container}>
      <View style={styles.modalContainer}>
        <TextInput style={İnputStyle.loginİnput} placeholder='Açıklama' onChangeText={(text) => setAciklama(text)} />
        <TextInput style={İnputStyle.loginİnput} placeholder='Fiyat' onChangeText={(text) => setFiyat(text)} />
        <View style={styles.switchContainer}>
          <Text>Gelir</Text>
          <Switch
            value={isGelirChecked}
            onValueChange={handleGelirCheck}
          />
          <Text>Gider</Text>
        </View>
        <TouchableOpacity onPress={add}>
          <Text>Ekle</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleCloseAddModal}>
          <Text>Kapat</Text>
        </TouchableOpacity>
      </View>
      </View>
      
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    height: '50%',
    alignItems: "center",
    justifyContent: "center",
    backgroundColor:'#DFE8D1',
    width: '60%',
    borderRadius:20
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  container:{
    flex:1,
    alignItems: "center",
    justifyContent:'center',
    borderRadius:20
  }
});