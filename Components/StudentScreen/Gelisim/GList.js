import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity, Modal } from 'react-native';
import { fetchEvolution } from '../../../firebase';

export default function GList({ id }) {
  const [evolution, setEvolution] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      setEvolution([]);
      await fetchEvolution(id, setEvolution);
    };

    fetchData();
  }, []);

  const formatEvolutionDate = (evolution) => {
    const lessonDate = evolution.tarih.toDate();
    const options = { day: "numeric", month: "long", year: "numeric" };
    const formattedDate = lessonDate.toLocaleDateString("tr-TR", options);
    return formattedDate;
  };

  const openImageModal = (imageUrl) => {
    setSelectedImage(imageUrl);
  };
  const openDetailModal = (item) => {
    setSelectedItem(item);
  };
  const closeDetailModal = () => {
    setSelectedItem(null);
  };

  const closeImageModal = () => {
    setSelectedImage(null);
  };

  const DetailModal = ({ item }) => {
    return (
      <Modal visible={selectedItem !== null} transparent={true} onRequestClose={closeDetailModal}>
        <View style={styles.modalContainer2}>
        <Image source={{ uri: item.photoUrl }} style={{width:'50%',height:'40%',borderRadius:10,borderWidth:5,borderColor:'#E8E8D1',marginTop:30,marginBottom:10}} />
          <TouchableOpacity style={styles.closeButton} onPress={closeDetailModal}>
            <Text style={styles.closeButtonText}>Kapat</Text>
          </TouchableOpacity>
          <View style={styles.detailModalContainer}>
            <Text style={styles.contentText2}>Kilo</Text>
            <Text>{item.kilo}</Text>
            <Text style={styles.contentText2}>Boy</Text>
            <Text>{item.boy}</Text>
            <Text style={styles.contentText2}>Vücut Endeksi</Text>
            <Text>{item.endeks}</Text>
            <Text style={styles.contentText2}>Tarih</Text>
            <Text>{` ${formatEvolutionDate(item)}`}</Text>
          </View>
        </View>
      </Modal>
    );
  };
  return (
    <View>
    <FlatList
      style={{ flex: 1 }}
      data={evolution}
      keyExtractor={(item, index) => index.toString()}
      numColumns={1}
      renderItem={({ item, index }) => (
        <TouchableOpacity onPress={() => openDetailModal(item)}>
          <View style={styles.container}>
            <View style={styles.photo}>
              <TouchableOpacity onPress={() => openImageModal(item.photoUrl)}>
                <Image source={{ uri: item.photoUrl }} style={styles.image} />
              </TouchableOpacity>
            </View>
            <View style={styles.detailContainer}>
            <Text style={styles.contentText2}>Boy</Text>
              <Text>{item.boy}</Text>
              <Text style={styles.contentText2}>Kilo</Text>
              <Text>{item.kilo}</Text>
              <Text style={styles.contentText2}>Tarih</Text>
              <Text>{` ${formatEvolutionDate(item)}`}</Text>
            </View>
          </View>
        </TouchableOpacity>
      )}
    />

    {selectedItem && <DetailModal item={selectedItem} />}

      <Modal visible={selectedImage !== null} transparent={true} onRequestClose={closeImageModal}>
        <View style={styles.modalContainer}>
          <TouchableOpacity style={styles.closeButton} onPress={closeImageModal}>
            <Text style={styles.closeButtonText}>Kapat</Text>
          </TouchableOpacity>
          <Image source={{ uri: selectedImage }} style={styles.modalImage} resizeMode="stretch" />
        </View>
      </Modal>

      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '99%',
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: '#E8E2D1',
  },
  photo: {
    width: '50%',
    height: 'auto',
    borderRightWidth: 0.5,
    borderColor: '#1A1A1A',
    borderRadius: 10,
  },
  image: {
    width: '100%',
    height: 130,
    borderRadius: 10,
  },
  detailContainer: {
    marginTop:10,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    width: '50%',
    borderRadius: 10,
  },
  contentText2: {
    fontWeight: 'bold',
    fontSize: 15,
    borderBottomWidth: 0.5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.9)',
  },
  modalImage: {
    width: '80%',
    height: '80%',
    borderRadius: 10,
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
  detailModalContainer: {
    backgroundColor: '#FFF',
    width:'100%',
    alignItems:'center',
    padding: 20,
    borderRadius: 10,
  },
  modalContainer2:{
    flex: 1,
    justifyContent: 'flex-start',
     borderBottomWidth:0.5,
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.9)',
  }
});