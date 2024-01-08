import { StyleSheet, Text, View,Modal,Image,TouchableOpacity } from 'react-native'
import React from 'react'

export default function DetailModal({selectedItem,closeDetailModal}) {
    console.log(selectedItem)
  return (
    <Modal visible={selectedItem !== null} transparent={true} onRequestClose={closeDetailModal}>
      <View style={styles.modalContainer2}>
        {selectedItem && (
          <>
            <Image source={{ uri: selectedItem.photoUrl }} style={{ width: '100%', height: '40%', borderRadius: 10, borderWidth: 5, borderColor: '#E8E8D1', marginTop: 30, marginBottom: 10, alignItems:'flex-start'}} />
            <TouchableOpacity style={styles.closeButton} onPress={closeDetailModal}>
              <Text style={styles.closeButtonText}>Kapat</Text>
            </TouchableOpacity>
            <View style={styles.detailModalContainer}>
              <Text style={styles.contentText2}>Kilo</Text>
              <Text>{selectedItem.kilo}</Text>
             

             
            </View>
          </>
        )}
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
    modalContainer2:{
        flex: 1,
        justifyContent: 'flex-start',
         borderBottomWidth:0.5,
        alignItems: 'flex-start',
        backgroundColor: 'rgba(0,0,0,0.9)',
      },
      closeButton: {
        position: 'absolute',
        top: 20,
        right: 20,
      },
      closeButtonText: {
        color: '#FFF',
        fontSize: 18,
        marginTop:20
      },
      detailContainer: {
        marginTop:10,
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        width: '50%',
        borderRadius: 10,
      },
       
  detailModalContainer: {
    backgroundColor: '#FFF',
    width:'100%',
    alignItems:'center',
    padding: 20,
    borderRadius: 10,
  },
})