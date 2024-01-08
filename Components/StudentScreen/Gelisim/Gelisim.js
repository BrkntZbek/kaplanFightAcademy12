import { StyleSheet, Text, View,FlatList,TouchableOpacity,Image,Modal } from "react-native";
import React,{useState,useEffect} from "react";
import { fetchEvolution } from "../../../firebase";
import DetailModal from "./DetailModal";
export default function Gelisim({ id }) {
  const [evolution, setEvolution] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [dataFetched, setDataFetched] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setEvolution([]);
      await fetchEvolution(id, (evolutionData) => {
        setEvolution(evolutionData);
        setDataFetched(true);
      });
    };

    fetchData();
  }, [setEvolution]);

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

 



  return (
    <View style={styles.infoContainer}>
      <View style={styles.textContainer}>
        <View style={styles.nameContainer}>
          <Text style={styles.nameText}>Gelişim</Text>
        </View>
       
        <View style={styles.evolution}>
      {dataFetched ? (
        <FlatList
         style={{ flex: 1 }}
          data={evolution}
          keyExtractor={(item, index) => index.toString()}
          numColumns={1}
          renderItem={({ item, index }) => (
            <TouchableOpacity onPress={() => openDetailModal(item)}>
              <View style={styles.flatList}>
                 <View style={styles.fotograf}>
                    <Image source={{ uri: item.photoUrl }} style={styles.image} resizeMode="cover"></Image>
                  
                 </View>
                 <View style={styles.icerik}>
               
                  <Text style={styles.contentText2}>Kilo</Text>
                  <Text>{item.kilo}</Text>
                  <Text style={styles.contentText2}>Tarih</Text>
                  <Text>{` ${formatEvolutionDate(item)}`}</Text>
                 </View>
              </View>
            </TouchableOpacity>
          )}
        />
      ) : (
        <Text>Veri çekiliyor...</Text>
      )}
    </View>
      
      </View>
        
       <DetailModal selectedItem={selectedItem} closeDetailModal={closeDetailModal} formatEvolutionDate={formatEvolutionDate}/>
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
  nameContainer: {
    borderBottomWidth: 2,
    width: "100%",
    alignItems: "center",

    borderBottomEndRadius: 30,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.9)',
  },
 
  endeksCont: {
    marginTop: 60,
    height: "auto",
    width: "100%",
  },
  nameText: {
    fontWeight: "bold",
    fontSize: 30,
  },
  contentText2: {
    fontWeight: 'bold',
    fontSize: 15,
    borderBottomWidth: 0.5,
  },
  evolution:{
    height: "100%",
    width: "100%",
    justifyContent: "start",
    marginTop: 10,
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "black",
  flex:1,
  },
  
  detailContainer: {
   
    alignItems: 'center',
    justifyContent: 'center',
   
    width: '50%',
    borderRadius: 10,
  },
  
  info: {
    height: "90%",
    width: "100%",
    justifyContent: "start",
    marginTop: 10,
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "black",
  },
  textContainer: {
    height: "100%",
    padding:10,
    borderTopLeftRadius: 90,
    alignItems: "center",
    justifyContent: "start",
  },

  infoContainer: {
    backgroundColor: "#E8E8D1",
    width: "100%",
    height: "90%",
    borderTopLeftRadius: 90,
    borderBottomLeftRadius: 50,
    marginTop: 18,
    borderColor: "black",
    justifyContent: "flex-start",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0.5,
    },
    shadowOpacity: 0,
    shadowRadius: 3.84,
    elevation: 5,
  },
  image: {
    width:'90%',
    height:'90%',
    alignItems:'center',
    justifyContent:'center',
    borderRadius: 10,
    borderWidth:3,
    flex:1
  },
  flatList:{
    flexDirection:'row',
    flex:1,
    height:180,
    width:'100%',
    
  },
  fotograf:{
    width:'60%',
    height:'100%',
    alignItems:'center',
    justifyContent:'center'
  },
  icerik:{
    width: '40%', // 'width' değeri ekleyin
    height: '100%', // 'height' değeri ekleyin
    alignItems: 'center',
    justifyContent: 'center',
  }
});
