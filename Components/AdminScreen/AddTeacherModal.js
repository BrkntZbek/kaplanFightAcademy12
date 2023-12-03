import { Modal, StyleSheet, Text, View,TouchableOpacity } from 'react-native'
import React from 'react'

export default function AddTeacherModal({isVisible,closeModal}) {   // Ekrana Kullanıcı listesi gelecek Tıklayıp Hocalık yetkisi vereceksin.
  return (
    <Modal
    animationType="slide"
    transparent={true}
    visible={isVisible}
    onRequestClose={closeModal}
    >
      <View style={styles.containerModal}>
        <View style={styles.modalContent}>
            <Text>hocaaa</Text>
            <TouchableOpacity onPress={closeModal}>
              <Text
                style={{
                  fontWeight: "bold",
                  color: "yellow",
                  fontSize: 18,
                  borderWidth: 1,
                  borderRadius: 10,
                  padding: 5,
                }}
              >
                Kapat
              </Text>
            </TouchableOpacity>
        </View> 
             
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
    containerModal:{
        height: 100,
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    modalContent: {
        backgroundColor: "white",
        padding: 40,
        borderWidth: 2,
        borderColor: "yellow",
        backgroundColor: "black",
        borderRadius: 10,
        width: "80%", // Modal'ın genişliği
        maxHeight: "80%", // Modal'ın maksimum yüksekliği
      },
})