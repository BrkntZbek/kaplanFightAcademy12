import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { listFiles } from "../../firebase";
import { useNavigation } from "@react-navigation/native";
import TextStyle from "../../Styles/TextStyle";
export default function Blog() {
  const [files, setFiles] = useState([]);
  const [selectedBlog, setSelectedBlog] = useState(null); // İlk değeri null olarak ayarlandı
  useEffect(() => {
    listFiles(setFiles);
  }, [setFiles]);
  const navigation = useNavigation();

  const pushBlogPages = (item) => {
    setSelectedBlog(item);
    console.log(selectedBlog);
    navigation.navigate("Blog Page", { selectedBlog: item }); // Veriyi doğrudan iletiyoruz
  };

  return (
    <View style={styles.blogContainer}>
      <View style={styles.context}>
        <Text style={{ fontSize: 20, fontWeight: "bold", color: "#ffdf00" }}>
          Bloglar
        </Text>
      </View>
      <View style={styles.blog}>
        <FlatList
          data={files}
          horizontal={true}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => pushBlogPages(item)}>
              <View style={styles.blogItem}>
                <View style={styles.blogPhotoAndContext}>
                  <Image
                    source={{ uri: item.photoUrl }}
                    style={{ width: "100%", height: "100%", borderRadius: 15 }}
                    resizeMode="cover"
                  />
                </View>
                <View style={styles.baslik}>
                  <Text style={TextStyle.blogStyle}>{item.baslik}</Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id.toString()} // keyExtractor'ı string olarak ayarlandı
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  blogContainer: {
    marginTop: 40,
    width: "100%",
    height: "40%",
    borderBottomWidth: 0.2,
    borderColor: "#E8E8D1",
  },
  context: {
    padding: 10,
    alignItems: "center",
    marginBottom: -5,
  },
  blog: {
    flexDirection: "row",

    height: "90%",
    width: "100%",
  },
  blogItem: {
    width: 200,
    height: "100%",
    marginRight: 10,
  },
  blogPhotoAndContext: {
    marginTop: 5,
    width: "100%",
    height: "85%",
  },
  baslik: {
    height: "30%",

    justifyContent: "flex-start",
    alignItems: "center",
  },
});
