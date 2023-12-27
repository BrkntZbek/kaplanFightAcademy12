import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import Header from "../Header/Header";
import TextStyle from "../../Styles/TextStyle";

export default function BlogPages({ route }) {
  const selectedBlog = route.params?.selectedBlog || {}; // varsayılan olarak boş bir obje

  return (
    <View style={styles.BlogPagesContainer}>
      <Header />
      <View style={styles.context}>
        <Image
          source={{ uri: selectedBlog.photoUrl }}
          style={{ width: "100%", height: "100%", borderRadius: 45 }}
          resizeMode="stretch"
        />
      </View>
      <View style={styles.contentContainer}>
        <Text style={{ color: "#E8E8D1", fontWeight: "bold", fontSize: 30 }}>
          {selectedBlog.baslik}
        </Text>
      </View>
      <View style={styles.contextContainer}>
        <Text
          style={{
            fontSize: 15,
            color: "#E8E2D1",
            marginHorizontal: 10,
            fontFamily: "Arial",
          }}
        >
          {selectedBlog.icerik}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  BlogPagesContainer: {
    flex: 1,
    width: "100%",
    height: "100%",
    backgroundColor: "#1A1A1A",
  },

  context: {
    height: "30%",
    width: "100%",
    alignItems: "center",
    marginTop: 10,
    borderBottomWidth: 1,
    marginBottom: 2,
    padding: 5,
    backgroundColor: "#E8E8D1",
    borderRadius: 50,
    shadowColor: "#E8E8D1",
    shadowOffset: {
      width: 0,
      height: 0.5,
    },
    shadowOpacity: 0,
    shadowRadius: 3.84,
    elevation: 9,
  },
  contentContainer: {
    marginTop: 10,
    alignItems: "center",
    backgroundColor: "#1A1A1A",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  contextContainer: {
    height: "40%",

    backgroundColor: "#1A1A1A",
    alignItems: "center",
    justifyContent: "center",
  },
});
